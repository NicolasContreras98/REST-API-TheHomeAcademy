import { Router } from "express";
import {
  getLibros,
  createLibros,
  updateLibros,
  deleteLibros,
  getLibro
} from "../controllers/libros.controller.js";

const router = Router();

router.get("/Libros", getLibros);

router.get("/Libros/:id", getLibro);

router.post("/Libros", createLibros);

router.patch("/Libros:id", updateLibros);

router.delete("/Libros/:id", deleteLibros);

export default router;
