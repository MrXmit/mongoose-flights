import { Router } from 'express'

const router = Router()

import * as flightsCtrl from '../controllers/flights.js'


router.get('/', flightsCtrl.index)
router.get('/new', flightsCtrl.new)
router.post('/', flightsCtrl.create)
router.get('/:flightId', flightsCtrl.show)
router.get('/:flightId/edit', flightsCtrl.edit)
router.put('/:flightId', flightsCtrl.update)
// router.delete('/:flightId', flightsCtrl.delete)



export { router }
