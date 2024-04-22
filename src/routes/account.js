const express = require('express')
const router = express.Router()
const accountController = require('../controllers/accounts')
const isLoggedIn = require('../lib/isLoggedIn')

// router.get('/account/add', isLoggedIn, accountController.account_create_get)
router.get('/account/add', accountController.account_create_get)
router.post('/account/add', accountController.account_create_post)
router.get('/account/index',isLoggedIn, accountController.account_index_get)
router.post('/account/delete', accountController.account_delete)
router.get('/account/detail', accountController.account_detail_get)
// router.get('/account/edit', isLoggedIn, accountController.account_edit_get)
router.get('/account/edit', accountController.account_edit_get)
router.post('/account/edit', accountController.account_edit_post)

module.exports = router