import React, { PureComponent } from 'react';

import axios from 'axios';
import * as rax from 'retry-axios';

const restInstanceObject = {
  baseURL: "http://127.0.0.1:3008",
  headers: { 'Content-Type': 'application/json' }
};

// test 500 & 503 
// const restInstanceObject = {
//   baseURL: "https://httpbin.org",
//   headers: { 'Content-Type': 'application/json' }
// };
const restInstance = axios.create(restInstanceObject);

// set up retry-attempt schema
restInstance.defaults.raxConfig = {
  retry:              4,
  noResponseRetries:  4,
  httpMethodsToRetry: ['GET', 'POST'],
  statusCodesToRetry: [[300, 399], [400, 499], [500, 599]],
  retryDelay:         200,
  instance:           restInstance,
  backoffType:        'static',
  onRetryAttempt:     (raxCfg: any, params: any[] = []) => {          // handler for retry attempt (the handler is called when the retry is happening)
    let paramsStr = params.join(', ');
    if (paramsStr !== '') { paramsStr = ', (' + paramsStr + ')' }
  
    if (raxCfg !== undefined) {
      console.log(`Retry attempt #${raxCfg.currentRetryAttempt}${paramsStr}`);
    } else {
      console.log(`Retry attempt${paramsStr}`);
    }
  }
};

rax.attach(restInstance);

interface ApiCallsState {
    list: string;
    name: string;
}

export default class ApiCalls extends PureComponent<{}, ApiCallsState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            list: "",
            name: ""
        };
    }
  componentDidMount(){
    this.loadData()
  }

  loadData = () => {
    let restInstancePosts = [
      restInstance.get('/users'),
      restInstance.get('/users/1')
      // test 500 & 503 
      //restInstance.get('/status/500'),
      //restInstance.get('/status/503')
    ];
    axios
      .all(restInstancePosts)
      .then(
        axios.spread(
          (getUsers,getUser) => {
            // console.log(getUsers.status, getUsers.data)
            // console.log(getUser.status, getUser.data)
            let all = getUsers.data.map((user:any) => <span key={user.id}>{user.name} </span>)
            this.setState({
                name: getUser.data.name,
                list: all
            })
          }
        )
      )
      .catch(error => {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js

          console.error(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error', error.message);
        }
      });
  };

  render(): React.ReactNode {
    return (
      <div>
        {this.state.name} is part of {this.state.list}
      </div>
    );
  }
}

