import React,{ useState,useEffect } from 'react';
import bookCass from './Books.module.css';
import axios from "axios";
import BookCard from '../components/BookCard';
import videoBg from '../assets/bookBgVideo.mp4';
import Header from '../components/Header';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

function Books() {

    const navigate = useNavigate()

    const [books, setBooks] = useState(null)

    useEffect(() => {
        checkLogin();
        getBooks()
    },[]);

    const getBooks = async () =>{
        const result = await axios.get("https://booknook-backend-2s18.onrender.com/allBooks");
        setBooks(result.data.data);
    }
    const checkLogin = () => {
        const token = window.localStorage.getItem("token");
        if(token == null){
            navigate("/login")
        }
    }

    useGSAP(() => {
        gsap.from('#poster',{
            opacity: 0,
            duration: 1,
            delay: .5
        })
        gsap.to('#searchBar',{
            bottom: "85%",
            position: "fixed",
            width: "80%",
            background: "#F2EFE9",
            scrollTrigger:{
                start: "0%",
                end:"80%",
                scrub: 1
            }
        })
    })

    return(
        <div className={bookCass.bookMain}>
            <Header/>
            <div className={bookCass.topPoster} id='poster'>
                <video height="100%" width="100%" autoPlay muted loop disablePictureInPicture controlsList="nodownload">
                        <source src={videoBg} type="video/mp4"/>
                        Your browser does not support the video tag.
                </video>
                <div className={bookCass.searchBar} id='searchBar'>
                    <input type='text' placeholder='Search here...'></input>
                    <i className="fa-solid fa-magnifying-glass"></i>
                </div>
            </div>
            <div className={bookCass.bookCards}>
                <h3 id='allBookTitle'>All Books</h3>
                {books == null 
                    ? <h2>No Data</h2> 
                    : books.map((data) => {
                        return(
                            <BookCard key={data._id} cardData={data}/>
                        )
                    })}
            </div>
        </div>
    )
}

export default Books;
