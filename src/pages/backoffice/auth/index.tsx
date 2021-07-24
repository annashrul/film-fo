import React, { useState } from 'react';
import { NextPageContext } from 'next';
import 'react-intl-tel-input/dist/main.css';
import { NextPage } from 'next';
import Sess from 'lib/auth_bo';
import { useRouter } from 'next/router';
import nookies from 'nookies';
import { handlePost } from 'lib/handleAction';
import { message, Button } from 'antd';
import 'antd/dist/antd.css';
import helper from 'lib/helper';

interface iLogin {
  apiUrl: string;
  otpLength: number;
}
const Index: NextPage<iLogin> = () => {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const handleSubmit = (e: any) => {
    console.log(e);
    if (!helper.isEmpty(username)) {
      message.error('username tidak boleh kosong');
    } else if (password === '') {
      message.error('Password tidak boleh kosong!');
    } else {
      handlePost(
        Sess.http.apiClient + 'auth',
        {
          username: username,
          password: password,
        },
        (res, status, msg) => {
          if (status) {
            message.success(msg);
            const datum = res.result;
            Sess.setUser({
              id: datum.id,
              token: datum.token,
              name: datum.name,
              username: datum.username,
              foto: datum.foto,
              level: datum.level,
              access_level: datum.access_level,
              status: datum.status,
              created_at: datum.created_at,
              updated_at: datum.updated_at,
            });
            Sess.setToken(datum.token);
            Sess.http.axios.defaults.headers.common['Authorization'] = datum.token;
            router.push('/backoffice/dashboard');
          }
        },
      );
    }
  };

  return (
    <div className="flex items-center justify-center pt-3 pb-10 px-6 sm:px-12 md:w-full">
      <div className="w-full">
        <div className="min-h-screen px-6 flex flex-col justify-center ">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:-rotate-6 rounded-3xl"></div>
            <div className="relative px-4 py-5 bg-white shadow rounded-xl sm:p-10">
              <form
                onSubmit={(e) => {
                  console.log('bus');
                  e.preventDefault();
                  handleSubmit(e);
                }}
              >
                <div className="max-w-md mx-auto">
                  <div className="text-center">
                    <div className="flex items-center justify-center">
                      <img
                        src="https://rekreartive.com/wp-content/uploads/2019/04/Logo-Tut-Wuri-Handayani-PNG-Warna.png"
                        width="150px"
                        alt={'logo'}
                        style={{
                          display: 'block',
                          marginLeft: 'auto',
                          marginRight: 'auto',
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-8 space-y-6">
                    <div className="relative">
                      <label className="text-md text-gray-700 tracking-wide">Username</label>
                      <input
                        name="kodeTiket"
                        className=" w-full text-base text-md py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                        placeholder="masukan username anda disini"
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                      />
                    </div>
                    <div className="relative">
                      <label className="text-md text-gray-700 tracking-wide">Password</label>
                      <input
                        type="password"
                        name="kodeTiket"
                        className=" w-full text-base text-md py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                        placeholder="masukan password anda disini"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                    </div>
                  </div>

                  <div className="steps-action text-right mt-10">
                    <Button size="large" type="primary" onClick={(e) => handleSubmit(e)}>
                      Lanjutkan
                    </Button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export async function getServerSideProps(ctx: NextPageContext) {
  // Parse
  const cookies = nookies.get(ctx);
  if (cookies._eduflix !== undefined) {
    return {
      redirect: {
        destination: '/backoffice/dashboard',
        permanent: false,
      },
    };
  }
  return {
    props: {
      cookies,
      apiUrl: Sess.http.apiUrl,
      otpLength: 4,
    },
  };
}

export default Index;
