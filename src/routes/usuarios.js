const express = require("express");

// Se crea el enrutador
const router = express.Router();

// Se importa el esquema correspondiente
const usuariosSchema = require("../models/usuarios");

// Mostrar todos los usuarios
router.get("/usuario", async (req, res) => {
  try {
    const data = await usuariosSchema.find(); // Método para encontrar todos los usuarios
    res.json(data); // Después se responde con los datos encontrados
  } catch (error) {
    res.status(500).json({ mensaje: error.message }); // Si no se encuentran se responde con un error
  }
});

// Mostrar usuario
router.get("/usuario/:id", async (req, res) => {
  try {
    const { id } = req.params; // Se extrae el id desde los parametros
    const data = await usuariosSchema.findById(id); // Encontrar dato con un id
    if (!data) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// Crear usuario
router.post("/usuario", async (req, res) => {
  try {
    const usuario = new usuariosSchema(req.body); // Se crea el usuario con el esquema preestablecido
    const data = await usuario.save(); // Se guarda el usuario en la base de datos
    res.status(201).json(data); // Después se responde con los datos guardados
  } catch (error) {
    res.status(500).json({ mensaje: error.message }); // Si no se logra guardar se responde con un error
  }
});

// Actualizar usuario
router.put("/usuario/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body; // Se extraen los campos desde el cuerpo del esquema
    const data = await usuariosSchema.updateOne(
      { _id: id },
      {
        $set: { name, email, password },
      }
    ); // Al método de actualizar se le pasan dos parametros, el id y los campos que se van a cambiar
    if (data.matchedCount === 0) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// Eliminar usuario
router.delete("/usuario/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await usuariosSchema.deleteOne({ _id: id }); // Al método de eliminar se le pasa un objeto con el id
    if (data.deletedCount === 0) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ mensaje: error.message });
  }
});

// Se exportan las rutas
module.exports = router;
