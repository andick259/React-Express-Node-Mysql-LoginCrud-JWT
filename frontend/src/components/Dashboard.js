import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [nama, setName] = useState('');
    const [email, setEmail] = useState('');
    const [idPeserta, setIdPeserta] = useState('');
    const [namaLomba, setNamaLomba] = useState('');
    const [idLomba, setIdLomba] = useState('');
    const [token, setToken] = useState('');
    const [expire, setExpire] = useState('');
    const [lomba, setLomba] = useState([]);
    const [lombaTerdaftar, setLombaTerdaftar] = useState([]);
    const navigate = useNavigate();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        refreshToken();
        getLomba();
        getDaftarLomba();
    }, []);

    useEffect(() => {
        if (modalContent) {
            setNamaLomba(modalContent.nama_lomba || '');
            setIdLomba(modalContent.id || '');
        }
    }, [modalContent]);

    const refreshToken = async () => {
        try {
            const response = await axios.get('http://localhost:5000/token');
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setName(decoded.name);
            setIdPeserta(decoded.id);
            setEmail(decoded.email);
            setExpire(decoded.exp);
        } catch (error) {
            if (error.response) {
                navigate("/");
            }
        }
    };

    const axiosJWT = axios.create();

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date();
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token');
            config.headers.Authorization = `Bearer ${response.data.accessToken}`;
            setToken(response.data.accessToken);
            const decoded = jwtDecode(response.data.accessToken);
            setName(decoded.name);
            setIdPeserta(decoded.id);
            setEmail(decoded.email);
            setExpire(decoded.exp);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    const getLomba = async () => {
        const response = await axiosJWT.get('http://localhost:5000/lomba-admin', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setLomba(response.data);
    }

    const DaftarLomba = async (e) => {
        /*e.preventDefault();*/
        setLoading(true);
        try {
            await axios.post('http://localhost:5000/peserta-lomba', {
                id_lomba: idLomba,
                id_peserta: idPeserta,
                nama_peserta: nama,
                nama_lomba: namaLomba,
                email:email
            });
            closeModal();
            navigate("/dashboard");
        } catch (error) {
        } finally {
            setLoading(false);
        }
    }

    const getDaftarLomba = async () => {
        const response = await axiosJWT.get('http://localhost:5000/daftar-lomba', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setLombaTerdaftar(response.data);
    }

    const openModal = (lomba) => {
        setModalContent(lomba);
        setIsModalOpen(true);
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setModalContent('');
    }

    const isRegistered = (lombaId) => {
        return lombaTerdaftar.some(registration => registration.id_lomba === lombaId && registration.id_peserta === idPeserta);
    }

    return (
        <div className="container mt-5">
            <h1 className="title">Selamat Datang</h1>
            <h2 className="subtitle">Silakan Pilih Lomba Yang Ingin Diikuti.</h2>

            <table className="table is-striped is-fullwidth mt-6">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Lomba</th>
                        <th>Deskripsi</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {lomba.map((lombas, index) => (
                        <tr key={lombas.id}>
                            <td>{index + 1}</td>
                            <td>{lombas.nama_lomba}</td>
                            <td>{lombas.deskripsi}</td>
                            <td>
                                {isRegistered(lombas.id) ? (
                                    <span className="tag is-success has-text-white"> <i class="fas fa-check mr-2"></i> Sudah Mendaftar</span>
                                ) : (
                                    <button onClick={() => openModal(lombas)} className="button is-small is-info has-text-white ml-2">
                                        Daftar
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isModalOpen && (
                <form className="box mt-4" onSubmit={DaftarLomba}>
                    <div className="modal is-active">
                        <div className="modal-background"></div>
                        <div className="modal-card">
                            <header className="modal-card-head">
                                <p className="modal-card-title">{modalContent.nama_lomba}</p>
                                <button className="delete" aria-label="close" onClick={closeModal}></button>
                            </header>
                            <section className="modal-card-body">
                                <p>{modalContent.deskripsi}</p>
                            </section>
                            <footer className="modal-card-foot">
                                <div className="buttons">
                                    <input type="hidden" value={nama} onChange={(e) => setName(e.target.value)} />
                                    <input type="hidden" value={idPeserta} onChange={(e) => setIdPeserta(e.target.value)} />
                                    <input type="hidden" value={namaLomba} onChange={(e) => setNamaLomba(e.target.value)} />
                                    <input type="hidden" value={idLomba} onChange={(e) => setIdLomba(e.target.value)} />
                                    <input type="hidden" value={email} onChange={(e) => setEmail(e.target.value)} />
                                    <button className="button is-success has-text-white" type="submit" disabled={loading}>
                                        {loading ? <span className="spinner"></span> : 'Daftar'}
                                    </button>
                                    <button className="button" onClick={closeModal}>Cancel</button>
                                </div>
                            </footer>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}

export default Dashboard;
