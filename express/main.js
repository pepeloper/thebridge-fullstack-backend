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
  const newEvent = {
    id: events.length + 1,
    name: req.body.name,
    description: req.body.description,
    start_at: req.body.start_at,
    ends_at: req.body.ends_at,
    address: req.body.address,
    booking_open: req.body.booking_open,
    image: req.body.image,
  };

  events.push(newEvent);

  res.status(201).json(newEvent);
});

app.put("/events/:id", (req, res) => {
  const { id } = req.params;

  const eventIndex = events.findIndex((event) => event.id === parseInt(id));

  if (eventIndex === -1) {
    return res.status(404).json({ message: "Evento no encontrado" });
  }

  events[eventIndex] = {
    ...events[eventIndex],
    ...req.body,
  };

  res.json(events[eventIndex]);
});

app.delete("/events/:id", (req, res) => {
  const { id } = req.params;

  const eventIndex = events.findIndex((event) => event.id === parseInt(id));

  if (eventIndex === -1) {
    return res.status(404).json({ message: "Evento no encontrado" });
  }

  events.splice(eventIndex, 1);

  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Servidor levantado en el puerto ${PORT}`);
});
