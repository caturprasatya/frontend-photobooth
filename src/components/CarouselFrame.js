import React,{useState} from "react";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


const CarouselFrame = (props) => {
    const [selectedFrame,setSelectedFrame] = useState(props.whichSelected);

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
            items: 3,
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
            items: 3,
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
            <div key={index
            } style={{margin:'5% 5px 5% 5px'}}>
              <img src={frame.URI} style={{border:selectedFrame.frameName===frame.frameName ? '5px solid #00FF00' : '0px solid #00FF00', height:'45vh'}} className="img-thumbnail" alt={frame.frameName} onClick={(e)=>{
                props.pickFrame(frame);
                setSelectedFrame(frame);
              }}></img>
            </div>
            );
        })}
      </Carousel>
    )
}

export default CarouselFrame;