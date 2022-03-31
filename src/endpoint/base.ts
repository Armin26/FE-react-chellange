import axios from "axios";
import axiosMockInstance from "./mock/mock"
import "./mock/endpoint"

const isMocked = false
const apiClientMock = axiosMockInstance;

const apiClient = isMocked ? apiClientMock : axios.create({
  baseURL: "https://api.spoonacular.com/recipes",
});

apiClient.interceptors.request.use((config) => {
  return ({
    ...config,
    headers: {},
  })
},
  error => Promise.reject(error),
);

apiClient.interceptors.response.use((response) =>
  response,
  async (error) => {
    return Promise.reject(error.response.data);
  },
);

const { get } = apiClient;
export { get };
