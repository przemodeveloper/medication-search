import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const useQueryParams = () => {
  const [queryParams, setQueryParams] = useState<any>({});
  const location = useLocation();
  const navigate = useNavigate();

  const setQueryParam = (key: string, value: string) => {
    const searchParams = new URLSearchParams(location.search);
    searchParams.set(key, value);
    navigate({ search: searchParams.toString() });
    setQueryParams({ ...queryParams, [key]: value });
  };

  const getQueryParam = (key: string) => {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get(key);
  };

  return { queryParams, setQueryParam, getQueryParam };
};

export default useQueryParams;
