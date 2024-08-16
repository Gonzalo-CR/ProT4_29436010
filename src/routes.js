import { Router } from "express";
import { biblioteca } from "./controller.js";

export const router = Router();

// Rutas para la biblioteca
router.get("/biblioteca", biblioteca.getAll);
router.get("/biblioteca/:id", biblioteca.getOne);
router.post("/libroNuevo", biblioteca.create);
router.put("/biblioteca/:id", biblioteca.update);
router.delete("/biblioteca/:ISBN", biblioteca.delete);
