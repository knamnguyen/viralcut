#!/usr/bin/env tsx
/**
 * Import Products and Prices from CSV files to Stripe
 *
 * This script reads products and prices from CSV files and imports them to Stripe,
 * maintaining the same IDs and configuration as in the source CSV files.
 */
import fs from "fs";
import path from "path";
import { parse } from "csv-parse";
import Stripe from "stripe";

import { StripeConfig, StripeService } from "../src/index";

// Define the directory where CSV files are located
const csvDir = path.resolve(process.cwd(), "assets");

// Define CSV file paths
const PRODUCTS_CSV = path.join(csvDir, "Sassy Product Catalog.csv");
const PRICES_CSV = path.join(csvDir, "Sassy Product Catalog Prices.csv");

// Define interfaces for CSV data
interface ProductCSV {
  id: string;
  Name: string;
  "Date (UTC)": string;
  Description: string;
  Url: string;
  "Tax Code": string;
}

interface PriceCSV {
  "Price ID": string;
  "Product ID": string;
  "Product Name": string;
  "Product Statement Descriptor": string;
  "Product Tax Code": string;
  Description: string;
  "Created (UTC)": string;
  Amount: string;
  Currency: string;
  Interval: string;
  "Interval Count": string;
  "Usage Type": string;
  "Aggregate Usage": string;
  "Billing Scheme": string;
  "Trial Period Days": string;
  "Tax Behavior": string;
}

// Load environment variables
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

if (!STRIPE_SECRET_KEY) {
  console.error("Error: STRIPE_SECRET_KEY environment variable is required");
  process.exit(1);
}

if (!STRIPE_WEBHOOK_SECRET) {
  console.warn(
    "Warning: STRIPE_WEBHOOK_SECRET environment variable is not set. Webhook handling will not work.",
  );
}

// Initialize Stripe service
const stripeConfig: StripeConfig = {
  secretKey: STRIPE_SECRET_KEY,
  webhookSecret: STRIPE_WEBHOOK_SECRET || "",
};

const stripeService = new StripeService(stripeConfig);
const stripe = new Stripe(stripeConfig.secretKey, {
  apiVersion: "2023-08-16",
});

/**
 * Read and parse a CSV file
 * @param filePath Path to the CSV file
 * @returns Promise resolving to parsed CSV data
 */
async function parseCSV<T>(filePath: string): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const results: T[] = [];

    fs.createReadStream(filePath)
      .pipe(
        parse({
          columns: true,
          skip_empty_lines: true,
        }),
      )
      .on("data", (data: T) => results.push(data))
      .on("error", (error) => reject(error))
      .on("end", () => resolve(results));
  });
}

/**
 * Import products from the CSV file to Stripe
 */
async function importProducts(
  products: ProductCSV[],
): Promise<Map<string, boolean>> {
  console.log(`\nImporting ${products.length} products...`);
  const importedProducts = new Map<string, boolean>();

  for (const product of products) {
    try {
      // Check if product already exists
      try {
        const existingProduct = await stripe.products.retrieve(product.id);
        console.log(
          `✅ Product already exists: ${existingProduct.name} (${product.id})`,
        );
        importedProducts.set(product.id, true);
        continue;
      } catch (error) {
        // Product doesn't exist, we'll create it
      }
      // Create the product with the same ID from the CSV
      const newProduct = await stripe.products.create({
        id: product.id,
        name: product.Name,
        description: product.Description,
        metadata: {
          imported: "true",
          importDate: new Date().toISOString(),
        },
        ...(product["Tax Code"] ? { tax_code: product["Tax Code"] } : {}),
      });

      console.log(`✅ Created product: ${newProduct.name} (${newProduct.id})`);
      importedProducts.set(product.id, true);
    } catch (error) {
      console.error(
        `❌ Error importing product ${product.id}:`,
        error instanceof Error ? error.message : error,
      );
      importedProducts.set(product.id, false);
    }
  }

  return importedProducts;
}

/**
 * Import prices from the CSV file to Stripe
 */
async function importPrices(
  prices: PriceCSV[],
  importedProducts: Map<string, boolean>,
): Promise<void> {
  console.log(`\nImporting ${prices.length} prices...`);

  for (const price of prices) {
    try {
      // Skip prices for products that weren't imported successfully
      if (!importedProducts.get(price["Product ID"])) {
        console.warn(
          `⚠️ Skipping price ${price["Price ID"]} because product ${price["Product ID"]} was not imported successfully`,
        );
        continue;
      }

      // Check if price already exists
      try {
        const existingPrice = await stripe.prices.retrieve(price["Price ID"]);
        console.log(
          `✅ Price already exists: ${price["Price ID"]} for ${price["Product Name"]}`,
        );
        continue;
      } catch (error) {
        // Price doesn't exist, we'll create it
      }

      // Parse the price amount (convert to cents for Stripe)
      const amount = Math.round(parseFloat(price.Amount) * 100);

      //accounting for single lifetime price

      //check if recurring is provided in the price item in csv

      // Create the price with the same ID from the CSV
      const newPrice = await stripe.prices.create({
        // id: price["Price ID"],
        product: price["Product ID"],
        unit_amount: amount,
        currency: price.Currency.toLowerCase(),
        recurring: price.Interval
          ? {
              interval:
                price.Interval as Stripe.PriceCreateParams.Recurring.Interval,
              interval_count: parseInt(price["Interval Count"], 10),
              usage_type: price[
                "Usage Type"
              ] as Stripe.PriceCreateParams.Recurring.UsageType,
              ...(price["Aggregate Usage"]
                ? {
                    aggregate_usage: price[
                      "Aggregate Usage"
                    ] as Stripe.PriceCreateParams.Recurring.AggregateUsage,
                  }
                : {}),
            }
          : undefined,
        billing_scheme: price[
          "Billing Scheme"
        ] as Stripe.PriceCreateParams.BillingScheme,
        ...(price["Trial Period Days"]
          ? { trial_period_days: parseInt(price["Trial Period Days"], 10) }
          : {}),
        ...(price["Tax Behavior"]
          ? {
              tax_behavior: price[
                "Tax Behavior"
              ] as Stripe.PriceCreateParams.TaxBehavior,
            }
          : {}),
        metadata: {
          imported: "true",
          importDate: new Date().toISOString(),
        },
      });

      console.log(
        `✅ Created price: ${newPrice.id} for product ${price["Product ID"]}`,
      );
    } catch (error) {
      console.error(
        `❌ Error importing price ${price["Price ID"]}:`,
        error instanceof Error ? error.message : error,
      );
    }
  }
}

/**
 * Main function to run the import process
 */
async function main() {
  console.log("Starting import of products and prices to Stripe...");

  try {
    // Load products and prices from CSV files
    const products = await parseCSV<ProductCSV>(PRODUCTS_CSV);
    const prices = await parseCSV<PriceCSV>(PRICES_CSV);

    console.log(
      `Found ${products.length} products and ${prices.length} prices in CSV files.`,
    );

    // Import products first
    const importedProducts = await importProducts(products);

    // Then import prices
    await importPrices(prices, importedProducts);

    console.log("\n✅ Import process completed successfully!");
  } catch (error) {
    console.error(
      "❌ Error during import process:",
      error instanceof Error ? error.message : error,
    );
    process.exit(1);
  }
}

// Run the main function
main().catch(console.error);
