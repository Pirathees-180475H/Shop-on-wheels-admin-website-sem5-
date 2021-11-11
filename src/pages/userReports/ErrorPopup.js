import React from 'react'
import './ProfileerrorMsg.css';
import {Icon} from '@iconify/react';
import CloseIcon from '@iconify/icons-mdi/close-circle';

function ErrorPopup({isShow}) {
    return (
        <div className="Profile-error-info">
            <Icon icon={CloseIcon} className="closeIcon" onClick={()=>isShow(false)}/>
            <div className="Profile-error-message"><h2> User NotFound!</h2></div>
             <h4>Check User Name</h4>
        </div>
    )
}
export default ErrorPopup
