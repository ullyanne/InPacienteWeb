import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './components/NotFoundPage.tsx'
import { Patients } from './components/Patients.tsx'
import { Appointments } from './components/Appointments.tsx'
import { PatientsCreate } from './components/PatientsCreate.tsx'
import { Toaster } from 'sonner'
import { PatientAPIProvider } from './api/patients/PatientsApi.tsx'
import { PatientsUpdate } from './components/PatientsUpdate.tsx'
import { AppointmentAPIProvider } from './api/appointments/AppointmentsApi.tsx'
import { AppointmentsUpdate } from './components/AppointmentsUpdate.tsx'
import { DoctorAPIProvider } from './api/doctors/DoctorsApi.tsx'
import { AppointmentsCreate } from './components/AppointmentsCreate.tsx'
import { Doctors } from './components/Doctors.tsx'
import { DoctorsCreate } from './components/DoctorsCreate.tsx'
import { DoctorsUpdate } from './components/DoctorsUpdate.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <PatientAPIProvider> <Patients /> </PatientAPIProvider>
      },
      {
        path: '/pacientes/novo',
        element: <PatientAPIProvider> <PatientsCreate /> </PatientAPIProvider>
      },
      {
        path: '/pacientes/editar/:cpf',
        element: <PatientAPIProvider> <PatientsUpdate /> </PatientAPIProvider>
      },
      {
        path: '/consultas',
        element: <AppointmentAPIProvider> <Appointments /> </AppointmentAPIProvider>
      },
      {
        path: '/consultas/novo',
        element: <DoctorAPIProvider> <AppointmentAPIProvider> <AppointmentsCreate /> </AppointmentAPIProvider> </DoctorAPIProvider>
      },
      {
        path: '/consultas/editar/:id',
        element: <DoctorAPIProvider> <AppointmentAPIProvider> <AppointmentsUpdate /> </AppointmentAPIProvider> </DoctorAPIProvider>
      },
      {
        path: '/medicos',
        element: <DoctorAPIProvider> <Doctors /> </DoctorAPIProvider>
      },
      {
        path: '/medicos/novo',
        element: <DoctorAPIProvider> <DoctorsCreate /> </DoctorAPIProvider>
      },
      {
        path: '/medicos/editar/:crm',
        element: <DoctorAPIProvider> <DoctorsUpdate /> </DoctorAPIProvider>
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster richColors />
  </React.StrictMode>,
)
