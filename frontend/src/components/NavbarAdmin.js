import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const NavbarAdmin = () => {
  const navigate = useNavigate();

  const Logout = async() => {
    try {
      await axios.delete('http://localhost:5000/logout-admin');
      navigate("/login-admin");
    } catch (error) {
      console.log(error);
    }
  };


    return (
        <nav className="navbar is-danger" role="navigation" aria-label="main navigation">
         <div className='container'>
          <div className="navbar-brand">
            <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
        
          <div id="navbarBasicExample" className="navbar-menu">
            <div className="container navbar-start">
              <a href='/admin-dashboard' className="navbar-item  has-text-white">
                Admin Dashboard
              </a>
            </div>
        
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                  <button className="button is-warning has-text-white" onClick={Logout}>
                    Keluar
                  </button>
                  </div>
              </div>
            </div>
          </div>
          </div>
        </nav>
      );
}
  


export default NavbarAdmin
