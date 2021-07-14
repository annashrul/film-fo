import NProgress from 'nprogress'; //nprogress module
import Api from 'lib/httpService';
import Swal from 'sweetalert2';
import helper from './helper';
import { Button, message, Steps } from 'antd';
import 'antd/dist/antd.css';

const strNetworkError = 'terjadi kesalahan pada jaringan';
const strServerError = 'terjadi kesalahan pada server';

export const loading = (isStatus = true, title = 'Silahkan tunggu.') => {
  if (isStatus) {
    Swal.fire({
      allowOutsideClick: false,
      title: title,
      didOpen: () => Swal.showLoading(),
    });
  } else {
    Swal.close();
  }
};

export const handleError = (err: any) => {
  if (err.message === 'Network Error') {
    message.error(strNetworkError);
  } else {
    if (err.response !== undefined) {
      if (err.response.data.msg !== undefined) {
        message.error(err.response.data.msg);
      } else {
        message.error(strServerError);
      }
    }
  }
};

export const handleGet = async (url: string, callback: (data: any) => void, isLoading: boolean = true) => {
  if (isLoading) NProgress.start();
  try {
    const getData = await Api.get(url);
    if (isLoading) NProgress.done();
    const datum = getData.data.result;
    callback(datum);
  } catch (err: any) {
    if (isLoading) NProgress.done();
    handleError(err);
  }
};

export const handlePost = async (
  url: string,
  data: any,
  callback: (datum: any, isStatus: boolean, msg: string) => void,
) => {
  message.loading('Tunggu sebentar..');

  // loading(true);
  try {
    const submitData = await Api.post(url, data);
    const datum = submitData.data;
    if (datum.status === 'success') {
      callback(datum, true, datum.msg);
    } else {
      callback(datum, false, datum.msg);
    }
    message.destroy();
    loading(false);
  } catch (err: any) {
    message.destroy();
    loading(false);
    handleError(err);
  }
};
export const handlePut = async (
  url: string,
  data: any,
  callback: (datum: any, isStatus: boolean, msg: string) => void,
) => {
  loading(true);
  try {
    const submitData = await Api.put(url, data);
    const datum = submitData.data;
    if (datum.status === 'success') {
      callback(datum, true, datum.msg);
    } else {
      callback(datum, false, datum.msg);
    }
    loading(false);
  } catch (err: any) {
    loading(false);
    handleError(err);
  }
};

export const handleDelete = async (url: string, callback: () => void) => {
  loading(true);
  try {
    const submitData = await Api.delete(url);
    const datum = submitData.data;
    if (datum.status === 'success') {
      helper.mySwal(datum.msg);
      callback();
    } else {
      helper.mySwal(datum.msg);
    }
    loading(false);
  } catch (err) {
    loading(false);
    handleError(err);
  }
};
