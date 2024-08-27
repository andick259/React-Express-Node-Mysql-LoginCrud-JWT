import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [lomba, setLomba] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        refreshToken();
        getLomba();
    }, []);


    const refreshToken = async() => {
        try{
            const response = await axios.get('http://localhost:5000/token-admin');
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setUsername(decoded.username);
            setExpire(decoded.exp);
        }catch (error){
            if (error.response) {
                navigate("/login-admin");
            }
        }
    };

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async(config) => {
        const currentDate = new Date();
        if(expire * 1000 < currentDate.getTime()){
            const response = await axios.get('http://localhost:5000/token-admin');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setUsername(decoded.username);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const getLomba = async() =>{
        const response = await axiosJWT.get('http://localhost:5000/lomba-admin', {
            headers:{
                Authorization: `Bearer ${token}` 
            }
        });
        setLomba(response.data);
    }

    const deleteLomba = async (id) => {
      try{
          await axios.delete(`http://localhost:5000/lomba-admin-delete/${id}`);
          getLomba();
      }catch (error) {
          console.log(error);
      }
  }

  return (
    <div className="container mt-5">
           <Link to={`/admin-add-lomba`} class="button is-success has-text-white">
    <span class="icon is-small">
      <i class="fas fa-plus"></i>
    </span>
    <span>Buat Lomba</span>
  </Link>
  
  <table className="table is-striped is-fullwidth mt-4">
    <thead>
      <tr>
        <th>No</th>
        <th>Judul Lomba</th>
        <th>Deskripsi</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
    {lomba.map((lombas, index) => (
                        <tr key= {lombas.id}>
                        <td>{index + 1}</td>
                        <td>{lombas.nama_lomba}</td>
                        <td>{lombas.deskripsi}</td>
                        <td>
                        <Link to={`/admin-peserta-lomba/${lombas.id}`} className="button is-small is-info has-text-white">Lihat Peserta</Link>
                        <Link to={`/admin-edit-lomba/${lombas.id}`} className="button is-small is-info has-text-white ml-2">Edit</Link>
                        <button onClick={()=> deleteLomba(lombas.id)} className="button is-small is-danger has-text-white ml-2">Delete</button>
                    </td>
                    </tr>
                    ))}
    </tbody>
  </table>
           
        </div>
  )
}

export default AdminDashboard
