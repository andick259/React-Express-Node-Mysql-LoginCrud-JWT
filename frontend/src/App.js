import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

import AdminDashboard from "./components/AdminDashboard";
import LoginAdmin from "./components/LoginAdmin";
import NavbarAdmin from "./components/NavbarAdmin";
import AdminAddLomba from "./components/AdminAddLomba";
import AdminEditLomba from "./components/AdminEditLomba";
import AdminPesertaLomba from "./components/AdminPesertaLomba";



function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="dashboard" element={<><Navbar/>, <Dashboard/></>}/>

      <Route path="/login-admin" element={<LoginAdmin/>}/>
      <Route path="/admin-dashboard" element={<><NavbarAdmin/>, <AdminDashboard/></>}/>
      <Route path="/admin-add-lomba" element={<><NavbarAdmin/>, <AdminAddLomba/></>}/>
      <Route path="/admin-edit-lomba/:id" element={<><NavbarAdmin/>, <AdminEditLomba/></>}/>
      <Route path="/admin-peserta-lomba/:id" element={<><NavbarAdmin/>, <AdminPesertaLomba/></>}/>
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
