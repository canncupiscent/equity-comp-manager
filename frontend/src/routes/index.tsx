import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AdminLayout from '../components/layouts/AdminLayout';
import EmployeeReports from '../components/pages/EmployeeReports';
import AdminTools from '../components/pages/AdminTools';
import GrantsManagement from '../components/pages/GrantsManagement';
import GrantDetails from '../components/pages/grants/GrantDetails';
import DashboardStats from '../components/analytics/DashboardStats';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AdminLayout />,
    children: [
      {
        path: '/',
        element: <DashboardStats />
      },
      {
        path: 'employees',
        children: [
          {
            path: '',
            element: <EmployeeReports />
          },
          {
            path: ':employeeId',
            element: <EmployeeReports /> // We'll create a detailed employee view later
          }
        ]
      },
      {
        path: 'tools',
        children: [
          {
            path: '',
            element: <AdminTools />
          },
          {
            path: 'calculator',
            element: <AdminTools /> // We'll create a calculator view later
          },
          {
            path: 'documents',
            element: <AdminTools /> // We'll create a document generator view later
          }
        ]
      },
      {
        path: 'grants',
        children: [
          {
            path: '',
            element: <GrantsManagement />
          },
          {
            path: ':grantId',
            element: <GrantDetails />
          }
        ]
      }
    ]
  }
]);