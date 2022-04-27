import React, { useEffect } from 'react';

import axios from 'axios';
import * as rax from 'retry-axios';

export default function AxiosRetry() {

  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    let baseUrl = process.env.REACT_APP_NODE_IP || 'localhost:3008';

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const interceptorId = rax.attach();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const res = await axios({
      url: `http://${baseUrl}/http503`,
      raxConfig: {
        retry: 5,
        retryDelay: 1000,
        httpMethodsToRetry: ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT'],
        statusCodesToRetry: [[100, 199], [429, 429], [500, 599]],
        backoffType: 'static',
        onRetryAttempt: (err: any) => {
          const cfg = rax.getConfig(err);
          if (cfg) console.log(`Retry attempt #${cfg.currentRetryAttempt}`);
          console.log(err)
        }
      }
    })
  };


  return (
    <div>
      demo for HTTP 503 code open console
    </div>
  );

}

