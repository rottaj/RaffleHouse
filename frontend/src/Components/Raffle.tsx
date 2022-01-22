import React from 'react';
import { ethers } from 'ethers';
import { Link } from 'react-router-dom';
import Home from '../Containers/Home'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import "./Raffle.css";
import { Swiper, SwiperSlide } from 'swiper/react';

interface Props {
    token: any;
}

declare let window: any;
export default class Raffle extends React.Component<Props> {

    handleClick = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            console.log("PROPS TOKEN (RAFFLE)", this.props.token)
            //return <Link to={`raffle/${this.props.token['contractAddress']}`}/>
            return <Link to={'/'} component={Home}/>
        }
    }

    render() {
        return (
            <div className="Raffle-Div-Main" onClick={() => this.handleClick()}>
                {console.log("FOOBAR", this.props)}
                <img className="Raffle-Img"src={this.props.token.tokenImage}></img>
                <div className="Raffle-Div-Info">
                    <div className="Raffle-Collection-Div">
                        <h3>{this.props.token.collectionName}</h3> 
                        <h3> {" "} #</h3>
                        <h3>{this.props.token.tokenID}</h3>
                        <CheckCircleIcon className="Verified-Icon"/>
                    </div>
                    <h3>BUY IN PRICE: {this.props.token.buyInPrice}</h3>
                </div>
            </div>
        )
    }
}