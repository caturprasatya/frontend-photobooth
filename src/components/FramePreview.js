import React from "react";

const FramePreview = (props) => {
    return(
        <div className="row">
        {props.frameUrl.map((frame,index) => {
            return (
                <div key={index} className="col-3">
                    <img src={frame}  className="w-100 img-thumbnail" alt={index} onClick={()=> {props.isSelected(frame)}}></img>
                </div>
                );
            })}
        </div>
    )
}

export default FramePreview;