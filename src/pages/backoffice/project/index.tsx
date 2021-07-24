import React, { useState, useEffect } from 'react';
import Layout from 'Layouts';
import Api from 'lib/httpService';
import { iQuestion, iPagin } from 'lib/interface';
import nookies from 'nookies';
import { NextPageContext } from 'next';
import httpService from 'lib/httpService';
import { handleGet } from 'lib/handleAction';
import { PlusOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import helper from 'lib/helper';
import MPagination from 'components/Common/MPagination';

interface iProject {
  datum: any;
}

const Project: React.FC<iProject> = (datum) => {
  const [data, setData] = useState<Array<iQuestion>>(datum.datum.data);
  const [pagin, setPagin] = useState<iPagin>(datum.datum);
  const [any, setAny] = useState('');
  const [numPagin, setNumPagin] = useState(1);

  const handleGets = async () => {
    let url: string = `question?page=${numPagin}`;
    if (any !== '') url += `&q=${any}`;
    await handleGet(
      Api.apiClient + url,
      (data: any) => {
        console.log('handle get');
        setData(data.data);
        setPagin(data);
      },
      false,
    );
  };

  useEffect(() => {
    handleGets();
  }, [any, numPagin]);

  return (
    <Layout title="Question">
      <div className="container mx-auto grid mb-20">
        <div className="flex justify-between">
          <div>
            <h2 className="mt-6 text-2xl align-middle font-semibold text-gray-700 dark:text-gray-200">Pertanyaan</h2>
          </div>
        </div>
        <div className=" rounded">
          <div className={'mt-4 flex  flex-row'}>
            <div className="flex relative lg:w-1/4 sm:w-1/2 mr-5">
              <input
                className="block w-full mt-1 px-3 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-none  dark:text-gray-300"
                placeholder="Cari disini"
                value={any}
                type="search"
                onChange={(event) => {
                  event.preventDefault();
                  // setAny(event.target.value);
                }}
              />
              <button
                className="px-8 rounded-r-lg bg-old-gold  text-gray-800 font-bold p-3 mt-1 uppercase border-yellow-500 border-t border-b border-r"
                onClick={(event) => {
                  event.preventDefault();
                  handleGets();
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

            <button
              className="px-8 rounded-lg bg-old-gold  text-gray-800 font-bold p-3 mt-1 uppercase border-yellow-500 border-t border-b border-r"
              onClick={(event) => {
                event.preventDefault();
              }}
            >
              <PlusOutlined style={{ color: 'white', fontSize: '16px' }} />
            </button>
          </div>
          <br />
          <div className="w-full overflow-x-auto">
            <table className="rounded-t-lg m-5 w-full mx-auto bg-gray-800 text-gray-200">
              <thead>
                <tr className="text-left border-b border-gray-300">
                  <th className="px-4 py-3" style={{ width: '1%' }}>
                    No
                  </th>

                  <th className="px-4 py-3">Pertanyaan</th>
                  <th className="px-4 py-3" style={{ width: '1%' }}>
                    #
                  </th>
                </tr>
              </thead>
              <tbody>
                {data?.length > 0 ? (
                  data.map((item: iQuestion, i: number) => {
                    return (
                      <tr className="bg-gray-700 border-b border-gray-600" key={i}>
                        <td className="px-4 py-4">{helper.generateNo(i, pagin?.current_page)}</td>

                        <td className="px-4 py-4">{item.question}</td>
                        <td className="px-4 py-4">
                          <div className="flex flex-row">
                            <span className="cursor-pointer">
                              <FormOutlined style={{ color: 'white', fontSize: '20px', marginRight: '5px' }} />
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
                      <img className="w-full" src={`${httpService.noData}`} />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <br />
          <MPagination
            count={pagin?.per_page}
            page={numPagin}
            totalPage={Math.ceil((pagin === undefined ? 0 : pagin.total) / (pagin === undefined ? 0 : pagin.per_page))}
            onNext={() => {
              console.log('onNext');
              setNumPagin(numPagin + 1);
            }}
            onPrev={() => {
              console.log('onPrev');
              setNumPagin(numPagin - 1);
            }}
            handlGotoPage={(pageN) => {
              console.log('handlGotoPage');
              setNumPagin(pageN);
            }}
          />
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const cookies = nookies.get(ctx);
  if (!cookies._eduflix) {
    return { redirect: { destination: '/backoffice/auth', permanent: false } };
  } else {
    httpService.axios.defaults.headers.common['Authorization'] = helper.decode(cookies._eduflix);
  }
  let datum: any = [];

  try {
    const getDetail = await httpService.get(httpService.apiUrl + `question`);
    if (getDetail.status === 200) {
      datum = getDetail.data.result;
    } else {
      datum = [];
    }
  } catch (err) {
    console.log('#########ERROR ANYING###############', err);
  }

  return {
    props: { datum }, // will be passed to the page component as props
  };
}

export default Project;
