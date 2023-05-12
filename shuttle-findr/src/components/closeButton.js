import React from 'react';

const CloseButton = ({
    xFill,
    bgFill
}) => {

    return(
        <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 250 250">
        <g>
            <path style={{fill: bgFill, transition: 'fill 0.1s linear'}} d="M77.65,238.87c-14.89-6.42-28-15.3-39.35-26.64c-11.34-11.34-20.22-24.44-26.64-39.29
                c-6.42-14.85-9.63-30.74-9.63-47.68c0-16.86,3.21-32.71,9.63-47.56s15.28-27.94,26.59-39.29c11.3-11.34,24.4-20.22,39.29-26.64
                s30.76-9.63,47.62-9.63s32.75,3.21,47.68,9.63c14.93,6.42,28.04,15.3,39.35,26.64c11.3,11.34,20.18,24.44,26.64,39.29
                c6.46,14.85,9.69,30.7,9.69,47.56c0,16.94-3.23,32.83-9.69,47.68c-6.46,14.85-15.34,27.94-26.64,39.29
                c-11.31,11.34-24.4,20.22-39.29,26.64c-14.88,6.42-30.76,9.63-47.62,9.63S92.53,245.29,77.65,238.87z"/>
        </g>
        <path style={{fill: xFill, transition: 'fill 0.1s linear'}} d="M79.24,171.17c-2.24-2.25-3.37-4.98-3.37-8.21c0-3.07,1.14-5.75,3.43-8.03l29.54-29.66L79.3,95.73
            c-2.28-2.28-3.43-4.96-3.43-8.03c0-3.23,1.12-5.95,3.37-8.15c2.25-2.2,4.94-3.31,8.09-3.31c3.39,0,6.18,1.14,8.39,3.43l29.42,29.42
            l29.78-29.54c2.28-2.28,5.04-3.43,8.27-3.43c3.23,0,5.95,1.12,8.15,3.37c2.21,2.24,3.31,4.94,3.31,8.09c0,3.07-1.14,5.75-3.43,8.03
            l-29.54,29.66l29.42,29.54c2.28,2.36,3.43,5.08,3.43,8.15c0,3.23-1.11,5.97-3.31,8.21c-2.21,2.24-4.92,3.37-8.15,3.37
            c-3.31,0-6.11-1.14-8.39-3.43l-29.54-29.42l-29.3,29.42c-2.21,2.29-5.04,3.43-8.51,3.43C84.18,174.54,81.49,173.41,79.24,171.17z"/>
        </svg>

    )
}

export default CloseButton;