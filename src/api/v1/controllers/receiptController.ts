import { Request, Response } from "express";
import { Receipt } from "../models/receipt";
import { processReceipt, getReceiptPoints } from "../services/receiptService";

export async function processReceiptController(req: Request, res: Response) {
  try {
    const receipt: Receipt = req.body;

    const result = processReceipt(receipt);

    if (Array.isArray(result)) {
      return res.status(400).json({
        message: "The receipt is invalid.",
        errors: result,
      });
    }

    return res.json({ id: result });
  } catch (error) {
    console.error("Error in processReceiptController:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getReceiptPointsController(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const points = getReceiptPoints(id);

    if (points === null) {
      // 404 if the receipt ID doesn't exist
      return res.status(404).json({ message: "No receipt found for that ID." });
    }

    // Otherwise, return the points
    return res.json({ points });
  } catch (error) {
    console.error("Error in getReceiptPointsController:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
