import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { isToday, format, parseISO, isAfter } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Link } from 'react-router-dom';
import { FiPower, FiClock, FiUser } from 'react-icons/fi';
import DayPicker, { DayModifiers } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

import { useAuth } from '../../hooks/AuthContext';

import api from '../../services/api';

import {
  Container,
  Header,
  HeaderContent,
  Profile,
  Content,
  Schedule,
  NextAppointment,
  Calender,
  Section,
  Appointment,
} from './styles';

import logoImg from '../../assets/logo.svg';

interface MonthAvailabilityItem {
  day: number;
  available: boolean;
}

interface Appointment {
  id: string;
  date: string;
  hourFormatted: string;
  user: {
    name: string;
    avatar_url: string;
  };
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();

  // Data que o usuario seleciona o calendario
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Mes que esta selecionado no calendario
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Dados retornado pelo servidor
  const [monthAvailability, setMonthAvailability] = useState<MonthAvailabilityItem[]>([]);

  // Dados retornado pelo servidor
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleDateChange = useCallback((day: Date, modifiers: DayModifiers) => {
    if (modifiers.available && !modifiers.disabled) {
      setSelectedDate(day);
    }
  }, []);

  const handleMonthChange = useCallback((month: Date) => {
    setCurrentMonth(month);
  }, []);

  // Dias disponiveis em um determinado mes
  useEffect(() => {
    api
      .get(`providers/${user.id}/month-availability`, {
        params: {
          year: currentMonth.getFullYear(),
          month: currentMonth.getMonth() + 1,
        },
      })
      .then(response => {
        setMonthAvailability(response.data);
      });
  }, [currentMonth, user.id]);

  // Agendamento do provider
  useEffect(() => {
    api
      .get<Appointment[]>('/appointments/me', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        const appointmentsFormatted = response.data.map(appointment => ({
          ...appointment,
          hourFormatted: format(parseISO(appointment.date), 'HH:mm'),
        }));
        setAppointments(appointmentsFormatted);
      });
  }, [selectedDate]);

  const disableDays = useMemo(() => {
    const dates = monthAvailability
      .filter(monthDay => monthDay.available === false)
      .map(monthDay => {
        const year = currentMonth.getFullYear();
        const month = currentMonth.getMonth();

        return new Date(year, month, monthDay.day);
      });

    return dates;
  }, [currentMonth, monthAvailability]);

  const selectToday = useMemo(() => isToday(selectedDate), [selectedDate]);

  const selectedDateAsText = useMemo(() => {
    return format(selectedDate, "'Dia' dd 'de' MMMM", { locale: ptBR });
  }, [selectedDate]);

  const selectedWeekDay = useMemo(() => {
    return format(selectedDate, 'cccc', { locale: ptBR });
  }, [selectedDate]);

  const morningAppointment = useMemo(() => {
    return appointments.filter(appointment => parseISO(appointment.date).getHours() < 12);
  }, [appointments]);

  const afternoonAppointment = useMemo(() => {
    return appointments.filter(appointment => parseISO(appointment.date).getHours() >= 12);
  }, [appointments]);

  const nextAppointment = useMemo(() => {
    return appointments.find(appointment => isAfter(parseISO(appointment.date), new Date()));
  }, [appointments]);

  return (
    <Container>
      <Header>
        <HeaderContent>
          <img src={logoImg} alt="GoBarber" />

          <Profile>
            <img src={user.avatar_url} alt="Avatar" />

            <div>
              <span>Bem-Vindo</span>
              <Link to="profile">
                <strong>{user.name}</strong>
              </Link>
            </div>
          </Profile>

          <button type="button" onClick={signOut}>
            <FiPower />
          </button>
        </HeaderContent>
      </Header>

      <Content>
        <Schedule>
          <h1>Hórario agendados</h1>
          <p>
            {selectToday && <span>Hoje</span>}
            <span>{selectedDateAsText}</span>
            <span>{selectedWeekDay}</span>
          </p>

          {selectToday && nextAppointment && (
            <NextAppointment>
              <strong>Agendamento a seguir</strong>

              <div>
                <img src={nextAppointment.user.avatar_url} alt="Avatar" />

                <strong>{nextAppointment.user.name}</strong>

                <span>
                  <FiClock /> {nextAppointment.hourFormatted}
                </span>
              </div>
            </NextAppointment>
          )}

          <Section>
            <strong>Manhã</strong>

            {morningAppointment.length === 0 && (
              <p>Nenhum agendamento neste período</p>
            )}

            {morningAppointment.map(appointment => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock /> {appointment.hourFormatted}
                </span>

                <div>
                  {appointment.user.avatar_url ? (
                    <img src={appointment.user.avatar_url} alt="Avatar" />
                  ) : (
                    <FiUser size={24} />
                  )}
                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>

          <Section>
            <strong>Tarde</strong>

            {afternoonAppointment.length === 0 && (
              <p>Nenhum agendamento neste período</p>
            )}

            {afternoonAppointment.map(appointment => (
              <Appointment key={appointment.id}>
                <span>
                  <FiClock /> {appointment.hourFormatted}
                </span>

                <div>
                  {appointment.user.avatar_url ? (
                    <img src={appointment.user.avatar_url} alt="Avatar" />
                  ) : (
                    <FiUser size={24} />
                  )}

                  <strong>{appointment.user.name}</strong>
                </div>
              </Appointment>
            ))}
          </Section>
        </Schedule>

        <Calender>
          <DayPicker
            weekdaysShort={['D', 'S', 'T', 'Q', 'Q', 'S', 'S']}
            fromMonth={new Date()}
            disabledDays={[{ daysOfWeek: [0] }, ...disableDays]}
            modifiers={{
              available: { daysOfWeek: [1, 2, 3, 4, 5, 6] },
            }}
            onMonthChange={handleMonthChange}
            selectedDays={selectedDate}
            onDayClick={handleDateChange}
            months={[
              'Janeiro',
              'Fevereiro',
              'Março',
              'Abril',
              'Maio',
              'Junho',
              'Julho',
              'Agosto',
              'Setembro',
              'Outubro',
              'Novembro',
              'Desembro',
            ]}
          />
        </Calender>
      </Content>
    </Container>
  );
};
export default Dashboard;
