import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AdminLayout from '../components/layouts/AdminLayout';
import EmployeeReports from '../components/pages/EmployeeReports';
import AdminTools from '../components/pages/AdminTools';
import GrantsManagement from '../components/pages/GrantsManagement';
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
        path: '/employees',
        element: <EmployeeReports />
      },
      {
        path: '/tools',
        element: <AdminTools />
      },
      {
        path: '/grants',
        element: <GrantsManagement />
      }
    ]
  }
]);