const { filterByQuery, findById, createNewAnimal, validateAnimal } = require('../../lib/animals');
const { animals } = require('../../data/animals');
const router = require('express').Router();

router.get('/animals', (req, res) => {
    let results = animals;
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
    } else {
    res.send(404);
    }
});

router.post('/animals', (req, res) => {
    //req.body is where our incoming content will be
    //set id based on what the next index of the array will be when user adds an animal
    req.body.id = animals.length.toString();

    //validation of user added animals- if any data is missing, send a 400 error back to the user
    if (!validateAnimal(req.body)) {
        res.status(400).send('Please send your animal data in the proper format');
    } else {
    //add animal to the animals.json file and array 
    const animal = createNewAnimal(req.body, animals);

    res.json(animal);
    }
});

module.exports = router;