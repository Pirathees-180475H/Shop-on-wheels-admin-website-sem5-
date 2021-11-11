import React from 'react';
import './map.css';
import {Icon} from '@iconify/react';
import CloseIcon from '@iconify/icons-mdi/close-circle';

function SearchErrorBox({setErrorMsg}) {
    return (
        <div className="SearchError">
             <Icon icon={CloseIcon} className="searchError-close" onClick={()=>{setErrorMsg(false)}}/>
            <h4>Error Check the User Name</h4>
        </div>
    )
}
export default SearchErrorBox
