import { Router } from 'express'
import { parseISO } from 'date-fns'
import AppointementRepository from '../repositories/AppointementRepository'
import CreateAppointmentService from '../service/CreateAppointmentService'

const appointmentsRouter = Router()
const appointmentRepository = new AppointementRepository()

// Rota: Receber a requisição, chamar outro arquivo e devolver a reposta

appointmentsRouter.get('/', (_, response) => {
  const appointments = appointmentRepository.all()

  return response.json(appointments)
})

appointmentsRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body

    const parsedDate = parseISO(date)

    const createAppointment = new CreateAppointmentService(
      appointmentRepository,
    )

    const appointment = createAppointment.execute({
      provider,
      date: parsedDate,
    })

    return response.json(appointment)
  } catch (err) {
    return response.status(400).json({ error: err.message })
  }
})

export default appointmentsRouter
