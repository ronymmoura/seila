import { useState, useEffect } from "react";

export type ServiceError = {
  data: string;
  status: number;
  statusText: string;
};

export function useService<T>(method: () => Promise<T>) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<ServiceError>();
  const [isLoading, setIsLoading] = useState(false);

  async function refetch() {
    if (method) {
      (async () => {
        try {
          setIsLoading(true);
          const result = await method();
          setData(result);
        } catch (e: any) {
          if (e.response) {
            setError(e.response);
          } else {
            throw e;
          }
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }

  useEffect(() => {
    refetch();
  }, []);

  return { data, error, isLoading, refetch };
}
