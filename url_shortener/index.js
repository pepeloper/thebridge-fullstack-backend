import express from "express";
import cors from "cors";
import { linksRouter } from "./links/links.router.js";
import { linkController } from "./links/links.controller.js";
import { validateLinkId } from "./middleware/links.middleware.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable Cross-Origin Resource Sharing (CORS) for all routes
app.use(express.json());
app.use(express.static("public")); // Serve static files from the 'public' directory

app.use("/api/links", linksRouter);
app.get("/:id", validateLinkId, linkController.redirectToUrl);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
