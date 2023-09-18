import { Flight } from "../models/flight.js"

function newFlight(req, res) {
  res.render('flights/new', {
    title: 'Add Flight'
  })
}

function create(req, res) {
  req.body.nowShowing = !!req.body.nowShowing
  if (req.body.cast) {
    req.body.cast = req.body.cast.split(', ')
  }
  for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key]
  }
  Flight.create(req.body)
  .then(flight =>  {
    console.log(flight)
    res.redirect('/flights')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights')
  })
}

function index(req, res) {
  Flight.find({})
  .then(flights => {
    res.render('flights/index', {
      flights: flights,
      title: 'All Flights'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/flights/new')
  })
}

// function show(req, res) {
//   Movie.findById(req.params.movieId)
//   .then(movie => {
//     res.render('movies/show', {
//       movie: movie,
//       title: 'Movie Detail'
//     })
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect('/movies')
//   })
// }

// function deleteMovie(req, res) {
//   Movie.findByIdAndDelete(req.params.movieId)
//   .then(movie => {
//     res.redirect('/movies')
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect('/movies')
//   })
// }

// function edit(req, res) {
//   Movie.findById(req.params.movieId)
//   .then(movie => {
//     res.render('movies/edit', {
//       movie: movie,
//       title: 'Edit Movie'
//     })
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect('/movies')
//   })
// }

// function update(req, res) {
//   req.body.nowShowing = !!req.body.nowShowing
//   if (req.body.cast) {
//     req.body.cast = req.body.cast.split(', ')
//   }
//   for (let key in req.body) {
//     if (req.body[key] === '') delete req.body[key]
//   }
//   Movie.findByIdAndUpdate(req.params.movieId, req.body, {new: true})
//   .then(movie => {
//     res.redirect(`/movies/${movie._id}`)
//   })
//   .catch(err => {
//     console.log(err)
//     res.redirect('/movies')
//   })
// }

export {
  newFlight as new,
  create,
  index,
  // show,
  // deleteMovie as delete,
  // edit,
  // update
}