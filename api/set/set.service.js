const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId
const userService = require('../user/user.service');

async function query(filterBy) {
    try {
        const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('set')
        let sortBy = filterBy.sortBy
        let sortType = 1
        let sets = await collection.find(criteria).sort({ [sortBy]: sortType }).toArray()
        return sets
    } catch (err) {
        logger.error('cannot find sets', err)
        throw err
    }
}

function _buildCriteria(filterBy) {
    let criteria = {}
    if (filterBy.txt) {
        const txtCriteria = { $regex: filterBy.txt, $options: 'i' } //'i' for Capitals       
        criteria.$or = [
            {
                title: txtCriteria
            },
            {
                description: txtCriteria
            }
        ]
    }
    return criteria
}

async function getById(gigId) {
    try {
        const collection = await dbService.getCollection('set')
        const set = collection.findOne({ _id: ObjectId(setId) })
        return set
    } catch (err) {
        logger.error(`while finding set ${setId}`, err)
        throw err
    }
}

async function remove(setId) {
    try {
        const collection = await dbService.getCollection('set')
        await collection.deleteOne({ _id: ObjectId(setId) })
        return setId
    } catch (err) {
        logger.error(`cannot remove set ${setId}`, err)
        throw err
    }
}

async function add(set) {
    try {
        const collection = await dbService.getCollection('set')
        await collection.insertOne(set)
        const user = await userService.updateUserIsSeller(set.user._id)
        return set
    } catch (err) {
        logger.error('cannot insert set', err)
        throw err
    }
}


async function update(set) {
    try {
        let id = ObjectId(set._id)
        delete set._id
        const collection = await dbService.getCollection('set')
        await collection.updateOne({ _id: ObjectId(id) }, { $set: { ...set } })
        return set
    } catch (err) {
        logger.error(`cannot update set ${setId}`, err)
        throw err
    }
}


module.exports = {
    remove,
    query,
    getById,
    add,
    update
}