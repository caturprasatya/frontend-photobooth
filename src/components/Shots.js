import React from "react";

const Shots = (props) => {
    return(
        <div className="row">
        {props.imageUrl.map((shots,index) => {
          return (
            <div key={index} className="col-6">
                <img src={shots} className="w-100 img-thumbnail" alt={index}></img>
            </div>
            );
          })}
        </div>
    )
}

export default Shots;