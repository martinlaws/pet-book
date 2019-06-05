const express = require('express');
const router = express.Router();

const petsDB = [
	{ id: 1, name: 'Maya', imgURL: 'https://i.imgur.com/YU3ADxA_d.jpg?maxwidth=640&shape=thumb&fidelity=medium' },
  { id: 2, name: 'Mittens', imgURL: 'https://placekitten.com/300/300' }
]

const findPet = id => petsDB.find(pet => pet.id === Number(id))

const findPetIndex = id => petsDB.findIndex( pet => pet.id === Number(id));

/* GET home page. */
router.get('/pets', (req, res) => {
  res.render('pets-index', { db: petsDB })
})

router.get('/pets/new/', (req, res) => {
  res.render('pets-new')
})

router.post('/pets', (req, res) => {
  const { name, imgURL } = req.body
  const id = petsDB.length + 1

  petsDB.push({
    id,
    name,
    imgURL
   })

   res.redirect('/pets')
})

router.get('/pets/:id', (req, res) => {
  const { id } = req.params

  res.render('pet-show', { pet: findPet(id) })
})

router.get('/pets/:id/edit', (req, res) => {
  const { id } = req.params;

  res.render('pet-edit', { pet: findPet(id) });
});

router.post('/pets/:id/edit', (req, res) => {
  const {
    id,
    name,
    imgURL
  } = req.body;

  const updatedPet = {
    id: Number(id),
    name,
    imgURL
  };

  petsDB[findPetIndex(id)] = updatedPet;

  res.redirect(`/pets/${ id }`);
});

router.get('/pets/:id/delete', (req, res) => {
  const { id } = req.params;

  petsDB.splice(findPetIndex(id), 1);

  res.redirect('/pets');
});


module.exports = router;
