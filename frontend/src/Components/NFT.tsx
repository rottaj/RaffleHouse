import React from 'react';

interface Props {
    token: any;
}

export default class NFT extends React.Component<Props> {
    render() {
        return (
            <div >
                <img src={this.props.token}></img>
            </div>
        )
    }
}