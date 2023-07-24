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
  token = localStorage.getItem("token");
  config = {
    headers: {
      Authorization: `Bearer ${this.token}`,
    },
  };

  getAll = () => {
    console.log(this.endpoint, this.config);
    return axiosInstance
      .get<FetchResponse<T>>(this.endpoint, this.config)
      .then((res) => res);
  };

  get = (id: number | string) => {
    console.log(id);
    return axiosInstance
      .get<T>(this.endpoint + "/" + id, this.config)
      .then((res) => res.data.data)
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };
  delete = (id: number | string) => {
    console.log(id);
    return axiosInstance
      .delete<T>(this.endpoint + "/" + id, this.config)
      .then((res) => res);
  };
  post = (data: T) => {
    return axiosInstance
      .post<T>(this.endpoint, data, {
        headers: {
          Authorization: `Bearer ${this.token}`,
        },
      })
      .then((res) => res.data);
  };

  put = (data: T) => {
    console.log(data);
    return axiosInstance
      .patch<T>(this.endpoint + "/" + `${data?.id}`, data, this.config)
      .then((res) => res.data)
      .catch((error) => {
        console.log(error);
        throw error;
      });
  };
}

export default APIClient;
