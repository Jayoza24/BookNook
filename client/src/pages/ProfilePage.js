import React,{ useEffect,useState } from 'react';
import styles from './ProfilePage.module.css';
import profileImage from '../assets/blank-profile-picture.png';
import Header from '../components/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ProfilePage = () => {

    const navigate = useNavigate()

    const [userData, setUserData] = useState();

    useEffect(()=>{
        checkLogin();
        getUser();
    },[])

    const checkLogin = () => {
        const token = window.localStorage.getItem("token");
        if(token == null){
            navigate("/login")
        }
    }

    const getUser = async() => {
        await axios.post('http://localhost:3001/userData',
            {token: window.localStorage.getItem("token")})
            .then(data => setUserData(data.data.data))
            .catch(err => console.log(err))
    }

    const signOut = () => {
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("username");
        navigate("/login")
    }

    return (
        <div className={styles.header_wrapper}>
            <Header/>
            <header></header>
            <div className={styles.cols_container}>
                <div className={styles.left_col}>
                    <div className={styles.contents}>
                        <h2>{userData != null ? userData.name : "Loading..."}</h2>
                        <p>{userData != null ? userData.email : "Loading..."}</p>
                        <button onClick={signOut}>Sign Out</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
