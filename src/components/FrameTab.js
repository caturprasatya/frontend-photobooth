import React from "react";
import FramePreview from "./FramePreview";


const FrameTab = (props) => {
    return(
    <div>
        <ul className="nav nav-tabs nav-justified mb-3" id="tab" role="tablist">
            <li className="nav-item" role="presentation">
                <a
                    className="nav-link active"
                    id="tab-1"
                    data-bs-toggle="tab"
                    href="#tabs-1"
                    role="tab"
                    aria-controls="tabs-1"
                    aria-selected="true"
                    >
                6 Snaps
                </a>
            </li>
            <li className="nav-item" role="presentation">
                <a
                    className="nav-link"
                    id="tab-2"
                    data-bs-toggle="tab"
                    href="#tabs-2"
                    role="tab"
                    aria-controls="tabs-2"
                    aria-selected="false"
                    >
                8 Snaps
                </a>
            </li>
        </ul>

        <div className="tab-content" id="content">
            <div
            className="tab-pane fade show active"
            id="tabs-1"
            role="tabpanel"
            aria-labelledby="tab-1"
            >
                <div style={{height:'300px', overflowY: 'scroll', overflowX: 'hidden'}}>
                    <FramePreview
                        frameUrl={props.frame6}
                        isSelected={props.frameSelected}
                    />
                </div>
            </div>
            <div
            className="tab-pane fade"
            id="tabs-2"
            role="tabpanel"
            aria-labelledby="tab-2"
            >
                <div style={{height:'300px', overflowY: 'scroll', overflowX: 'hidden'}}>
                    <FramePreview
                        frameUrl={props.frame8}
                        isSelected={props.frameSelected}
                    />
                </div>
            </div>
        </div>
    </div>
    )
}

export default FrameTab;