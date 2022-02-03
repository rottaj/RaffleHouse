import React from 'react';
import './NFT.css';
interface Props {
    token: any;
}


export default class NFT extends React.Component<Props> {



    render() {
        return (
            <div className="NFT-Main-Container">
                <img className="NFT-Img"src={this.props.token.image}></img>
                <h5 className="NFT-Price">Price: {this.props.token.price} eth</h5>
            </div>
        )
    }
}