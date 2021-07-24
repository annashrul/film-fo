import React, { useState } from 'react';
import { iProject } from 'lib/interface';
import httpService from 'lib/httpService';
import { FormOutlined, DeleteOutlined, DownSquareOutlined } from '@ant-design/icons';
import helper from 'lib/helper';
import { NextPage } from 'next';
import useSWR from 'swr';
import { Tooltip, Empty } from 'antd';
import 'antd/dist/antd.css';
import dynamic from 'next/dynamic';
const MHeader = dynamic(() => import('components/Common/MHeader'), { ssr: false });
const Layout = dynamic(() => import('Layouts'), { ssr: false });
const MPagination = dynamic(() => import('components/Common/MPagination'), { ssr: false });

const ProjectPage: NextPage = () => {
  const [act, setAct] = useState('');
  const [any, setAny] = useState('');
  const [numPagin, setNumPagin] = useState(1);

  let url = httpService.apiClient + `project?page=${numPagin}&perpage=10`;
  if (act !== 'change') {
    if (any !== '') {
      url += `&q=${any}`;
    }
  }
  const { data, error } = useSWR(url);
  return (
    <Layout title="Project">
      <div className="grid mb-20">
        <MHeader
          callback={(res) => {
            console.log(res);
            setAct(res.act);
            setAny(res.value);
          }}
          pathForm="project"
        />

        <div className="rounded">
          <div className="w-full overflow-x-auto">
            <table className="rounded-t-lg  w-full mx-auto bg-gray-800 text-gray-200">
              <thead>
                <tr className="text-left border-b border-gray-300">
                  <th className="px-4 py-3" style={{ width: '1%' }}>
                    No
                  </th>
                  <th className="px-4 py-3" style={{ width: '1%' }}></th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3" style={{ width: '1%' }}>
                    Poster
                  </th>
                  <th className="px-4 py-3" style={{ width: '1%' }}>
                    Video
                  </th>
                  <th className="px-4 py-3" style={{ width: '1%' }}>
                    Durasi
                  </th>
                  <th className="px-4 py-3" style={{ width: '1%' }}>
                    Tenant
                  </th>
                  <th className="px-4 py-3" style={{ width: '1%' }}>
                    Penonton
                  </th>
                  <th className="px-4 py-3" style={{ width: '1%' }}>
                    Kategori
                  </th>
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
                ) : data?.data.result.data?.length > 0 ? (
                  data?.data.result.data.map((item: iProject, i: number) => {
                    return (
                      <tr className="bg-gray-700 border-b border-gray-600" key={i}>
                        <td className="px-4 py-3">{helper.generateNo(i, data?.data.result.current_page)}</td>
                        <td className="px-4 py-3">
                          <div className="flex flex-row">
                            <span className="cursor-pointer">
                              <Tooltip placement="left" title={`detail`}>
                                <DownSquareOutlined style={{ color: 'white', fontSize: '20px', marginRight: '10px' }} />
                              </Tooltip>
                            </span>
                            <span className="cursor-pointer">
                              <Tooltip placement="left" title={`ubah`}>
                                <FormOutlined style={{ color: 'white', fontSize: '20px', marginRight: '10px' }} />
                              </Tooltip>
                            </span>

                            <span className="cursor-pointer">
                              <Tooltip placement="left" title={`hapus`}>
                                <DeleteOutlined style={{ color: 'white', fontSize: '20px' }} />
                              </Tooltip>
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3">{item.title}</td>
                        <td className="px-4 py-3">{item.poster}</td>
                        <td className="px-4 py-3">{item.video}</td>
                        <td className="px-4 py-3">{item.durasi}</td>
                        <td className="px-4 py-3 text-right">{item.total_tenant}</td>
                        <td className="px-4 py-3 text-right">{item.total_penonton}</td>
                        <td className="px-4 py-3">{item.category}</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={12}>
                      <Empty
                        description="data tidak tersedia"
                        style={{ color: 'white' }}
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                      />
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

export default ProjectPage;
