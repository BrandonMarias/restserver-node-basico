const moongoose = require('mongoose');

const dbConnection = async () => {

    try {

        await moongoose.connect(process.env.MONGODB_ATLAS)

     console.log('base de datos online')
        
    } catch (error) {
        console.log(error)
        throw new Error('error en la conecion de la base de datos')
    }

}

module.exports = {
    dbConnection
}