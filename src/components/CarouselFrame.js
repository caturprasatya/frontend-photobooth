import React,{useState, useRef} from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';


const CarouselFrame = (props) => {
    const [selectedFrame,setSelectedFrame] = useState(props.whichSelected);
    const frameURILength = useRef(props.frameURI.length)

    const maxVisibleFrame = (frameLength) => {
      switch(frameLength) {
        case 1 :
          return 1
        case 2 :
          return 2
        default:
          return 3
      }
    }

    return(
      <Carousel
        additionalTransfrom={0}
        arrows
        shouldResetAutoplay={false}
        autoPlaySpeed={3000}
        centerMode={true}
        className=""
        containerClass="container-with-dots"
        dotListClass=""
        draggable
        focusOnSelect={false}
        itemClass=""
        keyBoardControl
        minimumTouchDrag={80}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024
            },
            items: maxVisibleFrame(frameURILength.current),
            partialVisibilityGutter: 40
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0
            },
            items: 1,
            partialVisibilityGutter: 30
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464
            },
            items: 2,
            partialVisibilityGutter: 30
          }
        }}
        showDots={true}
        sliderClass=""
        slidesToSlide={1}
        swipeable
        infinite={false}
        >
        {props.frameURI.map((frame,index) => {
          return (
            <div key={index} style={{margin:'0 10px 0 10px'}}>
              <LazyLoadImage
                src={frame.url} style={{height:'65vh'}} className={`img-thumbnail ${selectedFrame.frame_id===frame.frame_id ? "greenBorder changeContrast" : ""}`} alt={frame.frame_id} onClick={(e)=>{
                  props.pickFrame(frame);
                  setSelectedFrame(frame);}}
                  effect="opacity" 
                  />
                  <h1 className={"centered"} style={{display:selectedFrame.frame_id===frame.frame_id ? "" : "none"}}>Selected</h1>
            </div>
            );
        })}
      </Carousel>
    )
}

export default CarouselFrame;