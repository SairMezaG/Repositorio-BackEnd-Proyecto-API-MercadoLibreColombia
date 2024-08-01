// Se importa la librería mongoose para interactuar con dbs
const mongoose = require("mongoose");

// Se crea el esquema
const productosSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  precio: {
    type: Number,
    required: true,
  },
  imagen: {
    type: String,
    required: true,
  },
});

// Se exporta el esquema
module.exports = mongoose.model("productos", productosSchema); // Se entregan como parametros la collección a la que va dirigida y el esquema creado
