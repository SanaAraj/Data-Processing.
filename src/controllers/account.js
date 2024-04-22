const inspections = require('../models/inspections')
const accounts = require('../models/accounts')

exports.inspections_create_get = async (req, res) => {
    try {
        const accountss = await accounts.find()
        res.render('inspections/add', {accountss})
    } catch (error) {
        console.log(error.message)
    }
}

exports.inspections_create_post = (req, res) => {
    console.log(req.body)


    const inspections = new inspections(req.body)
    inspections.save()
        .then(() => {
            console.log('Your inspections has been saved')
            res.status(201).json(inspections)
        })
        .catch((err) => {
            console.log('an error occurred', err)
        })
}

exports.inspections_index_get = async (req, res) => {
    try{
        const inspectionss = await inspections.find().populate('accounts')
        console.log(inspectionss)
        if (inspectionss.length){
            res.status(200).json(inspectionss)
            
        } else {
            res.sendStatus(404)
        }

        // res.render('inspections/index', { inspectionss: inspectionss })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message: error.message})
        // res.send('Something went wrong')
    }

    // inspections.find().then((inspectionss) =>{
    //     console.log(inspectionss)
    //     res.render('inspections/index', {inspectionss})
    // }).catch((error) => {
    //     console.log(error.message)
    //     res.send('HMMMMM Something is not right')
    // })

}

exports.inspections_delete = async (req, res) => {
    console.log(req.query.id)
    try {
        // Try to execute this code
        await inspections.findByIdAndDelete(req.query.id)
        res.sendStatus(204)
        // res.status(200).json({message: 'inspections is deleted'})
    } catch (error) {
        // Execute this if there is an error
        console.log(error.message)
        res.status(500).json({message: error.message})
    } finally {
        // Execute this code no matter what
        console.log('We are in the finally block')
    }
}

exports.inspections_detail_get = async (req, res) => {
    try {
        const inspections = await inspections.findById(req.query.id)
        res.json(inspections)
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
}

exports.inspections_edit_get = async (req, res) => {
    try {
        const inspections = await inspections.findById(req.query.id)
        res.render('inspections/edit', {inspections})
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
    }
}

exports.inspections_edit_post = async (req, res) => {
    try {
        console.log(req.body.id)
        await inspections.findByIdAndUpdate(req.body.id, req.body)
        res.redirect('/inspections/index')
    } catch (error) {
        console.log(error.message)
    }
}