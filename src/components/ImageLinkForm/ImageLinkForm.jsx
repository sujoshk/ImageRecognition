import React from 'react';
import './ImageLinkForm.Styles.css';


const ImageLinkForm = ({onInputChange, onSubmit}) => {
    return(
        <div>
            <p className='f3 yellow'>
                {'This Magic Brain will detect faces in your pictures. Give it a try'}
            </p>
            <div className='center'>
                <div className='form center pa4 br3 shadow-s'>
                    <input className='f5 pa2 w-70 center' type='text' onChange={onInputChange}/>
                    <button  className='w-30 grow f4 link ph3 pv2 dib yellow bg-black' onClick={onSubmit}>
                        Detect
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ImageLinkForm;