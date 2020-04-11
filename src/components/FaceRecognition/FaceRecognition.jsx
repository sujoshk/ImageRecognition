import React from 'react';
import './FaceRecognition.styles.css';



const FaceRecognition = ({box, imageUrl}) => {
    return(
        <div className='center ma'>
            <div className='absolute mt3'>
             <img id='inputImage' alt='' src={imageUrl} width='500px' height='auto' />
             <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}>

             </div>
            </div>
                      
        </div>
    );
}

export default FaceRecognition;