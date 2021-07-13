import NProgress from 'nprogress'; //nprogress module
import Api from 'lib/httpService';
import Swal from 'sweetalert2';
import helper from './helper';

const strNetworkError = 'terjadi kesalahan pada jaringan';
const strServerError = 'terjadi kesalahan pada server';
const interval = 800;

export const loading = (isStatus = true, title = 'Silahkan tunggu.') => {
  Swal.fire({
    allowOutsideClick: false,
    title: title,
    html: '',
    onBeforeOpen: () => {
      Swal.showLoading();
    },
    onClose: () => {},
  });
  if (!isStatus) Swal.close();
};

export const handleError = (err: any) => {
  if (err.message === 'Network Error') {
    helper.mySwal(strNetworkError);
  } else {
    if (err.response !== undefined) {
      if (err.response.data.msg !== undefined) {
        helper.mySwal(err.response.data.msg);
      } else {
        helper.mySwal(strServerError);
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
  loading(true);
  try {
    const submitData = await Api.post(url, data);
    setTimeout(function () {
      loading(false);
      const datum = submitData.data;
      if (datum.status === 'success') {
        callback(datum, false, 'Berhasil memproses permintaan.');
      } else {
        callback(datum, true, 'gagal memproses permintaan.');
      }
    }, interval);
  } catch (err: any) {
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
    setTimeout(function () {
      loading(false);
      const datum = submitData.data;
      if (datum.status === 'success') {
        callback(datum, false, 'Berhasil memproses permintaan.');
      } else {
        callback(datum, true, 'gagal memproses permintaan.');
      }
    }, interval);
  } catch (err: any) {
    loading(false);
    handleError(err);
  }
};

export const handleDelete = async (url: string, callback: () => void) => {
  loading(true);
  try {
    const submitData = await Api.delete(url);
    setTimeout(function () {
      loading(false);
      const datum = submitData.data;
      if (datum.status === 'success') {
        helper.mySwal(datum.msg);
        callback();
      } else {
        helper.mySwal(datum.msg);
      }
    }, interval);
  } catch (err) {
    loading(false);
    handleError(err);
  }
};
