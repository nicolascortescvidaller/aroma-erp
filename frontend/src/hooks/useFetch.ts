import { useCallback, useEffect, useState } from "react";
import api from "../services/api";

export function useFetch<T>(url: string, immediate = true) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(url);
      setData(response.data.data as T);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error consultando datos";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    if (immediate) execute();
  }, [execute, immediate]);

  return { data, loading, error, refetch: execute };
}
