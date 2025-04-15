import {Router} from 'express'
import { createService, getAllServices, getServiceById, showService, updateService, deleteService } from '../controllers/servicesController.js'
import { verifyUser } from '../middlewares/verifyUser.js'

const servicesRouter = Router()


servicesRouter.get('/services', getAllServices)
servicesRouter.get('/services', getServiceById)

servicesRouter.post('/services', verifyUser, createService)
servicesRouter.get('/services/:id', verifyUser, showService)
servicesRouter.patch('/services/:id', verifyUser, updateService)
servicesRouter.delete('/services/:id', verifyUser, deleteService)

export default servicesRouter