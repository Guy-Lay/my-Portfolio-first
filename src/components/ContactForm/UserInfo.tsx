import React from 'react';
import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import "./UserInfo.css";

const UserInfo = () => {
    return (
        <div className="user-info">
            <div className="user-info__item">
                <FaEnvelope className="user-info__icon" />
                <a href="mailto:itazotebo88@gmail.com" className="user-info__text">
                    itazotebo88@gmail.com
                </a>
            </div>
            <div className="user-info__item">
                <FaMapMarkerAlt className="user-info__icon" />
                <a href="https://maps.google.com/?q=5+Duchess+Avenue+Singapore+266140" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="user-info__text">
                    5 Duchess Avenue, Singapore 266140
                </a>
            </div>
        </div>
    );
};

export default UserInfo;
