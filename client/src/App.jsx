import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateClass from './pages/CreateClass';
import MyBookings from './pages/MyBookings';
import Membership from './pages/Membership';
import Profile from './pages/Profile';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard'; 
import AdminMembers from './pages/AdminMembers'; 
import Tutorial from './pages/Tutorial';
import Classes from './pages/Classes';
import AdminScan from './pages/AdminScan';

function App() {
  return (
    <Router>
      <Routes>
        {/*Member*/}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/membership" element={<Membership />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/tutorial" element={<Tutorial />} />
        <Route path="/classes" element={<Classes />}/>

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/create-class" element={<CreateClass />} />
        <Route path="/admin/members" element={<AdminMembers />} />
        <Route path="/admin-scan" element={<AdminScan />} />
        {/* ------------------------------------------ */}

      </Routes>
    </Router>
  );
}

export default App;