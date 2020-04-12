import React from 'react';


const Navigation = ({onRouteChange}) => {
    return (
        <nav            
            style={{display: 'flex' , justifyContent: 'flex-end'}}>
            <p 
            onClick={() => onRouteChange('signIn')} 
            className='f1 link dum white underline pa4 pointer'>Sign Out</p>

        </nav>
    );
};

export default Navigation;