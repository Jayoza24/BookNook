import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styles from './WritesUpload.module.css';

function WritesUpload() {
    const navigate = useNavigate();
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [type, setType] = useState('Thoughts');

    const handleUpload = (e) => {
        e.preventDefault();
        const name = window.localStorage.getItem("username");

        axios.post('https://booknook-backend-2s18.onrender.com/uploadWrites', { name, title, content, type })
            .then(() => navigate('/writes'))
            .catch(err => console.log(err));
    }

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleUpload}>
                <h1 className={styles.title}>Upload Your Writes</h1>
                
                <label className={styles.label} htmlFor="title">Title</label>
                <input
                    type="text"
                    name="title"
                    className={styles.input}
                    onChange={(e) => setTitle(e.target.value)}
                />
                
                <label className={styles.label} htmlFor="content">Content</label>
                { 
                    (type === "Thoughts" || type === "Quotes") 
                    ? <input
                        type="text"
                        name="content"
                        maxLength="420"
                        className={styles.input}
                        onChange={(e) => setContent(e.target.value)}
                    />
                    : <textarea
                        name="content"
                        maxLength="2000"
                        className={styles.textarea}
                        onChange={(e) => setContent(e.target.value)}
                    />
                }
                
                <label className={styles.label} htmlFor="type">Type</label>
                <select
                    name="type"
                    className={styles.select}
                    onChange={(e) => setType(e.target.value)}
                >
                    <option>Thoughts</option>
                    <option>Quotes</option>
                    <option>Blog</option>
                </select>
                
                <button type="submit" className={styles.button}>UPLOAD</button>
            </form>
        </div>
    );
}

export default WritesUpload;
