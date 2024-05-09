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
        path: '/consultas',
        element: <Appointments />
      },
      {
        path: '/pacientes/novo',
        element: <PatientAPIProvider> <PatientsCreate /> </PatientAPIProvider>
      },
      {
        path: '/pacientes/editar/:cpf',
        element: <PatientAPIProvider> <PatientsUpdate /> </PatientAPIProvider>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <Toaster richColors />
  </React.StrictMode>,
)
