import express from "express";
import router from "./router.js";
import { connectToDatabase } from './database.js';

const app = express();
const PORT = 3000;

connectToDatabase();

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Servidor levantado en el puerto ${PORT}`);
});
