import React from 'react';


export default class PoolComponent extends React.Component {
    state = {
        tickets: 0,
        maxTickets: this.props.maxTickets
    }

    render() {
        return (
            <div>
                Genensis Pool 
                <br></br>
                Current ticket count: {this.state.tickets}
                <br></br>
                Max tickets: {this.state.maxTickets}
                <br>
                </br>
                <button>join pool</button>
            </div>
        )
    }
}