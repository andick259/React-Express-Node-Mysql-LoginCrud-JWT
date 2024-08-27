import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const AdminEditLomba = () => {
    const [nama_lomba, setNamaLomba] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const navigate = useNavigate();
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const {id} = useParams();

    useEffect(()=> {
        getLombaById();
    },[]);

    const EditLomba = async (e) => {
        e.preventDefault();
        try{
            await axios.patch(`http://localhost:5000/edit-lomba/${id}`, {
                nama_lomba,
                deskripsi
            });
            navigate("/admin-dashboard");
        }catch (error){
            if(error.response){
                setMsg(error.response.data.msg);
              }
        }
        finally {
            setLoading(false);
          }
    }

    const getLombaById = async () => {
        const response = await axios.get(`http://localhost:5000/edit-lomba/${id}`);
        setNamaLomba(response.data.nama_lomba);
        setDeskripsi(response.data.deskripsi);
    }

  return (
    <div className="container mt-5">
       <a href="/admin-dashboard" class="button is-success has-text-white">
    <span class="icon is-small">
      <i class="fas fa-arrow-left"></i>
    </span>
    <span>Kembali</span>
  </a>
           <form className="box mt-4" onSubmit={EditLomba}>
            {msg && (
              <div className="notification is-warning">
                <strong>{msg}</strong>
              </div>
            )}
              <div className="field" >
              <label className="label">Judul Lomba</label>
              <div className="control">
                <input className="input" type="text" 
                value={nama_lomba} onChange={(e) => setNamaLomba(e.target.value)} />
              </div>
            </div>
            <div className="field" >
              <label className="label">Deskripsi</label>
              <div className="control">
              <textarea class="textarea" value={deskripsi} onChange={(e) => setDeskripsi(e.target.value)}></textarea>
              </div>
            </div>
            <button className="button is-success is-fullwidth has-text-white" 
            type="submit" disabled={loading}>
              {loading ? <span className="spinner"></span> : 'Simpan Perubahan'}
              </button>
          </form>
      </div>
  )
}

export default AdminEditLomba
