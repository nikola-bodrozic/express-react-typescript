import React, { PureComponent } from 'react';

import axios from 'axios';
import * as rax from 'retry-axios';

export default class AxiosRetry extends PureComponent<{}, {}> {
  constructor(props: {}) {
      super(props);
  }
    
  componentDidMount(){
    this.loadData()
  }

  loadData = async () => {
    const interceptorId = rax.attach();
    const res = await axios({
      url: `http://${process.env.REACT_APP_NODE_IP}/http503`,
      raxConfig:{
        retry: 5,
        retryDelay: 1000,
        httpMethodsToRetry: ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT'],
        statusCodesToRetry: [[100, 199], [429, 429], [500, 599]],
        backoffType: 'static',
        onRetryAttempt: (err:any) => {
          const cfg = rax.getConfig(err);
          if(cfg) console.log(`Retry attempt #${cfg.currentRetryAttempt}`);
          console.log(err)
        }
      }
    })
  };

  render(): React.ReactNode {
    return (
      <div>
        demo for HTTP 503 code
      </div>
    );
  }
}

