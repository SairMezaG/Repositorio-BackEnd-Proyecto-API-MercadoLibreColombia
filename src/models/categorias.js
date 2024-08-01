// Se importa la librería de Mongo, para interactuar con la db
const mongoose = require("mongoose")

// Se crea el esquema
const categoriasSchema = mongoose.Schema ({
    nombre: {
        type: String,
        required: true
    },
})

// Se exporta el esquema
module.exports = mongoose.model("categorias", categoriasSchema); // Se entregan como parametros la collección a la que va dirigida y el esquema creado