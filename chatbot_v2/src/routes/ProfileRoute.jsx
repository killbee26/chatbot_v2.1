import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DashboardRoute from './routes/DashboardRoute';

const App = () => (
  <Router>
    <Routes>
      <Route path="/dashboard" element={<DashboardRoute />} />
      {/* Add other routes as needed */}
    </Routes>
  </Router>
);

export default App;
