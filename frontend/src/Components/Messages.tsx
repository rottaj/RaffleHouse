import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { ethers } from 'ethers';
import { MessagesAddress, _Messages_abi } from '../interfaces/Messages_interface';
import "./Messages.css";


declare let window: any;
export default class Messages extends React.Component {

    state = {
        messages: [],
        myAddress: ""
    }

    
    getMessages = async () => {
        if (window.ethereum) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const myAddress = await signer.getAddress();
            this.setState({myAddress: [this.state.myAddress, myAddress]})
            const messagesContract = await new ethers.Contract(MessagesAddress, _Messages_abi, signer);
            let messagesLength = await messagesContract.getMessages();
            for (let i =0; i<=messagesLength-1; i++ ) {
                var message:any  = {}
                var messageInstance = await messagesContract.getMessageByIndex(i);
                message['messager'] = messageInstance['messager'];
                message['message'] = messageInstance['message'];
                    this.setState({
                        messages: [...this.state.messages, message]
                    })
            }
            // console.log(typeOf,message.messager);
        }
    }


    async componentDidMount() {
        if(window.ethereum) {
            this.getMessages();
        }
    } 

    handleSubmit = async (e: any) => {
        e.preventDefault();
        var provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const messagesContract = await new ethers.Contract(MessagesAddress, _Messages_abi, signer)  // connect to Raffles Contract
        const messageTxn = messagesContract.createMessage(e.target[0].value)
    }
    
    render() {
        return (
            <div className="Messages-Main-Div-Container">
               <h1>Messages </h1>
                {this.state.messages.map((message: any) => {
                    return (
                        <div className="Messages-Message-Div">
                            <h6>{message.messager === this.state.myAddress ? 
                                    "Me" + ": " 
                                : message.messager.substring(0, 6) + "..." + message.messager.substring(36, 40) + ": "} 
                            </h6>
                            <h6>{message.message}</h6>
                        </div>
                    )
                })
                }
               <form className="CreateMessage-Form" onSubmit={(e) => this.handleSubmit(e)}>
                    <TextField className="Messages-Create-New-Message" sx={{background: 'white', color: 'black', input: { color:'black' }}} placeholder="Message" id="filled-basic" label="Write something" variant="filled"></TextField>
                    <Button variant="contained" type="submit" style={{maxHeight: '55px'}}>
                        Send Message
                    </Button>
                </form>
            </div>
        )
    }
}