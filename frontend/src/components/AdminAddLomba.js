import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminAddLomba = () => {
    const [nama_lomba, setNamaLomba] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const navigate = useNavigate();
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const addLomba = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            await axios.post('http://localhost:5000/add-lomba', {
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

  return (
    <div className="container mt-5">
       <a href="/admin-dashboard" class="button is-success has-text-white">
    <span class="icon is-small">
      <i class="fas fa-arrow-left"></i>
    </span>
    <span>Kembali</span>
  </a>
           <form className="box mt-4" onSubmit={addLomba}>
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
              {loading ? <span className="spinner"></span> : 'Simpan'}
              </button>
          </form>
      </div>
  )
}

export default AdminAddLomba
