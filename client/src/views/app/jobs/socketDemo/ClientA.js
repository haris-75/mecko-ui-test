import React, {Component} from 'react';
import {Button} from "reactstrap";

class ClientA extends Component {

    handlePush = () => {
        let socket = require("socket.io-client")("http://localhost:9092");
        socket.emit("UPDATE_STAGE", {value: Math.random()})
    }
    render() {
        return (
            <div>
                <h1>Client A</h1>

                <Button color={"primary"} onClick={this.handlePush}>Push</Button>
            </div>
        );
    }
}

export default ClientA;