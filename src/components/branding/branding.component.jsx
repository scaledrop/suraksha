import React from 'react';

import './branding.styles.scss';

const Branding = () => (
    <div className="branding-container">
        <h1 className='branding-bpm'>Suraksha</h1>
        <div className='icon-div'>
            <i className='fas fa-user-md user icon'></i>
            <i className='fas fa-heartbeat heartbeat icon'></i>
            <i className='fas fa-weight weight icon'></i>
            <i className='fas fa-sticky-note note icon'></i>
        </div>
    </div>
);

export default Branding;