import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFoundPage from './components/NotFoundPage.tsx'
import { Appointments } from './components/appointments/Appointments.tsx'
import { PatientsCreate } from './components/patients/PatientsCreate.tsx'
import { Toaster } from 'sonner'
import { PatientAPIProvider } from './api/patients/PatientsApi.tsx'
import { PatientsUpdate } from './components/patients/PatientsUpdate.tsx'
import { AppointmentAPIProvider } from './api/appointments/AppointmentsApi.tsx'
import { AppointmentsUpdate } from './components/appointments/AppointmentsUpdate.tsx'
import { DoctorAPIProvider } from './api/doctors/DoctorsApi.tsx'
import { AppointmentsCreate } from './components/appointments/AppointmentsCreate.tsx'
import { Doctors } from './components/doctors/Doctors.tsx'
import { DoctorsCreate } from './components/doctors/DoctorsCreate.tsx'
import { DoctorsUpdate } from './components/doctors/DoctorsUpdate.tsx'
import { Patients } from './components/patients/Patients.tsx'
import { PatientView } from './components/patients/PatientView.tsx'

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
        path: '/pacientes/visualizar/:cpf',
        element: <PatientAPIProvider> <PatientView /> </PatientAPIProvider>
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
