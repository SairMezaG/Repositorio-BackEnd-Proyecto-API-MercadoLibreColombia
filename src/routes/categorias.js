const express = require("express");

// Se crea el enrutador
const router = express.Router();

// Se importa el esquema correspondiente
const categoriasSchema = require("../models/categorias");

// Mostrar todas las categorias
router.get("/categoria", async (req, res) => {
  try {
    const data = await categoriasSchema.find(); // Método para encontrar todas las categorias
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// Mostrar una categoria en específico
router.get("/categoria/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await categoriasSchema.findById(id); // Encontrar con el id
    if (!data) {
      return res.status(404).json({ mensaje: "Categoria no encontrada" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// Crear categoria
router.post("/categoria", async (req, res) => {
  try {
    const categoria = new categoriasSchema(req.body);
    const data = await categoria.save();
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// Actualizar categoria
router.put("/categoria/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    const data = await categoriasSchema.updateOne(
      { _id: id },
      { $set: { nombre } }
    );
    if (data.matchedCount === 0) {
      return res.status(404).json({ mensaje: "Categoria no encontrada" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// Eliminar categoria
router.delete("/categoria/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await categoriasSchema.deleteOne({ _id: id });
    if (data.deletedCount === 0) {
      return res.status(404).json({ mensaje: "Categoria no encontrada" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// Se exportan las rutas
module.exports = router;
