import React from 'react';
import "./Raffle.css"

interface Props {
    token: any;
}

//export default class PoolComponent extends React.Component<IPoolComponentProps, IPoolComponentState> {
export default class Raffle extends React.Component<Props> {

    render() {
        return (
            <div className="Raffle-Div-Main">
                {console.log(this.props)}
                <img className="Raffle-Img"src={this.props.token.tokenImage}></img>
            </div>
        )
    }
}