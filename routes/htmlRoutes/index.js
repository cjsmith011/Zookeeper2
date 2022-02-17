const path = require('path');
const router = require('express').Router();

//this will route to our index
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});

//this will activate our animals page, just animals not api/animals since we are connecting to an html, not the data
router.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/animals.html'));
});

//this will activate our zookeepers page, just zookeeperss not api/zookeepers since we are connecting to an html, not the data
router.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
});

//this will route to the homepage if a user selects an option without a route, wildcard option with the *, should always be the last GET
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
});


module.exports = router;