import React, { useState } from 'react';
import { iTenant } from 'lib/interface';
import httpService from 'lib/httpService';
import { FormOutlined, DeleteOutlined, DownSquareOutlined } from '@ant-design/icons';
import helper from 'lib/helper';
import { NextPage } from 'next';
import useSWR from 'swr';
import 'antd/dist/antd.css';
import dynamic from 'next/dynamic';
const Layout = dynamic(() => import('Layouts'), { ssr: false });
const MHeader = dynamic(() => import('components/Common/MHeader'), { ssr: false });
const MPagination = dynamic(() => import('components/Common/MPagination'), { ssr: false });

const TenantPage: NextPage = () => {
  const [any, setAny] = useState('');
  const [numPagin, setNumPagin] = useState(1);
  let url = httpService.apiClient + `tenant?page=${numPagin}&perpage=10`;
  if (any !== '') url += `&q=${any}`;
  const { data, error } = useSWR(url);
  return (
    <Layout title="Tenant">
      <div className="container mx-auto grid mb-20">
        <MHeader
          callback={(res) => {
            setAny(res.value);
          }}
          pathForm="project"
        />
        <div className=" rounded">
          <div className="w-full overflow-x-auto">
            <table className="rounded-t-lg m-5 w-full mx-auto bg-gray-800 text-gray-200">
              <thead>
                <tr className="text-left border-b border-gray-300">
                  <th className="px-4 py-3" style={{ width: '1%' }}>
                    No
                  </th>

                  <th className="px-4 py-3">Project</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3" style={{ width: '1%' }}>
                    Harga
                  </th>
                  <th className="px-4 py-3" style={{ width: '1%' }}>
                    penonton
                  </th>
                  <th className="px-4 py-3">Alamat</th>
                  <th className="px-4 py-3" style={{ width: '1%' }}>
                    Status
                  </th>
                  <th className="px-4 py-3" style={{ width: '1%' }}></th>
                </tr>
              </thead>
              <tbody>
                {error ? (
                  <div>error</div>
                ) : !data ? (
                  <tr>
                    <td className="px-4 py-4" colSpan={3}>
                      tunggu sebentar ..
                    </td>
                  </tr>
                ) : data?.data.result.data.length > 0 ? (
                  data?.data.result.data.map((item: iTenant, i: number) => {
                    return (
                      <tr className="bg-gray-700 border-b border-gray-600" key={i}>
                        <td className="px-4 py-4">{helper.generateNo(i, data?.data.result.current_page)}</td>

                        <td className="px-4 py-4">{item.project}</td>
                        <td className="px-4 py-4">{item.title}</td>
                        <td className="px-4 py-4 text-right">{item.price ? item.price : 0}</td>
                        <td className="px-4 py-4 text-right">{item.total_penonton}</td>
                        <td className="px-4 py-4">{item.address}</td>
                        <td className="px-4 py-4 text-left" style={{ verticalAlign: 'left' }}>
                          <span className="bg-indigo-800 text-gray-200 text-xs tracking-wide font-semibold px-2 py-1 rounded-md">
                            Aktif
                          </span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex flex-row">
                            <span className="cursor-pointer">
                              <DownSquareOutlined style={{ color: 'white', fontSize: '20px', marginRight: '10px' }} />
                            </span>
                            <span className="cursor-pointer">
                              <FormOutlined style={{ color: 'white', fontSize: '20px', marginRight: '10px' }} />
                            </span>

                            <span className="cursor-pointer">
                              <DeleteOutlined style={{ color: 'white', fontSize: '20px' }} />
                            </span>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={12}>
                      <img className="w-full" src={`${httpService.noData}`} alt={`${httpService.noData}`} />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <br />
          <MPagination
            count={data?.data.result?.per_page}
            page={numPagin}
            totalPage={Math.ceil(
              (data?.data.result === undefined ? 0 : data?.data.result.total) /
                (data?.data.result === undefined ? 0 : data?.data.result.per_page),
            )}
            onNext={() => setNumPagin(numPagin + 1)}
            onPrev={() => setNumPagin(numPagin - 1)}
            handlGotoPage={(pageN) => setNumPagin(pageN)}
          />
        </div>
      </div>
    </Layout>
  );
};

export default TenantPage;
