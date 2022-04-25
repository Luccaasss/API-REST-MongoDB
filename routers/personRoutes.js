const router = require('express').Router()
const Person = require('../models/Person')

//Create
router.post('/', async (req, res) => {
  const { name, salary, approved } = req.body
  const person = {
    name,
    salary,
    approved
  }

  if (!name) {
    res.status(422).json({
      message: 'Name is required'
    })
  }

  try {
    await Person.create(person)
    res.status(201).json({
      message: 'Person on Database'
    })

  } catch (error) {
    res.status(500).json({
      error: error
    })
  }
})

//Read
router.get('/', async (req, res) => {
  try {
    const people = await Person.find()
    res.status(200).json(people)

  } catch (error) {
    res.status(500).json({
      error: error
    })
  }
})

router.get('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const person = await Person.findOne({ name: id })
    if (!person) res.status(422).json({ message: "User dons't exist" })
    res.status(200).json(person)
  } catch (err) {
    res.json({
      error: err
    })
  }
})

//Update
router.patch('/:id', async (req, res) => {
  const id = req.params.id
  const { name, salary, approved } = req.body
  const person = { name, salary, approved }

  try {
    const updatePerson = await Person.updateOne({ name: id }, person)
    res.status(200).json(person)
  } catch (err) {
    res.status(500).json({ error: err })
  }
})

//Delete
router.delete('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const userDelete = await Person.deleteOne({ name: id })
    res.status(200).json(userDelete)
  } catch (error) {
    res.status(500).json({ error: error })
  }
})



module.exports = router