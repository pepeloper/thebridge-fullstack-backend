import express from "express";
import { linksRouter } from "./links/links.router.js";
import { linkController } from "./links/links.controller.js";
import { validateLinkId } from "./middleware/links.middleware.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/links", linksRouter);
app.get("/:id", validateLinkId, linkController.redirectToUrl);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
