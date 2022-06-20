const express = require('express')
const { requireAuth } = require('../../middlewares/requireAuth.middleware')
const { getUser, getUsers, deleteUser, updateUser } = require('./user.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', requireAuth,getUsers)
router.get('/:id', requireAuth, getUser)
router.put('/:id', requireAuth, updateUser)

router.delete('/:id', requireAuth, deleteUser)

module.exports = router