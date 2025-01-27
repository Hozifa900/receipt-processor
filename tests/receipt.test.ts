// tests/receipt.test.ts

import request from "supertest";
import app from "../src/app";

describe("Receipt Processor API", () => {
  // A variable to store an ID we get from a successful POST
  let validReceiptId: string;

  // 1) Test POST /receipts/process with a valid payload
  it("should return 200 and an ID for a valid receipt", async () => {
    const validReceipt = {
      retailer: "Target",
      purchaseDate: "2022-01-02",
      purchaseTime: "13:13",
      total: "1.25",
      items: [
        {
          shortDescription: "Pepsi - 12-oz",
          price: "1.25",
        },
      ],
    };

    const response = await request(app)
      .post("/receipts/process")
      .send(validReceipt)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(typeof response.body.id).toBe("string");

    // Save this ID for the points lookup
    validReceiptId = response.body.id;
  });

  // 2) Test GET /receipts/:id/points for an existing receipt
  it("should return 200 and a points value for the existing receipt", async () => {
    const response = await request(app)
      .get(`/receipts/${validReceiptId}/points`)
      .send();

    expect(response.status).toBe(200);
    // we only check that we have "points"
    expect(response.body).toHaveProperty("points");
    expect(typeof response.body.points).toBe("number");
  });

  // 3) Test POST /receipts/process with an invalid payload (missing 'total')
  it("should return 400 for an invalid receipt", async () => {
    const invalidReceipt = {
      retailer: "Walgreens",
      purchaseDate: "2022-01-02",
      purchaseTime: "08:13",
      // total: "2.65", // Missing on purpose
      items: [
        {
          shortDescription: "Pepsi - 12-oz",
          price: "1.25",
        },
      ],
    };

    const response = await request(app)
      .post("/receipts/process")
      .send(invalidReceipt)
      .set("Content-Type", "application/json");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toContain("The receipt is invalid.");
    expect(response.body).toHaveProperty("errors");
    expect(Array.isArray(response.body.errors)).toBe(true);
  });

  // 4) Test GET /receipts/:id/points for a non-existing receipt
  it("should return 404 for a non-existing ID", async () => {
    const nonExistingId = "some-fake-id";
    const response = await request(app)
      .get(`/receipts/${nonExistingId}/points`)
      .send();

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message");
    expect(response.body.message).toEqual("No receipt found for that ID.");
  });
});
