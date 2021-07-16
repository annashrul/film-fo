// import jwtDecode from "jwt-decode";
import http from "./httpService";
import Cookies from "js-cookie";
import {iUserBo} from './interface'
import Helper from "./helper";

// http.setJwt (getJwt());


function setUser(datum: iUserBo) {
  Cookies.set('__uid_bo', btoa(JSON.stringify(datum)), { expires: 7 });
}

function setToken(datum: string) {
  Cookies.set('_prowara_bo', btoa(datum), { expires: 7 });

}
export function doLogout() {
  Helper.removeCookie('__uid_bo');
  Helper.removeCookie('_prowara_bo');
  Helper.removeCookie('_regist_bo');
  http.axios.defaults.headers.common["Authorization"] = '';

}

function getUser() {
  // const coo: string=Cookies.get('__uid')!;
  //  try {
  //    const datum:iUser= JSON.parse(atob(coo));
  //    return datum;
  // } catch (err) {
  //     // const datum:iUser= JSON.parse();
  //     return datum;
  // }
}

function getToken() {
  const coo: string=Cookies.get('_prowara_bo')!;
  return coo;
}

export default {
  http,
  doLogout,
  setUser,
  getUser,
  getToken,
  setToken
};
