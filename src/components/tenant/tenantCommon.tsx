import React from 'react';
export const widgetHeader = (title = 'selamat datang di', desc = '') => {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center">
        <span className="h-px w-16 bg-gray-300" />
        <span className="text-gray-500 font-normal">{title}</span>
        <span className="h-px w-16 bg-gray-300" />
      </div>
      <div className="flex items-center justify-center">
        <img
          className="h-8 mr-3 text-center"
          src="https://rekreartive.com/wp-content/uploads/2019/04/Logo-Tut-Wuri-Handayani-PNG-Warna.png"
        />
      </div>

      <h2 className="text-2xl text-gray-900">{desc}</h2>
    </div>
  );
};

export const widgetFirst = (
  label: string,
  value: string,
  onChange: (e: any) => void,
  other: any = '',
  desc: string = 'anda dapat mengubungi pihak sekolah apabila menemukan kendala',
) => {
  return (
    <div className="mt-8 space-y-6">
      <div className="relative">
        {/* {other} */}

        <label className="text-md text-gray-700 tracking-wide">{label}</label>
        <input
          name="kodeTiket"
          autoFocus={true}
          className=" w-full text-base text-md py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
          // className=" w-full text-base text-md py-2 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
          placeholder="contoh : xxxxxxxxxx"
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />
      </div>

      <div className="flex items-center justify-between">
        <span className="text-gray-500 font-normal">{desc}</span>
      </div>
    </div>
  );
};
export const widgetTwo = (response: any) => {
  return (
    <div className="space-y-6">
      <table>
        <thead>
          <tr className="text-green-600">
            <td width="30%">Nama</td>
            <td width="1%">: </td>
            <td className="text-left">{response?.fullname}</td>
          </tr>
          <tr className="text-green-600">
            <td width="30%">Kelas</td>
            <td width="1%">: </td>
            <td className="text-left">{response?.kelas}</td>
          </tr>
          <tr className="text-green-600">
            <td width="40%">Jenis kelamin</td>
            <td width="1%">: </td>
            <td className="text-left">{response?.jenis_kelamin === 0 ? 'Laki laki' : 'Perempuan'}</td>
          </tr>
          <tr className="text-green-600">
            <td width="40%">Film</td>
            <td width="1%">: </td>
            <td className="text-left">{response.project}</td>
          </tr>
          <tr className="text-green-600">
            <td width="40%">Tiket</td>
            <td width="1%">: </td>
            <td className="text-left">{response?.ticket}</td>
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
