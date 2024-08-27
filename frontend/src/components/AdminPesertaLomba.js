import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {jwtDecode} from "jwt-decode";
import { Link, useNavigate, useParams } from 'react-router-dom';

const AdminPesertaLomba = () => {
    const [username, setUsername] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [peserta, setPeserta] = useState([]);
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        refreshToken();
        getPeserta();
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

    const getPeserta = async() =>{
        const response = await axiosJWT.get(`http://localhost:5000/peserta-lomba-admin/${id}`, {
            headers:{
                Authorization: `Bearer ${token}` 
            }
        });
        setPeserta(response.data);
    }


  return (
    <div className="container mt-5">
           <Link to={`/admin-dashboard`} class="button is-success has-text-white">
    <span class="icon is-small">
      <i class="fas fa-arrow-left"></i>
    </span>
    <span>Kembali</span>
  </Link>
  
  <table className="table is-striped is-fullwidth mt-4">
    <thead>
      <tr>
        <th>No</th>
        <th>Nama Peserta</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
    {peserta.map((pesertas, index) => (
                        <tr key= {pesertas.id}>
                        <td>{index + 1}</td>
                        <td>{pesertas.nama_peserta}</td>
                        <td>{pesertas.email}</td>
                    </tr>
                    ))}
    </tbody>
  </table>
           
        </div>
  )
}

export default AdminPesertaLomba
