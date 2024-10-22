import React from "react";
import HeaderCss from "./WriterCard.module.css";

function WriterCard(props) {
    return(
        <div className={HeaderCss.w_card}>
            <div className={HeaderCss.w_top}>
                <h5>{props.data.name}</h5>
            </div>
            <div className={HeaderCss.w_content}>
                <p>{props.data.content}</p>
            </div>
        </div>
    );
}

export default WriterCard;