import express from "express";
import librosRoutes from "./routes/libros.routes.js";

const app = express();

app.use(express.json());

app.use("/api", librosRoutes);

app.use((req, res, next) => {
  res.status(404).json({
    message: "Endpoint no encontrado",
  });
});

export default app;
