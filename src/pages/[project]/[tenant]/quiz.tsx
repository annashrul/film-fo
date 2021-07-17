import { NextPageContext } from 'next';
import React, { useState, useEffect } from 'react';
import { iQuestion } from 'lib/interface';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import helper from 'lib/helper';
import httpService from 'lib/httpService';
import nookies from 'nookies';
import { handleGet } from 'lib/handleAction';

export type QuizResponse = {
  data: any;
};

const Tenant: React.FC<QuizResponse> = ({ data }) => {
  const [indexQuiz, setIndexQuiz] = useState(0);
  const [selectedQuiz, setSelectedQuiz] = useState(1000);
  const [dataQuiz, setDataQuiz] = useState<Array<iQuestion>>([]);
  const [quizChoice, setQuizChoice] = useState([{ question: '', answer: '' }]);
  const [counter, setCounter] = React.useState(0);
  const [startTimer, setStartTimer] = React.useState(false);

  const [finish, setFinish] = React.useState(false);

  useEffect(() => {
    if (counter > 0) {
      const timer = setInterval(() => setCounter(counter - 1), 1000);

      return () => clearInterval(timer);
    }

    if (counter === 0 && startTimer) {
      setStartTimer(false);
    }
  }, [counter, startTimer]);

  useEffect(() => {
    setDataQuiz(data);
  }, [dataQuiz]);

  const handleChoice = (key: number) => {
    let data = quizChoice;
    let soal = dataQuiz[indexQuiz].question;
    console.log('jawaban yang benar', dataQuiz[indexQuiz].choise[key].answer_right);
    setSelectedQuiz(key);
    if (quizChoice[0].question === '') {
      console.log('ditimpa');
      setQuizChoice([{ question: soal ? soal.toString() : '', answer: dataQuiz[indexQuiz].choise[key].answer_right }]);
      return;
    }
    if (
      soal === quizChoice[indexQuiz]?.question &&
      quizChoice[indexQuiz]?.answer === dataQuiz[indexQuiz].choise[key].answer_right
    ) {
      console.log('soal dan jawaban sama');
      return;
    } else if (
      soal === quizChoice[indexQuiz]?.question &&
      quizChoice[indexQuiz]?.answer !== dataQuiz[indexQuiz].choise[key].answer_right
    ) {
      console.log(
        'soal sama jawaban sebelum = ' +
          quizChoice[indexQuiz].answer +
          ' dan diganti dengan jawaban ' +
          dataQuiz[indexQuiz].choise[key].answer_right,
      );
      Object.assign(data[indexQuiz], {
        question: soal ? soal.toString() : '',
        answer: dataQuiz[indexQuiz].choise[key].answer_right,
      });
    } else {
      console.log('push array');
      data.push({ question: soal ? soal.toString() : '', answer: dataQuiz[indexQuiz].choise[key].answer_right });
    }

    setQuizChoice(data);
    return;
  };
  const temp = (key: any, val: any) => {
    return (
      <div onClick={() => !finish && handleChoice(key)} key={key}>
        <label
          className={`flex flex-col p-3 ${
            selectedQuiz === key || finish ? 'answer-selected' : 'answer-not-selected'
          } cursor-pointer shadow rounded-xl`}
        >
          <div className="flex">
            <span className="text-xs w-full items-center justify-center">{val.answer}</span>
            {selectedQuiz === key || finish ? (
              <span className="text-xs w-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </span>
            ) : null}
          </div>
        </label>
      </div>
    );
  };

  let nilai: number = 0;

  return (
    <div className="min-h-screen bg-gray-100 px-6 flex flex-col justify-center ">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:-rotate-6 rounded-3xl"></div>
        <div className="relative px-4 py-5 bg-white shadow rounded-xl sm:p-10">
          <div className="max-w-md mx-auto">
            <div className="flex items-center justify-center">
              <span className="h-px w-16 bg-gray-300" />
              <span className="text-gray-500 font-normal">
                {finish ? 'HASIL QUIZ' : ` soal ${indexQuiz + 1} / ${dataQuiz.length}`}
              </span>
              <span className="h-px w-16 bg-gray-300" />
            </div>
            <div className="grid grid-cols-1 gap-2 w-full max-w-screen-sm mt-2">
              {dataQuiz ? (
                dataQuiz.length > 0 ? (
                  <>
                    {!finish && <span className="text-primary-600 text-xs">{dataQuiz[indexQuiz].question}</span>}
                    {!finish &&
                      dataQuiz[indexQuiz].choise.map((val, key) => {
                        return <>{temp(key, val)}</>;
                      })}
                    {finish && (
                      <>
                        {quizChoice.map((res, key) => {
                          if (
                            `${res.answer}`.toLowerCase() ===
                            `${dataQuiz[indexQuiz].choise[key].is_right}`.toLowerCase()
                          ) {
                            nilai += 50;
                          } else {
                            nilai = 0;
                          }
                          return null;
                        })}
                        <p className="flex flex-col items-center justify-center">
                          <img
                            src={`${
                              helper.nilaiAkhir(nilai)
                                ? 'https://i02.appmifile.com/716_bbs_en/17/07/2020/fbfd3d4d29.gif'
                                : 'https://i.pinimg.com/originals/71/c7/60/71c76025a232b42e8a458ac1656cab65.gif'
                            }`}
                            className="h-20"
                          />
                          nilai kamu : {nilai}
                        </p>
                      </>
                    )}
                  </>
                ) : (
                  ''
                )
              ) : (
                ''
              )}
            </div>

            <div className="flex mt-10">
              <div className="w-full items-center justify-center">
                {finish && (
                  <div className="flex items-center justify-center">
                    <Button
                      onClick={() => {
                        if (finish) {
                          setDataQuiz(data);
                          setStartTimer(false);
                          setCounter(180);
                          setFinish(false);
                          setSelectedQuiz(1000);
                          setIndexQuiz(0);
                          setQuizChoice([{ question: '', answer: '' }]);
                        }
                      }}
                      size="large"
                      type="primary"
                    >
                      Ulangi lagi
                    </Button>
                  </div>
                )}
                {!finish && (
                  <Button size="large" type="default">
                    {counter}
                  </Button>
                )}
              </div>
              {!finish && (
                <div className="w-auto text-right">
                  <Button
                    size="large"
                    type="primary"
                    onClick={() => {
                      // if (selectedQuiz !== 1000) {
                      setSelectedQuiz(1000);
                      let i = indexQuiz;
                      if (dataQuiz) {
                        if (dataQuiz.length - 1 > indexQuiz) {
                          i++;
                          setIndexQuiz(i);
                          return;
                        }
                      }
                      setFinish(true);
                      setIndexQuiz(0);
                      setCounter(0);
                      setStartTimer(false);
                      // } else {
                      //   message.error('silahkan pilih jawaban anda');
                      // }
                    }}
                  >
                    {'Lanjutkan'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  const cookies = nookies.get(ctx);
  if (!cookies._eduflix) {
    return { redirect: { destination: '/', permanent: false } };
  } else {
    httpService.axios.defaults.headers.common['Authorization'] = helper.decode(cookies._eduflix);
  }
  let data: any = [];
  try {
    const getDetail = await httpService.get(httpService.apiUrl + `question`);
    if (getDetail.status === 200) {
      data = getDetail.data.result.data;
    } else {
      data = [];
    }
  } catch (err) {}

  return {
    props: { data }, // will be passed to the page component as props
  };
}

export default Tenant;
