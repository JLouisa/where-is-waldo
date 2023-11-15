import { useRef } from "react";
import apiHost from "../config/host";

function useFetch() {
  const AbortControllerRefGet = useRef(null);
  const AbortControllerRefPost = useRef(null);

  const getFetch = async (apiStr, url = apiHost) => {
    AbortControllerRefGet.current?.abort();
    AbortControllerRefGet.current = new AbortController();

    try {
      const response = await fetch(`${url}${apiStr}`, {
        signal: AbortControllerRefGet.current?.signal,
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Aborted");
        return;
      }
      console.log(error);
    }
  };

  const postFetch = async (apiStr, value, url = apiHost) => {
    AbortControllerRefPost.current?.abort();
    AbortControllerRefPost.current = new AbortController();

    try {
      const response = await fetch(`${url}${apiStr}`, {
        signal: AbortControllerRefPost.current?.signal,
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(value),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      if (error.name === "AbortError") {
        console.log("Aborted");
        return;
      }
      console.log(error);
    }
  };

  return { getFetch, postFetch };
}

export default useFetch;
