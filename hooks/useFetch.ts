import { useState } from 'react';

interface FetchProps {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: Record<string, any>;
  headers?: Record<string, any>;
  onSuccess?: (data: any) => void;
}

function useFetch({
  url,
  method = 'GET',
  body,
  headers = {},
  onSuccess,
}: FetchProps) {
  const [data, setData] = useState<any>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // makeRequest function takes an optional object that contains
  // any additional options that should be passed to the fetch request
  const makeRequest = async (props: Record<string, any> = {}): Promise<any> => {
    try {
      setIsLoading(true);
      setErrors([]);

      const options: { [key: string]: any } = {
        method,
        headers: {
          ...headers,
        },
        ...props,
      };

      if (method !== 'GET') {
        if (body instanceof FormData) {
          options.body = body;
        } else if (body) {
          const formData = new FormData();
          Object.keys(body).forEach((key) => {
            formData.append(key, body[key]);
          });
          options.body = formData;
        }
      }

      const response = await fetch(url, options);

      const responseData = await response.json();

      if (onSuccess) {
        onSuccess(responseData);
      }

      setData(responseData);
      setIsLoading(false);

      return responseData;
    } catch (err) {
      console.log(err);
      setErrors([err.message]);
      setIsLoading(false);
    }
  };

  return { makeRequest, data, errors, isLoading };
}

export default useFetch;
