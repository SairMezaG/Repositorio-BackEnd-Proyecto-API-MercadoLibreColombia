// Se importan los módulos
const express = require("express"); // El framework express sirve para crear servidores y manejar rutas
const mongoose = require("mongoose"); // El módulo mongoose sirve para interactuar con dbs
const cors = require("cors"); // Permite las solicitudes CORS
const multer = require("multer"); // Manejo de imágenes
const path = require("path"); // Manejo de imágenes
require("dotenv").config(); // Se cargan las variables de entorno definidas en el archivo .env


const app = express();

app.use(cors()); 
app.use(express.json()); 

const port = process.env.PORT || 9001;

// Configuración de multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Se importan las rutas
const rutasUsuarios = require("./routes/usuarios");
const rutasCategorias = require("./routes/categorias");
const rutasProductos = require("./routes/productos")(upload);

// Middleware
app.use(express.json());
app.use("/api", rutasUsuarios);
app.use("/api", rutasCategorias);
app.use("/api", rutasProductos);



// Ruta principal
app.get("/", (req, res) => {
  res.send("BackEnd Proyecto Mercado Libre Colombia");
});

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conexion EXITOSA"))
  .catch((error) => console.error("Error de CONEXION.", error));

// Conexión con el servidor
app.listen(port, () =>
  console.log(`Servidor corriendo en http://localhost:${port}`)

);
