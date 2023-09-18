import { Router } from 'express'

const router = Router()

import * as flightsCtrl from '../controllers/flights.js'


router.get('/', flightsCtrl.index)
router.get('/new', flightsCtrl.new)
// router.get('/:movieId', flightsCtrl.show)
// router.get('/:movieId/edit', flightsCtrl.edit)
router.post('/', flightsCtrl.create)
// router.delete('/:movieId', flightsCtrl.delete)
// router.put('/:movieId', flightsCtrl.update)


export { router }
