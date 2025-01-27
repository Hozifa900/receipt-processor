import express from "express";
import receiptRoutes from "./api/v1/routers/receiptRoutes";
// import swaggerUi from "swagger-ui-express";
// import swaggerDocs from "./config/swagger/SwaggerConfig";

import swaggerUi from "swagger-ui-express";
import swaggerDocs from "./config/swagger/SwaggerConfig";

const app = express();

app.use(express.json());

app.use(receiptRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default app;
