import { NextPageContext } from 'next';
import React, { useState } from 'react';
import { Button, message, Steps } from 'antd';
import helper from 'lib/helper';
import { handleGet, handlePost } from 'lib/handleAction';
import httpService from 'lib/httpService';
import { iTenant, iUser } from 'lib/interface';
import nookies from 'nookies';
import 'antd/dist/antd.css';

const widgetHeader = (title = 'selamat datang di', desc = 'smkn1 bandung') => {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center">
        <span className="h-px w-16 bg-gray-300" />
        <span className="text-gray-500 font-normal">{title}</span>
        <span className="h-px w-16 bg-gray-300" />
      </div>
      <h2 className="text-3xl font-bold text-gray-900">{desc}</h2>
    </div>
  );
};

const widgetFirst = (label: string, value: string, onChange: (e: any) => void) => {
  return (
    <div className="mt-8 space-y-6">
      <div className="relative">
        <label className="text-md font-bold text-gray-700 tracking-wide">{label}</label>
        <input
          name="kodeTiket"
          autoFocus={true}
          className=" w-full text-base text-md py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
          placeholder="contoh : xxxxxxxxxx"
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-gray-500 font-normal">anda dapat mengubungi pihak sekolah apabila menemukan kendala</span>
      </div>
    </div>
  );
};

const { Step } = Steps;
const steps = [
  { content: '' },
  { content: 'Second-content' },
  { content: 'Last-content' },
  { content: 'Last-content' },
];

interface iGetTenant {
  response: iTenant;
}

const Tenant: React.FC<iGetTenant> = ({ response }) => {
  const [isShowDrawer, setIsShowDrawer] = useState<boolean>(false);
  const [current, setCurrent] = React.useState(0);
  const [ticketCode, setTicketCode] = React.useState('');
  const [noHandphone, setNoHandphone] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [isBool, setIsBool] = React.useState(false);
  const [user, setUser] = React.useState<iUser>();

  const next = () => {
    if (current === 0) {
      if (!helper.isEmpty(ticketCode)) {
        message.error('kode tiket tidak boleh kosong');
        return;
      }
      handleSubmit();
      return;
    }
    if (current === 2) {
      if (!helper.isEmpty(noHandphone)) {
        message.error('no telepon tidak boleh kosong');
        return;
      }
    }
    if (current === 3) {
      if (!helper.isEmpty(otp)) {
        message.error('otp tidak boleh kosong');
        return;
      }
    }
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const handleSubmit = () => {
    handlePost(httpService.apiClient + 'auth/tiket', { ticket: 'SD123AS' }, (res, status, msg) => {
      if (status) {
        setUser(res.result);
        setTicketCode(ticketCode);
        message.success(msg);
        setTimeout(() => setCurrent(current + 1), 300);
      }
    });
  };

  const widgetTwo = () => {
    return (
      <div className="space-y-6">
        <table>
          <thead>
            <tr className="font-bold">
              <td width="30%">Nama</td>
              <td width="1%">: </td>
              <td className="text-left">{user?.fullname}</td>
            </tr>
            <tr className="font-bold">
              <td width="30%">Kelas</td>
              <td width="1%">: </td>
              <td className="text-left">{user?.kelas}</td>
            </tr>
            <tr className="font-bold">
              <td width="40%">Jenis kelamin</td>
              <td width="1%">: </td>
              <td className="text-left">{user?.jenis_kelamin === 0 ? 'Laki laki' : 'Perempuan'}</td>
            </tr>
          </thead>
        </table>
        <div className="flex items-center justify-between border-t border-gray-300">
          <span className="text-gray-500 font-normal mt-2">
            anda dapat mengubungi pihak sekolah apabila terjadi ke keliruan pada informasi ini
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-200 py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover relative items-center">
      <div className="absolute bg-black opacity-60 inset-0" />
      <div className="flex flex-col max-w-lg w-full z-10">
        <Steps current={current}>
          {steps.map((item, key) => (
            <Step key={key} />
          ))}
        </Steps>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            next();
          }}
        >
          <div className="bg-white rounded-xl space-y-8 p-10 mt-5">
            {current === 0 && (
              <>
                {widgetHeader('Selamat datang di', response.title)}
                {widgetFirst('masukan kode tiket anda', ticketCode, (res) => setTicketCode(res))}
              </>
            )}
            {current === 1 && (
              <>
                {widgetHeader('konfirmasi data diri', response.title)} {widgetTwo()}
              </>
            )}
            {current === 2 && (
              <>
                {widgetHeader('konfirmasi data diri', response.title)}
                {widgetFirst('masukan no telepon anda', noHandphone, (res) => setNoHandphone(res))}
              </>
            )}
            {current === 3 && (
              <>
                {widgetHeader('konfirmasi kode otp', response.title)}
                {widgetFirst('masukan kode tiket anda', '', (res) => setOtp(res))}
              </>
            )}

            <div className="steps-action text-right">
              {current > 0 && (
                <Button size="large" style={{ margin: '0 8px' }} onClick={() => prev()}>
                  Kembali
                </Button>
              )}
              {current < steps.length - 1 && (
                <Button size="large" type="primary" onClick={() => next()} loading={isBool} disabled={isBool}>
                  Lanjutkan
                </Button>
              )}

              {current === steps.length - 1 && (
                <Button size="large" type="primary" onClick={() => next()} loading={isBool} disabled={isBool}>
                  Lanjutkan
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  let response: any = [];
  try {
    const getDetail = await httpService.get(httpService.apiUrl + `tenant/get/${ctx.query.tenant}`);
    if (getDetail.status === 200) {
      response = getDetail.data.result;
    } else {
      response = [];
    }
  } catch (err) {}

  return {
    props: { response },
  };
}

export default Tenant;
