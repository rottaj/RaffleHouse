import React from 'react';
import NFTSelector from "./NFTSelector";
import "./RaffleCreator.css";

interface Props {
    isOpen: boolean;
}

declare let window: any;
export default class RaffleCreator extends React.Component <Props>{
    render() {
        return (
            <div className="CreateRaffleForm-Main" >
                {this.props.isOpen && 
                <div className="PopUp-Form">
                    <h3>Create New Proposal</h3>
                    <h3> 1 Share(FUN) = 0.08 ETH</h3>
                    <form className="CreateRaffle-Form" >
                        Minimum Buy in:
                        <input className="RaffleForm-Minimum-Buyin" defaultValue="0.08"></input>
                        <br></br>
                        <br></br>
                        <NFTSelector/>
                        <button>Submit Proposal</button>
                    </form>
                </div>
                }
            </div>
        )
    }
}