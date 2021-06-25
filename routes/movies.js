var express = require('express');
let movies = require('../data/movies.json')
var router = express.Router();


router.get('/', (req, res) => {
  if(req.query.title) {
    let filteredMovies = movies;
    let searchTitle = req.query.title.toLowerCase()
    filteredMovies = movies.filter(movie => movie.title.toLowerCase().includes(searchTitle))
    if(filteredMovies.length===0) {
      return res.status(404)
      .send("Your query string returned no results.")
    } else {
      return res.send(filteredMovies)
    }
  }
  res.send(movies)
});


router.get('/:id', function(req, res, next) {
  let movieID = Number(req.params.id); 

  let filteredMovies = movies.filter(movie => movie.id===movieID)

  if(filteredMovies.length > 0) {
    res.status(200).send(filteredMovies[0])
  } else {
    res.status(400).send(`Movie ID ${movieID} invalid.`)
  }
});

let id = 5; 
router.post('/', (req, res) => {
  movies.push(req.body)
  res.send({
    "id": id+=1,
    "title": req.body.title,
    "runtime": req.body.runtime,
    "release_year": req.body.release_year,
    "director": req.body.director,
    })
})

router.delete('/:id', (req, res) => {
  let movieID = Number(req.params.id);
  movies = movies.filter(movie => movie.id !== movieID)
  res.send(`Deleting Movie with ID ${movieID}`)
})


module.exports = router;
