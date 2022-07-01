const {Schema, model} = require("mongoose")

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required: [true, "el nombre es obligatorio"],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    precio: {
        type: Number,
        default: 0,

    },
    descripcion: {
        type: String,
        default: "nuevo producto"

    },
    stock: {
        type: Number,
        default: 0
    },
    disponible: {
        type:  Boolean,
        default: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },

})

ProductoSchema.methods.toJSON = function () {
    const { __v, estado, ...data } = this.toObject();

    return data;
  };
  

module.exports = model("Producto", ProductoSchema)