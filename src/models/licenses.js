const express = require('express')
const router = express.Router()
const licensesController = require('../controllers/licenses')
const isLoggedIn = require('../lib/isLoggedIn')

// router.get('/licenses/add', isLoggedIn, licensesController.licenses_create_get)
router.get('/accunt/add', licensesController.licenses_create_get)
router.post('/licenses/add', licensesController.licenses_create_post)
router.get('/licenses/index',isLoggedIn, licensesController.licenses_index_get)
router.post('/licenses/delete', licensesController.licenses_delete)
router.get('/licenses/detail', licensesController.licenses_detail_get)
// router.get('/licenses/edit', isLoggedIn, licensesController.licenses_edit_get)
router.get('/licenses/edit', licensesController.licenses_edit_get)
router.post('/licenses/edit', licensesController.licenses_edit_post)

module.exports = router