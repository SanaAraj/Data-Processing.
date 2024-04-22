const express = require('express')
const router = express.Router()
const inspectionController = require('../controllers/inspections')
const isLoggedIn = require('../lib/isLoggedIn')

// router.get('/inspection/add', isLoggedIn, inspectionController.inspection_create_get)
router.get('/inspection/add', inspectionController.inspection_create_get)
router.post('/inspection/add', inspectionController.inspection_create_post)
router.get('/inspection/index',isLoggedIn, inspectionController.inspection_index_get)
router.post('/inspection/delete', inspectionController.inspection_delete)
router.get('/inspection/detail', inspectionController.inspection_detail_get)
// router.get('/inspection/edit', isLoggedIn, inspectionController.inspection_edit_get)
router.get('/inspection/edit', inspectionController.inspection_edit_get)
router.post('/inspection/edit', inspectionController.inspection_edit_post)

module.exports = router