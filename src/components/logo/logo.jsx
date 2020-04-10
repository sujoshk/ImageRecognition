import React from 'react';
import Tilt from 'react-tilt';
import './logo.css';
import './brain.svg';


const Logo = () => {
    return(
        <div className='ma4 mt0'>
            <Tilt className= 'Tilt br2 shadow-4' options={{ max: 55}} style={{ height: 150, width: 150}}>
                <div className='Tilt-inner pa3'>
                    <img style={{paddingTop: '5px'}} alt='logo'scr='brain.svg'/>
                </div>
            </Tilt>

        </div>

    );
};

export default Logo;