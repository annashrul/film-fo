import React from 'react';

import 'antd/dist/antd.css';
import { Spin } from 'antd';

interface iButtonFE {
  title: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}
const ButtonFE: React.FC<iButtonFE> = ({ title, onClick, className = 'w-full', disabled = false }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      type="submit"
      className={`${className} ${
        disabled && 'cursor-pointer'
      } group-hover:flex justify-center bg-indigo-700 text-gray-100 p-4  rounded-full tracking-wide font-semibold  focus:outline-none focus:shadow-outline hover:bg-indigo-600 shadow-lg cursor-pointer transition ease-in duration-300`}
    >
      {title}
    </button>
  );
};
export default ButtonFE;
