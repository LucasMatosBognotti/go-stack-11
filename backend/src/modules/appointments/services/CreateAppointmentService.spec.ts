import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import FakeNotificationsRepository from '../../notifications/repositories/fakes/FakeNotificationsRepository';
import CreateAppointmentService from './CreateAppointmentService';

import AppError from '../../../shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointment: CreateAppointmentService;

// src/modules/appointments/services/CreateAppointmentService.spec.ts

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
    );
  });

  it('should be able to create appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 9, 10, 15),
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('provider');
    expect(appointment.user_id).toBe('user');
  });

  it('should not able to create two appointments on the same time', async () => {
    const appoinmentSameDate = new Date(2020, 8, 8, 8);

    await createAppointment.execute({
      provider_id: 'provider',
      user_id: 'user',
      date: appoinmentSameDate,
    });

    await expect(
      createAppointment.execute({
        provider_id: 'provider',
        user_id: 'user',
        date: appoinmentSameDate,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointmnet on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        provider_id: 'provider',
        user_id: 'user',
        date: new Date(2020, 9, 10, 11),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        provider_id: 'provider_user',
        user_id: 'provider_user',
        date: new Date(2020, 4, 10, 15),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create an appointment before 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 9, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        provider_id: 'provider_user',
        user_id: 'provider_user',
        date: new Date(2020, 9, 11, 7),
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      createAppointment.execute({
        provider_id: 'provider_user',
        user_id: 'provider_user',
        date: new Date(2020, 9, 11, 18),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
