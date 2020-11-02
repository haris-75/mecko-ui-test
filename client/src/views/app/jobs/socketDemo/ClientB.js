import React, {Component} from "react";
import socketIOClient from "socket.io-client";

class App extends Component {
    constructor() {
        super();
        this.state = {
            response: 0,
            endpoint: "http://localhost:9092"
        };
    }

    componentDidMount() {
        const {endpoint} = this.state;
        //Very simply connect to the socket
        const socket = socketIOClient(endpoint);
        //Listen for data on the "outgoing data" namespace and supply a callback for what to do when we get one. In this case, we set a state variable
        socket.on("STAGE_UPDATED", ({data}) => {
            console.log("Came in recieved");
            console.log(data);
            this.setState({response: data.value})

        });
    }

    render() {
        const {response} = this.state;
        return (
            <div style={{textAlign: "center"}}>
                {response}
            </div>
        )
    }
}

export default App;
