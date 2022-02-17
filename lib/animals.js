const fs = require('fs');
const path = require('path');


function filterByQuery(query, animalsArray) {
    let personalityTraitsArray = [];
    let filteredResults = animalsArray;
     if (query.personalityTraits) {
         //save the traits as a dedicated array and if they are a string put the in the new array andsave
         if(typeof query.personalityTraits === 'string') {
             personalityTraitsArray = [query.personalityTraits];
         } else {
             personalityTraitsArray = query.personalityTraits;
         }
         //loop thru each trai tin the array since there MAY be more than one
         personalityTraitsArray.forEach(trait => {
             //check the trait against each animal, the array will then only have the animals with the trait
             animal => animal.personalityTraits.indexOf(trait) !== -1
         });
     };
     
     if (query.diet) {
        filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
     }
     if (query.species) {
         filteredResults = filteredResults.filter(animal => animal.species === query.species);
     }
     if (query.name) {
         filteredResults = filteredResults.filter(animal => animal.name === query.name);
     }
     return filteredResults;
    }

function findById(id, animalsArray) {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result;
}

function createNewAnimal(body, animalsArray) {
    
    //our function's main code is here
    const animal = body;
    animalsArray.push(animal);
    //this is the synchronous version of writeFile, use for small datasets only
    fs.writeFileSync(
        //this is telling createNewAnimal where to put the data the user sent as a new animal - in our animals.json file
        //the join word is needed to take from the url dir and join it to the data file
        path.join(__dirname, '../data/animals.json'),

        //the null says to not change our existing data: add to it don't overwrite it and the 2 gives 2 lines of whitespace gap
        JSON.stringify({ animals: animalsArray }, null, 2)
    );
    //return finished code to post route for response 
    return animal;
}

function validateAnimal(animal) {
    if (!animal.name || typeof animal.name !== 'string') {
        return false;
    }
    if (!animal.species || typeof animal.species !== 'string') {
        return false;
    }
    if (!animal.diet || typeof animal.diet !== 'string') {
        return false;
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
    }
    return true;
}

module.exports = {
    filterByQuery,
    findById,
    createNewAnimal,
    validateAnimal
};