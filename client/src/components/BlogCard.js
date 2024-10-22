import React from "react";
import blogCss from "./BlogCard.module.css";

function BlogCard(props) {
    return(
        <div className={blogCss.main}>
            <h5>{props.data.name}</h5>
            <div className={blogCss.contents}>
                <p>{props.data.title}</p>
                <p>{props.data.content}</p>
            </div>
        </div>
    )
}

export default BlogCard;