const licenses = require('../models/licenses')

exports.licenses_create_get = (req, res) => {
    res.render('licenses/add')
}

exports.licenses_create_post = async (req, res) => {
    try{
        console.log(req.body)
        const licenses = new licenses(req.body)

        await licenses.save()

    } catch (error){
        console.log(error.message)
    }
}

exports.licenses_index_get = async (req, res) => {
    try {
        const licensess = await licenses.find()
        res.render('licenses/index', {licensess})
    } catch (error){
        console.log(error.message)
    }
}