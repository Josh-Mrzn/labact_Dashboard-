import { Navigate, Route, Routes } from 'react-router-dom';
import Layout from './layouts/Layout';
import DashboardPage from './pages/DashboardPages/DashboardPage';
import ReportsPage from './pages/DashboardPages/ReportsPage';
import UsersPage from './pages/DashboardPages/UsersPage';
import NotFoundPage from './pages/NotFoundPage';

const App = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route path="/dashboard" element={<Layout />}>
      <Route index element={<DashboardPage />} />
      <Route path="reports" element={<ReportsPage />} />
      <Route path="users" element={<UsersPage />} />
    </Route>
    <Route path="*" element={<NotFoundPage />} />
  </Routes>
);

export default App;
