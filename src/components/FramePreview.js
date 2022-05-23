import React from "react";

const FramePreview = (props) => {
    return(
        <div className="row">
        {props.frameUrl.map((frame,index) => {
            return (
                <div key={index} className="col-3 text-center">
                    <img src={frame}  className="w-100 mb-2 img-thumbnail" alt={index} onClick={()=> {props.isSelected(frame,props.numberSnap)}}></img>
                    <p class="text-capitalize"><i><b>{props.detail[index]}</b></i></p>
                </div>
                );
            })}
        </div>
    )
}

export default FramePreview;