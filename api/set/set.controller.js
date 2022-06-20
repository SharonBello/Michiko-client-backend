const setService = require('./set.service.js');
const logger = require('../../services/logger.service')
const utilService = require('../../services/util.service')

// GET LIST
async function getSets(req, res) {
  try {
    let queryParams = req.query
    const sets = await setService.query(queryParams)
    res.send(sets);
  } catch (err) {
    logger.error('Failed to get sets', err)
    res.status(500).send({ err: 'Failed to get sets' })
  }
}

// GET BY ID 
async function getSetById(req, res) {
  try {
    const setId = req.params.id;
    const set = await setService.getById(setId)
    res.json(set)
  } catch (err) {
    logger.error('Failed to get set', err)
    res.status(500).send({ err: 'Failed to get set' })
  }
}

// POST (add set)
async function addSet(req, res) {
  try {
    const set = req.body;
    const addedSet = await setService.add(set)
    res.json(addedSet)
  } catch (err) {
    logger.error('Failed to add set', err)
    res.status(500).send({ err: 'Failed to add set' })
  }
}

// PUT (Update set)
async function updateSet(req, res) {
  try {
    const set = req.body;
    const updatedSet = await setService.update(set)
    res.json(updatedSet)
  } catch (err) {
    logger.error('Failed to update set', err)
    res.status(500).send({ err: 'Failed to update set' })
  }
}

// DELETE (Remove set)
async function removeSet(req, res) {
  try {
    const setId = req.params.id;
    const removedId = await setService.remove(setId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove set', err)
    res.status(500).send({ err: 'Failed to remove set' })
  }
}

module.exports = {
  getSets,
  getSetById,
  addSet,
  updateSet,
  removeSet
}
