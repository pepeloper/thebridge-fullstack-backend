import express from "express";
import events from "./data.js";

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Bienvenido a mi API");
});

app.get("/events", (req, res) => {
  res.json(events);
});

app.post("/events", (req, res) => {
  res.send("Crear un evento");
});

app.put("/events", (req, res) => {
  res.send("Actualizar un evento");
});

app.delete("/events", (req, res) => {
  res.send("Eliminar un evento");
});

app.listen(PORT, () => {
  console.log(`Servidor levantado en el puerto ${PORT}`);
});
