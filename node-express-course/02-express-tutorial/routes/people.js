const express = require('express')
const router = express.Router()

const {
  getPeople, createPerson, createPersonPostman, updatePerson, delPerson
} = require('../controllers/people')

// Declaration of routes set up 1
// router.get('/', getPeople)

// router.post('/', createPerson)

// router.post('/postman', createPersonPostman)

// router.put('/:id', updatePerson)

// router.delete('/:id', delPerson)



// Declaration of routes set up 2 - fewer codes thanks of chaining
router.route('/').get(getPeople).post(createPerson)
router.route('/postman').post(createPersonPostman)
router.route('/:id').put(updatePerson).delete(delPerson)

module.exports = router