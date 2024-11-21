import express from "express";

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Bienvenido a mi API");
});

app.get("/events", (req, res) => {
  res.send("Listado de eventos");
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
