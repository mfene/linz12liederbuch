import useSWR from "swr";
import fetcher from "../config/fetcher";

type Data = {
  songs: string[];
  isLoading: boolean;
  error: any;
};

export default (): Data => {
  const { data, error } = useSWR(`/api/songs`, fetcher);

  return {
    songs: data,
    isLoading: !error && !data,
    error,
  };
};
