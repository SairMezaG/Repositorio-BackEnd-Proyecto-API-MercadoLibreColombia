const express = require("express");
const productosSchema = require("../models/productos");

// Se crea el enrutador
const router = express.Router();

module.exports = (upload) => {
  // Mostrar todos los productos
  router.get("/producto", async (req, res) => {
    try {
      const productos = await productosSchema.find();
      res.json(productos);
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  });

  // Mostrar producto
  router.get("/producto/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await productosSchema.findById(id);
      if (!producto) {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
      }
      res.json(producto);
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  });

  // Crear producto
  router.post("/producto", upload.single("imagen"), async (req, res) => {
    try {
      const { nombre, precio } = req.body;

      if (!req.file) {
        return res.status(400).json({ mensaje: "La imagen es requerida." });
      }

      const imagen = req.file.filename;
      const producto = new productosSchema({ nombre, precio, imagen });
      const productoGuardado = await producto.save();
      res.status(201).json(productoGuardado);
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  });

  // Actualizar producto
  router.put("/producto/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, precio, imagen } = req.body;
      const productoActualizado = await productosSchema.updateOne(
        { _id: id },
        { $set: { nombre, precio, imagen } }
      );
      if (productoActualizado.matchedCount === 0) {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
      }
      res.json(productoActualizado);
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  });

  // Eliminar producto
  router.delete("/producto/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const productoEliminado = await productosSchema.deleteOne({ _id: id });
      if (productoEliminado.deletedCount === 0) {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
      }
      res.json(productoEliminado);
    } catch (error) {
      res.status(500).json({ mensaje: error.message });
    }
  });

  // Devolver el enrutador configurado
  return router;
};
