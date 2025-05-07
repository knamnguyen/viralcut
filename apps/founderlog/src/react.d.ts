// apps/nextjs/src/react.d.ts

/**
 * This file extends the default React types to include custom elements
 * like the one provided by Stripe's Pricing Table script.
 */

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "stripe-pricing-table": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      > & {
        "pricing-table-id": string;
        "publishable-key": string;
      };
    }
  }
}
