import { Receipt } from "../models/receipt";

class ReceiptRepository {
  private receipts = new Map<string, Receipt>();

  save(id: string, receipt: Receipt): void {
    this.receipts.set(id, receipt);
  }

  findById(id: string): Receipt | null {
    return this.receipts.get(id) || null;
  }
}

export const receiptRepository = new ReceiptRepository();
