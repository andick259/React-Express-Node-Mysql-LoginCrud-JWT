import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";

const Navbar = () => {
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [expire, setExpire] = useState('');
  const [lomba, setLomba] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    refreshToken();
}, []);


const refreshToken = async() => {
    try{
        const response = await axios.get('http://localhost:5000/token');
        setToken(response.data.accessToken);
        const decoded = jwtDecode(response.data.accessToken);
        setName(decoded.name);
        setExpire(decoded.exp);
    }catch (error){
        if (error.response) {
            navigate("/");
        }
    }
};

  const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async(config) => {
        const currentDate = new Date();
        if(expire * 1000 < currentDate.getTime()){
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setName(decoded.name);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });


  const Logout = async() => {
    try {
      await axios.delete('http://localhost:5000/logout');
      navigate("/");
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
              <a className="navbar-item  has-text-white">
                Beranda
              </a>
            </div>
        
            <div className="navbar-end">
              <div className="navbar-item">
                <div className="buttons">
                <h1 className="has-text-white mr-4">Hallo, {name} </h1>
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
  


export default Navbar
