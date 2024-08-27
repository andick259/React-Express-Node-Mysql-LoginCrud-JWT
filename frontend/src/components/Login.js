import React, {useState} from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const Login = async(e) => {
    e.preventDefault();
    setLoading(true);
    try{
      await axios.post('http://localhost:5000/login', {
        email: email,
        password: password
       });
      navigate("/dashboard");
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
          <p className="subtitle has-text-white">Login</p>
        </div>
      </section>

      <div className="container columns is-centered">
        <div className="column is-4-desktop">
          <form className="box mt-4" onSubmit={Login}>
          {msg && (
              <div className="notification is-danger has-text-white">
                <strong>{msg}</strong>
              </div>
            )}
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
            <button className="button is-success is-fullwidth has-text-white" 
            type="submit" disabled={loading}>
              {loading ? <span className="spinner"></span> : 'Masuk'}
              </button>

              <div class="text-with-lines mt-4 mb-4">
  <p class="centered-text">Atau</p>
</div>

              <Link to={`/register`} className="button is-warning is-fullwidth has-text-white" 
            type="submit">
              Daftar
              </Link>
            </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
