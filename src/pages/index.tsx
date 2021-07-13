import { NextPageContext } from 'next';
import React, { useState } from 'react';
import { Drawer, message } from 'antd';
import ButtonFE from 'components/Common/ButtonFE';
import helper from 'lib/helper';

interface iDashboard {}

const Dashboard: React.FC<iDashboard> = ({}) => {
  const [isShowDrawer, setIsShowDrawer] = useState<boolean>(false);

  const handleValidTicket = (event: any) => {
    event.preventDefault();
    let kode = event.target.kodeTiket;
    if (!helper.isEmpty(kode.value)) {
      message.error('kode tiket tidak boleh kosong');
      kode.focus();
      return;
    }
    message
      .loading('tunggu sebentar..', 2.5)
      .then(() => message.success('tiket valid', 2.5))
      .then(() => setIsShowDrawer(true));
  };

  return (
    <div
      className="min-h-screen flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover relative items-center"
      style={{
        backgroundImage:
          'url(https://images.unsplash.com/photo-1525302220185-c387a117886e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
      }}
    >
      <div className="absolute bg-black opacity-60 inset-0" />
      <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2">
            <span className="h-px w-16 bg-gray-300" />
            <span className="text-gray-500 font-normal">Selamat datang di</span>
            <span className="h-px w-16 bg-gray-300" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">smkn 1 bandung</h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={(e) => handleValidTicket(e)} method="POST">
          <div className="relative">
            <div className="absolute right-0 mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mt-5 h-6 w-6 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <label className="text-md font-bold text-gray-700 tracking-wide">Masukan kode tiket anda</label>
            <input
              name="kodeTiket"
              autoFocus={true}
              className=" w-full text-base text-md py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
              placeholder="contoh : xxxxxxxxxx"
            />
          </div>

          <div className="flex items-center justify-between">
            <span className="text-gray-500 font-normal">
              anda dapat mengubungi pihak sekolah apabila lupa kode tiketnya
            </span>
          </div>
          <div>
            <ButtonFE title="Lanjutkan" />
          </div>
        </form>
      </div>
      <Drawer
        className="transition delay-700 duration-300 ease-in-out"
        zIndex={100}
        placement="right"
        width={'auto'}
        height="auto"
        closeIcon=""
        bodyStyle={{ padding: '0px' }}
        visible={isShowDrawer}
      >
        <div
          className="min-h-screen flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover relative items-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1525302220185-c387a117886e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
          }}
        >
          <div className="absolute bg-black opacity-60 inset-0 z-0" />
          <div className="max-w-md w-full space-y-8 p-10 bg-white rounded-xl z-10">
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2">
                <span className="h-px w-16 bg-gray-300" />
                <span className="text-gray-500 font-normal">Informasi data diri</span>
                <span className="h-px w-16 bg-gray-300" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">annashrul yusuf</h2>
            </div>

            <div className="space-y-6">
              <table>
                <thead>
                  <tr className="font-bold">
                    <td>Sekolah</td>
                    <td>: smkn 1 bandung</td>
                  </tr>
                  <tr className="font-bold">
                    <td>Kelas</td>
                    <td>: xii</td>
                  </tr>
                  <tr className="font-bold">
                    <td>Jenis kelamin</td>
                    <td>: perempuan</td>
                  </tr>
                </thead>
              </table>
              <div className="flex items-center justify-between border-t border-gray-300">
                <span className="text-gray-500 font-normal mt-2">
                  anda dapat mengubungi pihak sekolah apabila terjadi ke keliruan pada informasi ini
                </span>
              </div>
              <div>
                <ButtonFE title="Lanjutkan" onClick={() => setIsShowDrawer(false)} />
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  return { props: {} };
}

export default Dashboard;
