import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../axiosClient';
import * as rax from 'retry-axios';

function RaxCall() {
  const axiosInstance = axios.create();
  axiosInstance.defaults.raxConfig = {
    instance: axiosInstance
  };
  rax.attach(axiosInstance);

  const [data, setData] = useState('');
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get(baseURL+'/serverboot', {
          raxConfig: {
            retry: 10,
            instance: axiosInstance,
            retryDelay: 1000,
            backoffType: "static",
            httpMethodsToRetry: ['GET', 'HEAD', 'OPTIONS', 'DELETE', 'PUT'],
            statusCodesToRetry: [[100, 199], [429, 429], [500, 599]],
            onRetryAttempt: err => {
              const cfg = rax.getConfig(err);
              cfg && console.log(`Retry attempt #${cfg.currentRetryAttempt}`);
            }
          }
        });
        setData(response.data);
      } catch (error) {
        console.error(error);
        setError(error)
      }
    })();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <p>simulated server booting up on route <b>/api/v1/serverboot</b></p>
      <p>{data}</p>
    </div>
  );
}

export default RaxCall;