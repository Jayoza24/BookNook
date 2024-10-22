import React, { useEffect, useState } from 'react';
import writesCss from './Writes.module.css';
import Header from '../components/Header';
import writesBg from '../assets/writesBg.jpg';
import WriterCard from '../components/WriterCard';
import BlogCard from '../components/BlogCard';
import axios from 'axios';
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

function Writes() {
    const [thoughts, setThoughts] = useState();
    const [quotes, setQuotes] = useState();
    const [blogs, setBlogs] = useState();
    const [filter, setFilter] = useState("all");

    const navigate = useNavigate();

    useEffect(() => {
        checkLogin();
        getThoughts();
        getQuotes();
        getBlogs();
    }, []);

    const checkLogin = () => {
        const token = window.localStorage.getItem("token");
        if(token == null){
            navigate("/login")
        }
    }
    
    const getThoughts = async () => {
        await axios.get('http://localhost:3001/getWrites/Thoughts')
            .then(result => setThoughts(result.data.data))
            .catch(err => console.log(err));
    };
    const getQuotes = async () => {
        await axios.get('http://localhost:3001/getWrites/Quotes')
            .then(result => setQuotes(result.data.data))
            .catch(err => console.log(err));
    };
    const getBlogs = async () => {
        await axios.get('http://localhost:3001/getWrites/Blog')
            .then(result => setBlogs(result.data.data))
            .catch(err => console.log(err));
    };

    const btnUpload = () => {
        navigate('/writesUpload');
    };

    useGSAP(() => {
        gsap.from('#btnWrite', {
            width: "50%",
            scrollTrigger: {
                start: "0%",
                end: "80%",
                scrub: 1
            }
        });
        gsap.to('#poster', {
            autoAlpha: 0,
            scrollTrigger: {
                start: "0%",
                end: "110%",
                scrub: 1
            }
        });
        gsap.from('#filter', {
            width: "40%",
            scrollTrigger: {
                start: "5%",
                end: "40%",
                scrub: 1
            }
        });
        gsap.from('#writesSection',{
            marginTop: "200px",
            scrollTrigger: {
                start: '30%',
                end: '50%',
                scrub: 1
            }
        })
    });

    return (
        <div className={writesCss.main}>
            <Header />
            <div className={writesCss.topPoster} id='poster'>
                <img src={writesBg} alt='bg' />
                <div className={writesCss.btnWrite} id='btnWrite' onClick={btnUpload}>
                    <button>Write Something</button>
                </div>
            </div>
            <div className={writesCss.filter} id='filter'>
                <h4>Filters:</h4>
                <ul id={writesCss.filterList}>
                    <li onClick={() => setFilter("all")}>All</li>
                    <li onClick={() => setFilter("thoughts")}>Thoughts</li>
                    <li onClick={() => setFilter("quotes")}>Quotes</li>
                    <li onClick={() => setFilter("blogs")}>Blogs</li>
                </ul>
            </div>
            <div id='writesSection'>
                {filter === "all" || filter === "thoughts" ? (
                    <div className={writesCss.thoughts} id='thoughts'>
                        <span><h2>Thoughts</h2></span>
                        <div className={writesCss.thoughtsCards}>
                            {
                                thoughts == null
                                    ? <div className="card"><h2>Loading..</h2></div>
                                    : thoughts.map((data) => (
                                        <WriterCard key={data._id} data={data} />
                                    ))
                            }
                        </div>
                    </div>
                ) : null}

                {filter === "all" || filter === "quotes" ? (
                    <div className={writesCss.quotes} id='quotes'>
                        <span><h2>Quotes</h2></span>
                        <div className={writesCss.quotesCards}>
                            {
                                quotes == null
                                    ? <div className="card"><h2>Loading..</h2></div>
                                    : quotes.map((data) => (
                                        <WriterCard key={data._id} data={data} />
                                    ))
                            }
                        </div>
                    </div>
                ) : null}

                {filter === "all" || filter === "blogs" ? (
                    <div className={writesCss.blogs} id='blogs'>
                        <span><h2>Blogs</h2></span>
                        <div className={writesCss.quotesCards}>
                            {
                                blogs == null
                                    ? <h2>Loading..</h2>
                                    : blogs.map((data) => (
                                        <BlogCard key={data._id} data={data} />
                                    ))
                            }
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export default Writes;
