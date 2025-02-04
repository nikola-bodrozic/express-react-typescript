import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as rax from 'retry-axios';

function RaxCall() {
  const axiosInstance = axios.create();
  axiosInstance.defaults.raxConfig = {
    instance: axiosInstance
  };
  const interceptorId = rax.attach(axiosInstance);

  const [data, setData] = useState<any>(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await axiosInstance.get('http://localhost:4000/serverboot', {
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
      <h1>{JSON.stringify(data)}</h1>
    </div>
  );
}

export default RaxCall;