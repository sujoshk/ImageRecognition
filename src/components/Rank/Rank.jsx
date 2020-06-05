import React from 'react';


const Rank = ({name, entries}) => {

    return (
        <div className='yellow f3'>
            {`${name}, your current entries count is ...`}
            <div className='white f3'>
                {entries}
            </div>
            
        </div>
    );
};

export default Rank;