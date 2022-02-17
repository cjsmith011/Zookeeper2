const { filterByQuery, findById, createNewZookeeper, validateZookeeper } = require('../../lib/zookeepers');
const { zookeepers } = require('../../data/zookeepers');
const router = require('express').Router();

router.get('/zookeepers', (req, res) => {
    let results = zookeepers;
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/zookeepers/:id', (req, res) => {
    const result = findById(req.params.id, zookeepers);
    if (result) {
        res.json(result);
    } else {
    res.send(404);
    }
});

router.post('/zookeepers', (req, res) => {
    //req.body is where our incoming content will be
    //set id based on what the next index of the array will be when user adds an animal
    req.body.id = zookeepers.length.toString();

    //validation of user added animals- if any data is missing, send a 400 error back to the user
    if (!validateZookeeper(req.body)) {
        res.status(400).send('Please send your zookeeper info in the proper format');
    } else {
    //add zookeeper to the file and array 
    const zookeeper = createNewZookeeper(req.body, zookeepers);

    res.json(zookeeper);
    }
});

module.exports = router;