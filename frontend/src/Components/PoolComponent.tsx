import internal from 'node:stream';
import React, { useState } from 'react';
import { useEthers } from '@usedapp/core';


interface IPoolProps {
    tokens?: number;
    maxTokens?: number;
}

//export default class PoolComponent extends React.Component<IPoolComponentProps, IPoolComponentState> {
export default function PoolComponent(props:IPoolProps) {

    const maxTokens = useState(props.maxTokens)
    const tokens = useState(props.tokens)

    const { account } = useEthers();
    return (
        <div>
            {console.log(account)}
            Genensis Pool 
            <br></br>
            Current token count: {tokens}
            <br></br>
            Max tokens: {maxTokens}
            <br>
            </br>
            <button>join pool</button>
        </div>
    )
}