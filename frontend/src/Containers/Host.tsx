import React from 'react';
import RaffleCreator from "../Components/RaffleCreator";
import CoinFlipCreator from '../Components/CoinFlipCreator';

export default class Host extends React.Component {
    render() {
        return (
            <div>
                <RaffleCreator/>
                <CoinFlipCreator/>
            </div>
        )
    }
}