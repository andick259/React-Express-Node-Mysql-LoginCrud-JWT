import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginAdmin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    const Login = async(e) => {
      e.preventDefault();
      setLoading(true);
      try{
        await axios.post('http://localhost:5000/login-admin', {
          username: username,
          password: password
         });
        navigate("/admin-dashboard");
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
          <p className="title has-text-white">Admin Sistem Informasi Lomba HUT RI Ke-79</p>
          <p className="subtitle has-text-white">Login</p>
        </div>
      </section>
        <div className="container columns is-centered">
            <div className="column is-4-desktop">
                <form className="box mt-4" onSubmit={Login}>
                    {msg && (
                        <div className="notification is-warning">
                            <strong>{msg}</strong>
                        </div>
                    )}
                    <div className="field">
                        <label className="label">Username</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                            <input
                                className="input"
                                type="password"
                                placeholder="********"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <button
                        className="button is-success is-fullwidth has-text-white"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? <span className="spinner"></span> : 'Masuk'}
                    </button>
                </form>
            </div>
        </div>
        </div>
    );
};

export default LoginAdmin;
