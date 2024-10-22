import React, { useEffect, useState } from "react";
import fullBookCss from './FullBookView.module.css';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from 'gsap';

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollTrigger);

function FullBookView(props) {
    const { id } = useParams();
    const [Book, setBook] = useState(null);

    useEffect(() => {
        getBook();
    }, [id]);

    const getBook = async () => {
        try {
            const result = await axios.get(`https://booknook-backend-2s18.onrender.com/getBook/${id}`);
            setBook(result.data.data);
        } catch (error) {
            console.error("Error fetching book data:", error);
        }
    };

    useGSAP(() => {
        gsap.from("#pdf",{
            marginLeft: "-200px",
            marginTop: "200px",
            autoAlpha: 0,
            duration: 1,
            ease: "power3",
            delay: .5
        })
        gsap.from("#right",{
            autoAlpha: 0,
            marginTop: "200px",
            duration: 1,
            ease: "expo.inOut",
            delay: .5
        })
        gsap.from("#topContent",{
            width: "0%",
            boxShadow: "0px 0px 0px black",
            backgroundColor: "transparent",
            duration: 1,
            delay: 1
        })
        gsap.from("#bookName",{
            scale: 0,
            duration: 1,
            delay: 2
        })
        gsap.from("#bottomContent",{
            width: "0%",
            boxShadow: "0px 0px 0px black",
            backgroundColor: "transparent",
            duration: 1,
            delay: 2
        })
        gsap.from("#authPub",{
            marginTop: "200px",
            autoAlpha: 0,
            duration: 1,
            delay: 2.5
        })
        gsap.from("#desc",{
            marginTop: "200px",
            autoAlpha: 0,
            duration: 1,
            delay: 2.5
        })
    }) 

    return (
        <div className={fullBookCss.mainFull}>
            <div className={fullBookCss.row}>
                <div className={fullBookCss.left} id="pdf">
                    {Book ? (
                        <object type='application/pdf' 
                            data={`https://booknook-backend-2s18.onrender.com/public/books/${Book.book}#toolbar=0&navpanes=0&scrollbar=0`} >
                            No Book
                        </object>
                    ) : (
                        <p>Loading...</p>
                    )}
                </div>
                <div className={fullBookCss.right} id="right">
                    <div className={fullBookCss.content} >
                        <div className={fullBookCss.topContent} id="topContent">
                            <h2 id="bookName">
                                {Book ? Book.name : "Book Name"}
                            </h2>
                        </div>
                        <div className={fullBookCss.bottomContent} id="bottomContent">
                            <div className={fullBookCss.authPub} id="authPub">
                                <p>{Book ? `Author : ${Book.author}` : "Author Name"}</p>
                                <p>{Book ? `Publish by : ${Book.publisher}` : "Publisher Name"}</p>
                            </div>
                            <p id="desc">{Book ? Book.description : "Description About the book"}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FullBookView;
