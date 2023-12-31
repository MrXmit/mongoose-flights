import { Flight } from "../models/flight.js"
import { Meal } from "../models/meal.js"

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
		.then(flight => {
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

function show(req, res) {
	Flight.findById(req.params.flightId)
	.populate('meals')
	.then(flight => {
		Meal.find({_id: {$nin: flight.meals}})
		.then(meals => {
			res.render('flights/show', {
				flight: flight,
				title: 'Flight Detail',
				meals: meals
			})
		})
		.catch(err => {
		  console.log(err)
		  res.redirect('/flights')
		})
	  })
	  .catch(err => {
		console.log(err)
		res.redirect('/flights')
	  })
}

function edit(req, res) {
	Flight.findById(req.params.flightId)
		.then(flight => {
			res.render('flights/edit', {
				flight: flight,
				title: 'Edit Flight'
			})
		})
		.catch(err => {
			console.log(err)
			res.redirect('/flights')
		})
}

function update(req, res) {
	req.body.nowShowing = !!req.body.nowShowing
	if (req.body.cast) {
		req.body.cast = req.body.cast.split(', ')
	}
	for (let key in req.body) {
		if (req.body[key] === '') delete req.body[key]
	}
	Flight.findByIdAndUpdate(req.params.flightId, req.body, { new: true })
		.then(flight => {
			res.redirect(`/flights/${flight._id}`)
		})
		.catch(err => {
			console.log(err)
			res.redirect('/flights')
		})
}

function createTicket(req, res) {
	Flight.findById(req.params.flightId)
		.then(flight => {

			flight.tickets.push(req.body)
			flight.save()
				.then(() => {
					res.redirect(`/flights/${flight._id}`)
				})
				.catch(err => {
					console.log(err)
					res.redirect('/flights')
				})
		})
		.catch(err => {
			console.log(err)
			res.redirect('/flights')
		})
}

function addMealToFlight(req, res) {
	// find the flight
	Flight.findById(req.params.flightId)
	.then(flight => {
		console.log(flight)
		console.log(req.body.mealId)
	  flight.meals.push(req.body.mealId)  // add the meal _id to cast array
	  flight.save()  // save the flight
	  .then(() => {
		res.redirect(`/flights/${flight._id}`)
	  })
	  .catch(err => {
		console.log(err)
		res.redirect('/flights')
	  })
	})
	.catch(err => {
	  console.log(err)
	  res.redirect('/flights')
	})
  }
  

export {
	newFlight as new,
	create,
	index,
	show,
	edit,
	update,
	createTicket,
	addMealToFlight
}