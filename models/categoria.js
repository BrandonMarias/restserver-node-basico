const {Schema, model} = require("mongoose")

const CategoriaSchema = Schema({
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
    }
})

module.exports = model("Categoria", CategoriaSchema)