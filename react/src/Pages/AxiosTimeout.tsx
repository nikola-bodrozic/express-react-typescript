import React, { Component } from 'react';
import axios from 'axios'

interface FullName {
    first: string;
    last: string;
}

class AxiosTimeout extends Component <{}, FullName> {

    constructor(props: {}) {
        super(props);
        this.state = {
            first: "",
            last: ""
        };
    }
    baseUrl = process.env.REACT_APP_NODE_IP || 'localhost:3008';
    componentDidMount() {
        let baseURL = 'http://' + this.baseUrl
        axios.post(
            baseURL+'/echo',
            {
                firstParam: 'ed',
                secondParam: 'libero'
            },
            {
                timeout: 5000,
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then( 
        (response) => this.setState({
          first: response.data.first,
          last: response.data.last
        }), 
        (error) => console.log(error) );
    }

    render() {
        return (
            <div>
            {this.state.first} {this.state.last}
            <br />
                <small>You are running this application in <b>{process.env.NODE_ENV}</b> mode.</small>
            </div>
        )
    }
}

export default AxiosTimeout;
