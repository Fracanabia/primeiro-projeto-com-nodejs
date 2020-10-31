import { startOfHour } from 'date-fns'
import Appointment from '../model/Appointment'
import AppointmentRepository from '../repositories/AppointementRepository'

interface Request {
  provider: string
  date: Date
}

class CreateAppointmentService {
  private appointmentRepository: AppointmentRepository

  constructor(appointmentRepository: AppointmentRepository) {
    this.appointmentRepository = appointmentRepository
  }

  public execute({ provider, date }: Request): Appointment {
    const appointmentDate = startOfHour(date)

    const findAppointmentSameDate = this.appointmentRepository.findByDate(
      appointmentDate,
    )

    if (findAppointmentSameDate) {
      throw Error('This appointment is already booked')
    }

    const appointment = this.appointmentRepository.create({
      provider,
      date: appointmentDate,
    })

    return appointment
  }
}

export default CreateAppointmentService
