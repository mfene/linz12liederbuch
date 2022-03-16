import useSWR from "swr";
import { plainTextFetcher } from "../config/fetcher";

type Data = {
  song: string | undefined;
  isLoading: boolean;
  error: any;
};

export default (id: string): Data => {
  const { data, error } = useSWR<string>(
    `/api/songs/${id || "undefined"}`,
    plainTextFetcher
  );

  return {
    song: data,
    isLoading: !error && !data,
    error,
  };
};
