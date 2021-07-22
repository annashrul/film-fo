import React, { useState, useEffect } from 'react';
import Layout from 'Layouts';
import Api from 'lib/httpService';
import { iQuestion, iPagin } from 'lib/interface';
import { Pagination } from '@windmill/react-ui';
import moment from 'moment';
import nookies from 'nookies';
import { NextPageContext } from 'next';
import { Modal } from 'rsuite';

import httpService from 'lib/httpService';
import { handleGet } from 'lib/handleAction';
import { Collapse, Select } from 'antd';
import { PlusOutlined, SettingOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
const { Panel } = Collapse;
const { Option } = Select;
interface iQuestionPage {
  datum: any;
}

const QuestionPage: React.FC<iQuestionPage> = (datum) => {
  const [datumQuestion, setDatumQuestion] = useState<Array<iQuestion>>([]);
  const [arrData, setArrData] = useState<iPagin>();
  const [datefrom, setDatefrom] = useState(moment(new Date()).format('MM/DD/yyyy'));
  const [dateto, setDateto] = useState(moment(new Date()).format('MM/DD/yyyy'));
  const [any, setAny] = useState('');
  const [hitFirst, setHitFirst] = useState(1);

  useEffect(() => {
    console.log('asdasd', datum.datum);
    // if ('serviceWorker' in navigator) {
    //   window.addEventListener('load', function () {
    //     navigator.serviceWorker.register('/sw.js').then(
    //       function (registration) {
    //         console.log(registration);
    //         console.log('Service Worker registration successful with scope: ', registration.scope);
    //       },
    //       function (err) {
    //         console.log('Service Worker registration failed: ', err);
    //       },
    //     );
    //   });
    // }

    setDatumQuestion(datum.datum);
    setArrData(datum.datum);
    handleLoadData('');
    // handleLoadData(`page=1&datefrom=${datefrom}&dateto=${dateto}&perpage=10`);
  }, []);

  const handleLoadData = async (val: string) => {
    let url = Api.apiClient + `question`;
    if (val !== null) {
      url += `?${val}`;
    }
    // await handleGet(url, (datum) => {
    //   console.log(datum);
    //   setDatumQuestion(datum.data);
    //   setArrData(datum);
    // });
  };

  const handleSearch = () => {
    let where = '';
    if (any !== '') {
      where += `&q=${btoa(any)}`;
    }
    handleLoadData(`page=1${where}`);
  };
  const handlePage = (pagenum: string) => {
    if (hitFirst === 0) {
      if (any !== '') {
        handleLoadData(`page=${pagenum}&q=${btoa(any)}&datefrom=${datefrom}&dateto=${dateto}&perpage=10`);
      }
    }
  };
  const handleEvent = (event: any, picker: any) => {
    const from = moment(picker.startDate._d).format('YYYY-MM-DD');
    const to = moment(picker.endDate._d).format('YYYY-MM-DD');
    setDatefrom(moment(picker.startDate._d).format('MM/DD/yyyy'));
    setDateto(moment(picker.endDate._d).format('MM/DD/yyyy'));
    handleLoadData(`page=1&datefrom=${from}&dateto=${to}&perpage=10`);
  };

  return (
    <Layout title="Question">
      <div className="container mx-auto grid mb-20">
        <div className="flex justify-between">
          <div>
            <h2 className="mt-6 text-2xl align-middle font-semibold text-gray-700 dark:text-gray-200">Question</h2>
          </div>
        </div>
        <div className="shadow-md rounded">
          <div className={'mt-4 flex  flex-row'}>
            <div className="flex relative w-1/4 mr-5">
              <input
                className="block w-full mt-1 px-3 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-none  dark:text-gray-300"
                placeholder="Cari disini"
                value={any}
                onChange={(event) => setAny(event.target.value)}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    handleSearch();
                  }
                }}
              />
              <button
                className="px-8 rounded-r-lg bg-old-gold  text-gray-800 font-bold p-3 mt-1 uppercase border-yellow-500 border-t border-b border-r"
                onClick={(event) => {
                  event.preventDefault();
                  handleSearch();
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
                handleSearch();
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
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">slug_project</th>
                  <th className="px-4 py-3">id_project</th>
                  <th className="px-4 py-3">question</th>
                </tr>
              </thead>
              <tbody>
                {datumQuestion?.length > 0 ? (
                  datumQuestion.map((item: iQuestion, i: number) => {
                    return (
                      <tr className="bg-gray-700 border-b border-gray-600">
                        <td className="px-4 py-4">
                          <button type="button">ACTION</button>
                        </td>
                        <td className="px-4 py-4">{item.slug_project}</td>
                        <td className="px-4 py-4">{item.id_project}</td>
                        <td className="px-4 py-4">{item.question}</td>
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
          <Pagination
            totalResults={arrData === undefined ? 0 : arrData.total}
            resultsPerPage={arrData === undefined ? 0 : arrData.per_page}
            onChange={() => {
              setHitFirst(0);
              handlePage;
            }}
            label="Page navigation"
          />
        </div>
      </div>
    </Layout>
  );
};
export async function getStaticProps(ctx: NextPageContext) {
  // console.log('######################## SERVER', ctx);

  // const cookies = nookies.get(ctx);
  // if (!cookies._eduflix) {
  //   return { redirect: { destination: '/backoffice/auth', permanent: false } };
  // } else {
  //   httpService.axios.defaults.headers.common['Authorization'] = helper.decode(cookies._eduflix);
  // }
  let datum: any = [];
  try {
    const getDetail = await httpService.get(httpService.apiUrl + `question`);
    if (getDetail.status === 200) {
      datum = getDetail.data.result.data;
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

// export async function getServerSideProps(ctx: NextPageContext) {
//   const cookies = nookies.get(ctx);
//   if (!cookies._eduflix) {
//     return { redirect: { destination: '/backoffice/auth', permanent: false } };
//   } else {
//     httpService.axios.defaults.headers.common['Authorization'] = helper.decode(cookies._eduflix);
//   }
//   let datum: any = [];
//   try {
//     const getDetail = await httpService.get(httpService.apiUrl + `question`);
//     if (getDetail.status === 200) {
//       datum = getDetail.data.result.data;
//     } else {
//       datum = [];
//     }
//   } catch (err) {
//     console.log('#########ERROR ANYING###############', err);
//   }

//   console.log('######################## SERVER');

//   return {
//     props: { datum }, // will be passed to the page component as props
//   };
// }

export default QuestionPage;
