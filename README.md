Features
• Receipt Submission – Allows you to submit a JSON receipt and returns a unique receipt ID.
• Points Calculation – Returns the total points associated with a given receipt.
• Validation – Ensures receipts have the required fields and follow expected formats.
• Swagger/OpenAPI Docs – Optionally view your API docs at /api-docs.

    Technology Stack
    •	Node.js
    •	Express
    •	TypeScript
    •	UUID for generating unique IDs
    •	Swagger for API documentation
    •	Jest & Supertest for testing

Getting Started
• Install Dependencies => npm install
• (Optional) Create .env
If you have environment-specific variables (e.g., PORT=3000), create a .env file in the project root.

Running the Application
• Development Mode => npm start
• By default, listens on http://localhost:3000 (configurable via PORT env variable).

<---------------- OR use Docker ------------>
Docker
• You can build and run this application in a Docker container:
• Build the Image => docker build -t receipt-processor:latest .
• Run the Container => docker run -p 3000:3000 receipt-processor:latest
• The API is now accessible at http://localhost:3000.
• Swagger documentation at http://localhost:3000/api-docs.

API Endpoints

• Process Receipts
• Endpoint: POST /receipts/process
• Description: Submits a receipt for processing.
• Request Body (JSON):
{
"retailer": "Target",
"purchaseDate": "2022-01-02",
"purchaseTime": "13:13",
"total": "1.25",
"items": [
{ "shortDescription": "Pepsi - 12oz", "price": "1.25" }
]
}

• Get Points
• Endpoint: GET /receipts/{id}/points
• Description: Returns the points awarded for the specified receipt.

Testing
• I use Jest and Supertest to test endpoints.
• Run Tests => npm run test
• A coverage report is generated under coverage/.

• If you have any questions or issues, feel free to open an issue! or contact me at dev.hozifa@gmail.com
