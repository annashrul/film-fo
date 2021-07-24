import axios from 'axios';
import Cookies from 'js-cookie';

const coo: string = Cookies.get('_prowara')!;
const coo_bo: string = Cookies.get('_prowara_bo')!;
if (coo !== undefined) {
  axios.defaults.headers.common['Authorization'] = atob(coo);
  axios.defaults.headers.common['myconnection'] = 'apps';
} else if (coo_bo !== undefined) {
  axios.defaults.headers.common['Authorization'] = atob(coo_bo);
  axios.defaults.headers.common['myconnection'] = 'backoffice';
}

export default {
  axios: axios,
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  // apiUrl: "http://192.168.100.10:6704/",
  // apiClient: "http://192.168.100.10:6704/",
  noData: 'https://www.napro.id/assets/images/placeholder-no-data.png',
  apiUrl: 'http://ptnetindo.com:6701/',
  apiClient: 'http://ptnetindo.com:6701/',
};
