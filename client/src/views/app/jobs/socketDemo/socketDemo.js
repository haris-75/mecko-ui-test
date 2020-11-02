import React, {Component} from 'react';
import ClientA from "./ClientA";
import ClientB from "./ClientB";


class SocketDemo extends Component {
    render() {
        return (
            <div>
                <div style={{border: "2px solid black", width: "500px", height: "400px"}}>
                    <ClientA />
                </div>
                <br></br>
                <div style={{border: "2px solid blue", width: "500px", height: "400px"}}>
                    <ClientB />
                </div>
            </div>
        );
    }
}

export default SocketDemo;