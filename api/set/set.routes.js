const express = require('express')
const { log } = require('../../middlewares/logger.middleware')
const { requireAuth } = require('../../middlewares/requireAuth.middleware')
const { getSets, getSetById, addSet, updateSet, removeSet } = require('./set.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getSets)
router.get('/:id', getSetById)
router.post('/', requireAuth, addSet)
router.put('/:id', requireAuth, updateSet)
// router.delete('/:id', removeGig)

module.exports = router