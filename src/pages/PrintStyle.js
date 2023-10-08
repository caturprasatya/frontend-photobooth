import React, { useRef, useState} from "react";
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Image } from 'react-bootstrap';

import Background from "../assets/images/bg-home.png";
import Prints2Logo from "../assets/images/2 prints.png";
import EventDropsLogo from "../assets/images/event drops.png";
import NoCutLogo from "../assets/images/no cut.png"
import Prints2LogoSelected from "../assets/images/2 prints_selected.png"
import EventDropsLogoSelected from "../assets/images/event drops_selected.png"
import NoCutLogoSelected from "../assets/images/no cut_selected.png" 


const PrintStyle = () => {

    const { state } = useLocation(); 

    const template = useRef()

    if(state){
        template.current = {prints2 : {logo : Prints2Logo,frameList : []}, 
            eventDrops : {logo : EventDropsLogo, frameList : []}, 
            noCut : {logo : NoCutLogo, frameList : []}
        }
        // eslint-disable-next-line
        for (const [key, value] of Object.entries(state.frame_list)) {
            value.forEach(element => {
                if(element.is_seasonal){
                    template.current.eventDrops.frameList.push(element)
                } else if(element.is_no_cut) {
                    template.current.noCut.frameList.push(element)
                } else{
                    template.current.prints2.frameList.push(element)
                }
                });
            }
    }

    const [printStyleSelected,setPrintStyleSelected] = useState(template.current.prints2);

    const [whichSelected, setWhichSelected] = useState(
        {
            isPrints2 : true,
            isNoCut : false,
            isEventDrops : false
        }
    )

    return (
    <div style={{ 
        backgroundImage: `url(${Background}`,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        display: 'block',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
    }}
    >
        <div className="container text-center" style={{maxHeight:"100vh", overflowY:"hidden"}}>
            <div className="row py-4">
                <div className="col">
                    <h1 className="headerText"><b>Choose Template</b></h1>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Image src={whichSelected.isPrints2? Prints2LogoSelected:Prints2Logo}
                        style={{height:'55vh'}} alt={"prints 2"} onClick={(e)=>{
                            setWhichSelected({
                                isPrints2 : true,
                                isNoCut : false,
                                isEventDrops : false
                            });
                            setPrintStyleSelected(template.current.prints2)
                    }}/>
                    <div>
                        <h2 className="headerText">2 Prints</h2>
                    </div>
                </div>
                <div className="col">
                    <Image src={whichSelected.isNoCut? NoCutLogoSelected:NoCutLogo}
                        style={{height:'55vh'}} alt={"no cut"} onClick={(e)=>{
                            setWhichSelected({
                                isPrints2 : false,
                                isNoCut : true,
                                isEventDrops : false
                            });
                            setPrintStyleSelected(template.current.noCut)
                    }}/>
                    <div>
                        <h2 className="headerText">No Cut</h2>
                    </div>
                </div>
                <div className="col">
                    <Image src={whichSelected.isEventDrops? EventDropsLogoSelected:EventDropsLogo}
                        style={{height:'55vh'}} alt={"no cut"} onClick={(e)=>{
                            setWhichSelected({
                                isPrints2 : false,
                                isNoCut : false,
                                isEventDrops : true
                            });
                            setPrintStyleSelected(template.current.eventDrops);
                    }}/>
                    <div>
                        <h2 className="headerText">Event Drops</h2>
                    </div>
                </div>
            </div>
            <div className="row py-4">
                <div className="col">
                    <Link
                        to="/frame"
                        state={{
                            txID : state.txID,
                            printStyle : printStyleSelected,
                        }}
                    >
                        <button type="button" style={{width:'170px', height: "60px", color:'white'}} className="btn btn-danger btn-lg">
                            <h2><b>Select</b></h2>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
        
    </div>
    );
}

export default PrintStyle;