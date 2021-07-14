import React from 'react';

interface iButton {
  title: string;
  desc?: string;
  children?: React.ReactChild;
}
const WrapperAuth: React.FC<iButton> = ({ title, desc, children }) => {
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
            <span className="text-gray-500 font-normal">{title}</span>
            <span className="h-px w-16 bg-gray-300" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900">{desc}</h2>
        </div>
        {children}
      </div>
    </div>
  );
};
export default WrapperAuth;
