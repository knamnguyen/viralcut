import z from "zod";

export enum STRIPE_ID_PRICES {
  YEARLY = "price_1RRvJuIOsxwckpQVpk7SsMWf",
  LIFETIME = "price_1RRvJvIOsxwckpQVdg8co2CK",
  MONTHLY = "price_1RRvJwIOsxwckpQV9dzS9Vkm",
}

export enum STRIPE_ID_PRODUCTS {
  MONTHLY = "prod_RxVyOOcNMLC1Sk",
  YEARLY = "prod_RxWTt3Py1f7gvF",
  LIFETIME = "prod_SMdyKsxHvZLm3L",
}

//createCheckoutSchema
export const createCheckoutSchema = z.object({
  purchaseType: z.enum(["MONTHLY", "YEARLY", "LIFETIME"]),
});

export const createCustomerPortalSchema = z.object({
  returnUrl: z.string().optional(),
});
