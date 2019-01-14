import React, { Component } from 'react';
import PropTypes from 'prop-types';
import __upperFirst from 'lodash/upperFirst';

import './UserTile.css';

class UserTile extends Component {
    render() {
        const { 
            name, 
            location, 
            interests, 
            profileId,
            onlineStatus
        } = this.props;

        return (
            <div className="user-tile">
                <div className="bio">
                    <div className={`online-status ${onlineStatus}`}>{onlineStatus}</div>
                    <div className="profile-image" style={{ backgroundImage: `url("http://www.facetheforce.today/random/400?r=${parseInt(Math.random() * 100000)}")` }}>
                    </div>
                    <p className="profile-name">{ name }</p>
                    <p className="profile-location" dangerouslySetInnerHTML={{ __html: location.replace('United States', 'US') }}></p>
                </div>
                <div className="interests">
                    {
                        interests.map((interest, i) => {
                            return <div key={i}>{ __upperFirst(interest) }</div>
                        })
                    }
                </div>
                <div className="actions">
                    <a href={`/profile/${profileId}`} onClick={e => e.preventDefault()}>View Channel</a>
                    <a href={`/profile/${profileId}/message`} onClick={e => e.preventDefault()}>Send Message</a>
                </div>
            </div>
        );
    }
}

UserTile.propTypes = {
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    profileId: PropTypes.number.isRequired,
    interests: PropTypes.array.isRequired,
    onlineStatus: PropTypes.string.isRequired
};

export default UserTile;
