import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Tooltip, Breadcrumb } from 'antd';
import 'antd/dist/antd.css';

type Props = {
  callback: (res: any) => void;
  pathForm: string;
};

const MHeader = (props: Props) => {
  const [any, setAny] = useState('');
  const handleSearch = (value: string, act: string) => {
    setAny(value);
    props.callback({ act: act, val: value });
  };
  return (
    <div>
      <div className="mt-4">
        <Breadcrumb separator=">">
          <Breadcrumb.Item href="" className="text-gray-50">
            <span className="text-gray-400">Eduflix</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>
            <span className="text-gray-50">project</span>
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className={'mt-4 flex  flex-row'}>
        <div className="flex relative lg:w-1/4 sm:w-1/2 mr-5">
          <input
            className="block w-full mt-1 px-3 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-none  dark:text-gray-300"
            placeholder="Cari disini"
            value={any}
            type="search"
            inputMode="search"
            onKeyUp={(event) => {
              if (event.keyCode === 13) {
                event.preventDefault();
                handleSearch(any, 'enter');
              }
            }}
            onChange={(event) => {
              event.preventDefault();
              handleSearch(event.target.value, 'change');
            }}
          />
          <button
            className="px-8 rounded-r-lg bg-old-gold  text-gray-800 font-bold p-3 mt-1 uppercase border-yellow-500 border-t border-b border-r"
            onClick={(event) => {
              event.preventDefault();
              setAny(any);
            }}
          >
            <svg
              className="text-gray-200 h-4 w-4 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              version="1.1"
              id="Capa_1"
              x="0px"
              y="0px"
              viewBox="0 0 56.966 56.966"
              xmlSpace="preserve"
              width="512px"
              height="512px"
            >
              <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
            </svg>
          </button>
        </div>
        <Tooltip title="tambah data">
          <button
            className="px-8 rounded-lg bg-old-gold  text-gray-800 font-bold p-3 mt-1 uppercase border-yellow-500 border-t border-b border-r"
            onClick={(event) => {
              event.preventDefault();
            }}
          >
            <PlusOutlined style={{ color: 'white', fontSize: '16px' }} />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default MHeader;
