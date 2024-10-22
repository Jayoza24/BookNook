import React,{ useState,useEffect } from "react";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from 'gsap';
import Header from "../components/Header";
import WriterCard from "../components/WriterCard";
import HomeCss from "./Home.module.css";
import bookRoom from "../assets/bookRoom.jpg";
import videoBg from "../assets/writingBg.mp4";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

function Home() {
    const [thoughts, setThoughts] = useState();

    const navigate = useNavigate()

    useEffect(()=>{
        checkLogin();
        getThoughts();
    },[])

    useGSAP(()=>{
        gsap.to(['#left','#right'],{
            opacity: "100%",
            duration: 2,
        })
        gsap.from('#title',{
            x: -500,
            opacity: 0,
            duration: 1,
            ease: "power4.inOut"
        })
        gsap.from('#content',{
            y: 100,
            opacity: 0,
            duration: 2,
            ease: "expo.inOut"
        })
        gsap.from('#btnExplore',{
            y: 50,
            opacity: 0,
            duration: 2,
            delay: .5,
            ease: "expo.inOut"
        })
        gsap.from('.card',{
            marginTop: "50%",
            opacity: 0,
            scrollTrigger:{
                start: "2%",
                end:"30%",
                scrub: 1
            }
        })
        gsap.from('#bgVideo',{
            opacity: 0,
            scrollTrigger:{
                start: "25%",
                end:"32%",
                scrub: 1
            }
        })
    })

    const checkLogin = () => {
        const token = window.localStorage.getItem("token");
        if(token == null){
            navigate("/login")
        }
    }

    const getThoughts = async() => {
        await axios.get('https://booknook-backend-2s18.onrender.com/getWrites/Thoughts')
        .then(result => setThoughts(result.data.data))
        .catch(err => console.log(err))
    }

    return(
        <div className="home">
            <Header/>
            <div className={HomeCss.main}>
                <div className={HomeCss.left} id="left">
                    <h2 id="title">Welcome, Folks</h2>
                    <p id="content">BookNook a perfect place to find books 
                        for sharp your thinking and make yourself 
                        lost in another dimension,also get something good thinking...💖</p>
                        <button id="btnExplore">EXPLORE</button>
                </div>
                <div className={HomeCss.right} id="right">
                    <iframe title="book" src='https://my.spline.design/draganddropbookpencilschoolcopy-93b76770fe68c5c82ceeb4e765ab687a/' frameBorder='0' width='100%' height='100%'></iframe>
                </div>
            </div>
            <div className={HomeCss.top_writes} id="#writerCard">
                <video height="100%" width="100%" id="bgVideo" autoPlay muted loop>
                    <source src={videoBg} type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
                <div className={HomeCss.writingContent} >
                    <div className={HomeCss.cards}>
                        {
                            thoughts == null 
                            ?
                                <div className="card">
                                    <h2>Loading..</h2>
                                </div>
                            :
                                thoughts.slice(-3).map((data, index) => {
                                    return(
                                        <div className="card" key={index}>
                                            <WriterCard data={data}/>
                                        </div>
                                    );
                                })
                        }
                    </div>
                </div>
            </div>
            <div className={HomeCss.bookContainer}>
                <div className={HomeCss.leftBook}>
                    <img src={bookRoom} alt="bookShelf"/>
                </div>
                <div className={HomeCss.rightBook}>
                    <h3>Importance of Books</h3>
                    <p>
                    Books are invaluable treasures that open doors to knowledge,
                     imagination, and personal growth. They serve as vessels of wisdom,
                      carrying the insights and experiences of countless generations.
                       Through books, we can explore diverse cultures, historical events,
                        and complex ideas, all from the comfort of our own homes. 
                        They encourage critical thinking, empathy, and creativity, 
                        allowing us to see the world from different perspectives. Additionally, 
                        reading books enhances language skills and cognitive functions, 
                        making us more articulate and better equipped to navigate life's challenges. 
                        In a rapidly changing world, books remain a constant source of inspiration 
                        and learning, enriching our minds and souls.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Home;
