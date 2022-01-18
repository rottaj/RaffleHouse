import React from 'react';
import "./PlayersList.css";

interface Props {
    players: any
}

export default class PlayersList extends React.Component <Props>{
    render() {
        return (
            <div className="PlayersList-Main-Container">
                Players List
                {console.log(this.props)}
            </div>
        )
    }
}