import axios from "axios";

export interface FetchResponse<T> {
  results: T[];
}

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
});

class APIClient<T> {
  endpoint: string;
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }

  getAll = (token: string) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, config)
      .then((res) => res);
  };

  get = (id: number | string) => {
    return axiosInstance
      .get<T>(this.endpoint + "/" + id)
      .then((res) => res.data)
      .catch((error) => {
        throw error;
      });
  };
  delete = (id: number | string) => {
    return axiosInstance.delete<T>(this.endpoint + "/" + id).then((res) => res);
  };
  post = (token: string, data: T) => {
    //  const config = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };
    return axiosInstance.post<T>(this.endpoint, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => res.data);
  };

  put = (data: T) => {
    return axiosInstance
      .put<T>(this.endpoint + "/" + `${data?.id}`, data)
      .then((res) => res.data);
  };
}

export default APIClient;
