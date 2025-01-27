import { Receipt, Item } from "../models/receipt";

const retailerRegex = /^[\w\s\-\&]+$/; // ^[\w\s-&]+$ in the YAML
const shortDescriptionRegex = /^[\w\s\-]+$/; // ^[\w\s-]+$ in the YAML
const currencyRegex = /^\d+\.\d{2}$/; // ^\d+\.\d{2}$

/**
 * Validates a single Receipt object according to the spec.
 * @param receipt The Receipt to validate
 * @returns An array of error messages (empty if valid)
 */
export function validateReceipt(receipt: Receipt): string[] {
  const errors: string[] = [];

  // 1. Validate retailer
  if (!receipt.retailer || !retailerRegex.test(receipt.retailer)) {
    errors.push("Invalid retailer name (must match ^[\\w\\s\\-\\&]+$).");
  }

  // 2. Validate purchaseDate (must parse to a valid date)
  if (!receipt.purchaseDate || isNaN(Date.parse(receipt.purchaseDate))) {
    errors.push("Invalid purchaseDate (must be a valid date string).");
  }

  // 3. Validate purchaseTime (simple HH:MM check)
  if (!receipt.purchaseTime || !/^\d{2}:\d{2}$/.test(receipt.purchaseTime)) {
    errors.push("Invalid purchaseTime (must be in 'HH:MM' 24-hour format).");
  }

  // 4. Validate items array
  if (!receipt.items || receipt.items.length === 0) {
    errors.push("At least one item is required.");
  } else {
    // Validate each item
    receipt.items.forEach((item: Item, index: number) => {
      // shortDescription
      if (
        !item.shortDescription ||
        !shortDescriptionRegex.test(item.shortDescription)
      ) {
        errors.push(
          `Item #${
            index + 1
          }: Invalid shortDescription (must match ^[\\w\\s\\-]+$).`
        );
      }
      // price
      if (!item.price || !currencyRegex.test(item.price)) {
        errors.push(
          `Item #${index + 1}: Invalid price (must match ^\\d+\\.\\d{2}$).`
        );
      }
    });
  }

  // 5. Validate total
  if (!receipt.total || !currencyRegex.test(receipt.total)) {
    errors.push("Invalid total (must match ^\\d+\\.\\d{2}$).");
  }

  return errors;
}
