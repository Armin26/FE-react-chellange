import axios, { AxiosRequestConfig } from 'axios';
import MockAdapter from 'axios-mock-adapter';

const axiosMockInstance = axios.create();

export const axiosMockAdapterInstance = new MockAdapter(axiosMockInstance, { delayResponse: 1000 });
export default axiosMockInstance;
