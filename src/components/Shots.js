import React from "react";

const Shots = (props) => {
    return(
        <div className="row">
        {props.imageBlob.map((shots,index) => {
          return (
            <div key={index} className="col-6">
                <img src={URL.createObjectURL(shots)} className="img-thumbnail" alt={index}></img>
            </div>
            );
          })}
        </div>
    )
}

export default Shots;