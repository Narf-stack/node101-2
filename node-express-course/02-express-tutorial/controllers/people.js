let { people } = require('../data')

const getPeople = (req,res) =>{
  res.status(200).json({success: true, data: people})
}

const createPerson =  (req,res) => {
  const { name } = req.body
  if(name){
    return res.status(201).json({success: true, person: name})
  } else {
    return res.status(401).json({success: false, msg:'please provide credential'} )
  }
}

const createPersonPostman =  (req,res) => {
  const { name } = req.body
  if(name){
    return res.status(201).json({success: true, data: [...people, name]})
  } else {
    return res.status(401).json({success: false, msg:'please provide credential'} )
  }
}

const updatePerson = (req,res) => {
  const { id } = req.params
  const { name } = req.body
  
  const person = people.find(({id})=> id === Number(id))
  
  if(!person){
    return res
      .status(404)
      .json({success: false, msg:`id ${id} does not exist `})
  }

  const newPeople= people.map((person) =>{
    if(person.id === Number(idParams)) {
      person.name = name
    }
    return person
  })

  res.status(200).json({success: true, data: newPeople})
}

const delPerson = (req,res) =>{  
  const person = people.find(({id})=> id === Number(req.params.id))
  
  if(!person){
    return res
      .status(404)
      .json({success: false, msg:`id ${req.params.id} does not exist `})
  }

  const newPeople = people.filter((person) => person.id !== Number(req.params.id))

  res.status(200).json({success: true, data: newPeople})
}


module.exports = {
  getPeople, createPerson, createPersonPostman, updatePerson, delPerson
}