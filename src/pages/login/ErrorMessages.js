import React from 'react';
import './loginerrorMsg.css';
import {Icon} from '@iconify/react';
import CloseIcon from '@iconify/icons-mdi/close-circle';

function ErrorPopup({isShow,message}) {
    return (
        <div className="error-info">
            <Icon icon={CloseIcon} className="closeIcon" onClick={()=>isShow(false)}/>
            <div className="error-message"><h2>Error !!</h2></div>
             <h4>{message}</h4>
        </div>
    )
}
export default ErrorPopup
