import React from 'react';

function BusIcon(props) {

    return(
        <svg version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 350 350" style={{transform: 'scale(0.7)', fill: '#' + props.color}}>
        <path className="st0" d="M101.24,200.27c-3.2,0-5.84-1.08-7.98-3.25c-2.13-2.16-3.2-4.85-3.2-8.04v-3.93c0-3.2,1.07-5.84,3.2-7.98
            c2.13-2.13,4.78-3.2,7.98-3.2h15.34v26.39L101.24,200.27L101.24,200.27z M145.25,32.51c-9.37,3.68-17.73,8.76-25.09,15.22
            c-2.95,2.53-5.88,3.91-8.78,4.11c-2.9,0.2-5.38-0.68-7.43-2.63c-2.3-2.36-3.41-5.08-3.38-8.09c0.03-3.03,1.33-5.81,3.86-8.34
            c9.24-8.99,19.98-15.7,32.22-20.13c12.24-4.41,25.06-6.63,38.48-6.63c13.34,0,26.13,2.21,38.35,6.63
            c12.24,4.41,22.96,11.12,32.22,20.13c2.53,2.53,3.85,5.31,3.93,8.34c0.08,3.03-1.07,5.73-3.43,8.09c-2.05,1.96-4.5,2.85-7.36,2.63
            c-2.86-0.2-5.81-1.58-8.84-4.11c-7.36-6.54-15.7-11.64-25.04-15.29c-9.32-3.65-19.27-5.46-29.82-5.46
            C164.58,26.98,154.61,28.83,145.25,32.51z M123.09,334.98c-11.04-6.01-16.57-15.93-16.57-29.76V147.89
            c0-14.32,6.06-25.44,18.17-33.39S153.57,102.6,175,102.6c21.6,0,38.45,3.96,50.57,11.91c12.11,7.94,18.17,19.07,18.17,33.39v157.33
            c0,13.82-5.54,23.74-16.63,29.76S198.65,344,175,344C151.44,343.98,134.14,340.99,123.09,334.98z M211.64,318.82
            c7.33-2.86,10.99-7.66,10.99-14.35V148.12c0-7.86-4.03-13.89-12.09-18.1c-8.06-4.21-19.9-6.33-35.53-6.33
            c-15.47,0-27.22,2.11-35.28,6.33c-8.06,4.21-12.09,10.24-12.09,18.1v156.35c0,6.71,3.65,11.49,10.92,14.35
            c7.28,2.86,19.43,4.3,36.45,4.3C192.1,323.12,204.31,321.69,211.64,318.82z M160.65,73.56c-4.41,1.52-8.39,3.66-11.91,6.44
            c-6.71,4.75-12.19,5-16.45,0.73c-2.21-2.21-3.25-4.76-3.13-7.68c0.12-2.9,1.37-5.46,3.75-7.68c4.18-3.93,10.04-7.43,17.62-10.49
            c7.56-3.06,15.77-4.6,24.61-4.6c8.68,0,16.82,1.53,24.43,4.6c7.61,3.06,13.5,6.56,17.67,10.49c2.36,2.21,3.61,4.76,3.75,7.68
            c0.12,2.9-0.92,5.46-3.13,7.68c-4.26,4.26-9.74,4.01-16.45-0.73c-3.51-2.78-7.49-4.93-11.91-6.44c-4.41-1.52-9.21-2.26-14.35-2.26
            C169.89,71.29,165.06,72.04,160.65,73.56z M165.55,205.36c-3.51,0.12-6.81,0.25-9.87,0.37c-3.06,0.12-5.29,0.18-6.69,0.18
            c-3.68,0-6.43-0.83-8.23-2.51c-1.8-1.68-2.86-4.4-3.2-8.16l-1.47-17.18c-0.42-4.66,0.52-8.41,2.76-11.22
            c2.25-2.83,6.29-4.9,12.16-6.19c5.84-1.32,13.85-1.96,23.99-1.96c10.22,0,18.25,0.65,24.06,1.96c5.81,1.32,9.86,3.38,12.16,6.19
            s3.23,6.56,2.83,11.22l-1.47,17.18c-0.42,3.76-1.5,6.48-3.25,8.16c-1.76,1.68-4.48,2.51-8.16,2.51c-1.4,0-3.6-0.07-6.63-0.18
            c-3.03-0.12-6.29-0.25-9.82-0.37c-3.51-0.12-6.74-0.18-9.69-0.18C172.22,205.18,169.08,205.25,165.55,205.36z M143.33,298.09
            c-5.73-2.78-8.03-7.78-6.88-14.97l1.23-8.23c0.65-3.93,2.21-6.99,4.66-9.21c2.45-2.21,6.33-3.78,11.61-4.73
            c5.28-0.93,12.29-1.42,21.05-1.42c8.84,0,15.87,0.47,21.11,1.42c5.23,0.95,9.12,2.51,11.66,4.73s4.1,5.28,4.66,9.21l1.35,8.23
            c0.98,7.19-1.37,12.19-7.06,14.97s-16.27,4.18-31.72,4.18C159.62,302.26,149.06,300.87,143.33,298.09z M233.55,174.01h15.34
            c3.2,0,5.83,1.08,7.91,3.25c2.08,2.16,3.13,4.85,3.13,8.04v3.93c0,3.11-1.05,5.74-3.13,7.91c-2.08,2.16-4.73,3.25-7.91,3.25h-15.34
            V174.01z"/>
        </svg>
    )
}

export default BusIcon;