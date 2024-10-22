import React,{useRef,useEffect} from "react";
import bookCardCss from "./BookCard.module.css";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from 'gsap';
import { useNavigate } from 'react-router-dom';


gsap.registerPlugin(ScrollTrigger);

function BookCard(props) {

    const navigate = useNavigate()
    const ref = useRef([]);
    ref.current = [];
 
    useEffect(() => {
        ref.current.forEach((el) => {
            gsap.fromTo(el, { opacity: "0%" }, {
                opacity: "100%", left: 0,
                duration: 0.5, scrollTrigger: {
                    trigger: el,
                    start: "top bottom-=100",
                    toggleActions: "play none none reverse"
                }
            })
        })
    }, [])
 
    const addtoRefs = (el) => {
        if (el && !ref.current.includes(el)) {
            ref.current.push(el);
        }
    }

    return(
        <div className={bookCardCss.bookCard} ref={addtoRefs} 
            onClick={() => navigate(`/fullBookView/${props.cardData._id}`)}
            >
            <div className={bookCardCss.bookCardContent}>
                <h3>{props.cardData.name}</h3>
                <div className={bookCardCss.authDiv}>
                    <p>Author : {props.cardData.author}</p>
                    <p>Publisher : {props.cardData.publisher}</p>
                </div>
            </div>
        </div>
    )
}

export default BookCard;