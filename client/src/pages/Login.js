import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = () => {
    const [activeContainer, setActiveContainer] = useState(false);
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleRegisterClick = () => {
        setActiveContainer(true);
    };

    const handleLoginClick = () => {
        setActiveContainer(false);
    };

    const submitRegister = (e) => {
        e.preventDefault();
        axios.post('https://booknook-backend-2s18.onrender.com/register',{name,email,password})
        .then(navigate('/login'))
        .catch(err => console.log(err))
        handleLoginClick()
    }

    const submitLogin = (e) => {
        e.preventDefault();
        axios.post('https://booknook-backend-2s18.onrender.com/login',{email,password})
        .then(result => {
            console.log(result.data);
            if(result.status === 201){
                window.localStorage.setItem("token",result.data.data);
                window.localStorage.setItem("username",result.data.username);
                navigate("/")
            }
        })
        .catch(err => console.log(err))
    }


    return (
        <div className='mainDiv'>
            <div className={activeContainer ? 'container active' : 'container'} id="container">
                <div className="form-container sign-up">
                    <form onSubmit={submitRegister}>
                        <h1 style={{ color: '#743138' }}>Create Account</h1>
                        <div className="social-icons">
                            <a href="#Google" className="icon"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#Facebook" className="icon"><i className="fab fa-facebook-f"></i></a>
                            <a href="#Github" className="icon"><i className="fab fa-github"></i></a>
                            <a href="#Linkedin" className="icon"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Name" onChange={(e)=>setName(e.target.value)}/>
                        <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className="form-container sign-in">
                    <form onSubmit={submitLogin}>
                        <h1 style={{ color: '#743138' }}>Sign In</h1>
                        <div className="social-icons">
                            <a href="#Google" className="icon"><i className="fab fa-google-plus-g"></i></a>
                            <a href="#Facebook" className="icon"><i className="fab fa-facebook-f"></i></a>
                            <a href="#Github" className="icon"><i className="fab fa-github"></i></a>
                            <a href="#Linkedin" className="icon"><i className="fab fa-linkedin-in"></i></a>
                        </div>
                        <span>or use your email password</span>
                        <input type="email" placeholder="Email" onChange={(e)=>setEmail(e.target.value)}/>
                        <input type="password" placeholder="Password" onChange={(e)=>setPassword(e.target.value)}/>
                        <a href="#ForgotPassword">Forget Your Password?</a>
                        <button>Sign In</button>
                    </form>
                </div>
                <div className="toggle-container">
                    <div className="toggle">
                        <div className="toggle-panel toggle-left">
                            <h1>Back to BookNook!</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <button className="hidden" onClick={handleLoginClick} id="login">Sign In</button>
                        </div>
                        <div className="toggle-panel toggle-right">
                            <h1>Hello Pageweavers!!!</h1>
                            <p>Register with your personal details to use all of site features</p>
                            <button className="hidden" onClick={handleRegisterClick} id="register">Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
