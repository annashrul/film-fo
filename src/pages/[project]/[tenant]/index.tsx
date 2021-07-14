import { NextPageContext } from 'next';
import React, { useState, useEffect } from 'react';

import helper from 'lib/helper';
import { handlePost } from 'lib/handleAction';
import httpService from 'lib/httpService';
import { iTenant, iUser } from 'lib/interface';
import { widgetFirst, widgetHeader, widgetTwo } from 'components/tenant/tenantCommon';
import { Button, message, Steps } from 'antd';
import 'antd/dist/antd.css';
import OTPInput from 'components/Common/Otp';
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
  const [resOtp, setResOtp] = useState({ otp: '' });
  const [current, setCurrent] = React.useState(0);
  const [ticketCode, setTicketCode] = React.useState('');
  const [noHandphone, setNoHandphone] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [user, setUser] = React.useState<iUser>();
  const [counter, setCounter] = React.useState(0);
  const [startTimer, setStartTimer] = React.useState(false);

  useEffect(() => {
    if (counter > 0) {
      const timer = setInterval(() => setCounter(counter - 1), 1000);

      return () => clearInterval(timer);
    }

    if (counter === 0 && startTimer) {
      setStartTimer(false);
    }
  }, [counter, startTimer]);

  const next = () => {
    if (current === 0) {
      if (!helper.isEmpty(ticketCode)) {
        message.error('kode tiket tidak boleh kosong');
        return;
      }
      handleSubmitTicket();
      return;
    }
    if (current === 1) {
      setCurrent(current + 1);
    }
    if (current === 2) {
      if (!helper.isEmpty(noHandphone)) {
        message.error('no telepon tidak boleh kosong');
        return;
      }
      handleSubmitPhone();
      return;
    }
    if (current === 3) {
      if (otp.length === 4) {
        if (otp !== resOtp.otp) {
          message.error('otp tidak tidak sesuai');
          return;
        }
        message.success('berhasil');
        // setCurrent(current + 1);
        return;
      }
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const handleSubmitTicket = () => {
    handlePost(httpService.apiClient + 'auth/tiket', { ticket: ticketCode }, (res, status, msg) => {
      if (status) {
        Object.assign(res.result, response);
        setUser(res.result);
        message.success(msg);
        setTimeout(() => setCurrent(current + 1), 300);
      }
    });
  };
  const handleSubmitPhone = (type = 'send') => {
    handlePost(httpService.apiClient + 'auth/otp', { nomor: noHandphone, ticket: user?.ticket }, (res, status, msg) => {
      if (status) {
        setResOtp({ otp: res.result.otp_anying });
        setStartTimer(false);
        setCounter(180);
        message.success(msg);
        type === 'send' && setTimeout(() => setCurrent(current + 1), 300);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 px-6 flex flex-col justify-center ">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 skew-y-0 sm:-rotate-6 rounded-3xl"></div>
        <div className="relative px-4 ">
          <div className="max-w-md mx-auto">
            <Steps current={current}>
              {steps.map((item, key) => (
                <Step key={key} />
              ))}
            </Steps>
          </div>
        </div>
        <br />
        <div className="relative px-4 py-5 bg-white shadow rounded-xl sm:p-10">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              next();
            }}
          >
            <div className="max-w-md mx-auto">
              {current === 0 && (
                <>
                  {widgetHeader('Selamat datang di', response.title)}
                  {widgetFirst('masukan kode tiket anda', ticketCode, (res) => setTicketCode(res))}
                </>
              )}
              {current === 1 && (
                <>
                  {widgetHeader('konfirmasi data', response.title)} {widgetTwo(user)}
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
                  <div className="mt-8 ">
                    <div className="relative">
                      <OTPInput
                        autoFocus
                        isNumberInput
                        length={4}
                        className="my-4	px-auto text-lg flex items-center justify-center "
                        inputClassName="otpInput w-10	h-10 text-white dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray"
                        onChangeOTP={(otp) => {
                          setOtp(otp);
                          if (otp.length === 4) {
                            if (otp !== resOtp.otp) {
                              message.error('otp tidak tidak sesuai');
                              return;
                            }
                            message.success('berhasil');
                          }
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-500 font-normal">
                        anda dapat mengubungi pihak sekolah apabila menemukan kendala.
                        <br />
                        {counter > 0 ? (
                          <button className="underline text-indigo-500 font-bold">
                            Kirim ulang dalam {counter} Detik. {resOtp.otp}
                          </button>
                        ) : (
                          <button
                            className="underline text-indigo-500 font-bold"
                            onClick={() => handleSubmitPhone('resend')}
                          >
                            Kirim ulang.
                          </button>
                        )}
                      </span>
                    </div>

                    <div className="flex items-center justify-center"></div>
                  </div>
                </>
              )}

              <div className="steps-action text-right mt-10">
                {current > 0 && (
                  <Button size="large" type="default" style={{ margin: '0 8px' }} onClick={() => prev()}>
                    Kembali
                  </Button>
                )}
                {current < steps.length - 1 && (
                  <Button size="large" type="primary" onClick={() => next()}>
                    Lanjutkan
                  </Button>
                )}

                {current === steps.length - 1 && (
                  <Button size="large" type="primary" onClick={() => next()}>
                    Lanjutkan
                  </Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl" />
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
          <div className="bg-white rounded-2xl shadow-md space-y-8 p-10 mt-5"></div>
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
