import express from "express";
import router from "./router.js";
import errorHandler from "./shared/middleware/errorHandler.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Servidor levantado en el puerto ${PORT}`);
});
