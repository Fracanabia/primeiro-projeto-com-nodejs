// src/routes/index.ts
import { Router } from 'express'
import appointmentsRouter from './appoitaments.routes'

const routes = Router()

routes.use('/appointments', appointmentsRouter)

export default routes
