import internal from 'node:stream';
import React from 'react';


interface IPoolComponentProps {
    tickets?: number;
    maxTickets?: number;
}

interface IPoolComponentState {
    tickets?: number;
    maxTickets?: number;
}


export default class PoolComponent extends React.Component<IPoolComponentProps, IPoolComponentState> {
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