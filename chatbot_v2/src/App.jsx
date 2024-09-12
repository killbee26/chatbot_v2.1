import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import  LoginPage  from './components/Login';

import DashboardRoute from './routes/DashboardRoute';
import SignUp from "./components/SignUp";
import Layout from "./components/Layout";
import './globals.css';

const App = () => (
  <Layout>
  <Router>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/dashboard" element={<DashboardRoute />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
      {/* Add other routes as needed */}
    </Routes>
  </Router>
  </Layout>
);

export default App;