import React, { useState } from 'react';
import axios from "axios";
/*import { useHistory } from "react-router-dom";*/
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
 /* const history = useHistory();*/
 const navigate = useNavigate();

  const Register = async(e) => {
    e.preventDefault();
    setLoading(true);
    try{
      await axios.post('http://localhost:5000/peserta', {
        name: name,
        email: email,
        password: password,
        confPassword: confPassword
      });
      /*history.push("/");*/
      navigate("/");
    } catch (error){
      if(error.response){
        setMsg(error.response.data.msg);
      }
    } finally {
      setLoading(false);
    }
  }
    

  return (
    <div>
      <section className="hero is-danger">
        <div className="hero-body">
          <p className="title has-text-white">Peserta Lomba HUT RI Ke-79</p>
          <p className="subtitle has-text-white">Register</p>
        </div>
      </section>

      <div className="container columns is-centered">
        <div className="column is-4-desktop">
          <form className="box mt-4" onSubmit={Register}>
            {msg && (
              <div className="notification is-danger has-text-white">
                <strong>{msg}</strong>
              </div>
            )}
              <div className="field" >
              <label className="label">Nama</label>
              <div className="control">
                <input className="input" type="text" placeholder="Nama" 
                value={name} onChange={(e) => setName(e.target.value)} />
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input className="input" type="email" placeholder="Email"
                 value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input className="input" type="password" placeholder="********" 
                value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
            </div>

            <div className="field">
              <label className="label">Konfirmasi Password</label>
              <div className="control">
                <input className="input" type="password" placeholder="********" 
                value={confPassword} onChange={(e) => setConfPassword(e.target.value)}/>
              </div>
            </div>

            <button className="button is-success is-fullwidth has-text-white" 
            type="submit" disabled={loading}>
              {loading ? <span className="spinner"></span> : 'Daftar'}
              </button>

              <div class="text-with-lines mt-4 mb-4">
  <p class="centered-text">Atau</p>
</div>

              <Link to={`/`} className="button is-warning is-fullwidth has-text-white" 
            type="submit">
              Masuk
              </Link>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
