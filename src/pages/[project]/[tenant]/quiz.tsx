import { NextPageContext } from 'next';
import React, { useState, useEffect } from 'react';
import { iQuiz } from 'lib/interface';
import { Button, message } from 'antd';
import 'antd/dist/antd.css';
import _ from 'lodash';
import helper from 'lib/helper';

interface iGetQuiz {
  response: iQuiz;
}
export type Quiz = {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: [string];
};

export type QuizResponse = {
  response_code: number;
  results: Quiz[];
};

const answer = [true, false];

const Tenant: React.FC<{ initial?: QuizResponse }> = ({ initial }) => {
  const [indexQuiz, setIndexQuiz] = useState(0);
  const [selectedQuiz, setSelectedQuiz] = useState(1000);
  const [quizzes, setQuizzes] = useState(initial);
  const [quizChoice, setQuizChoice] = useState([{ question: '', answer: false }]);
  const [counter, setCounter] = React.useState(0);
  const [startTimer, setStartTimer] = React.useState(false);
  const [inCorrectAnswer, setIncorrectAnswer] = React.useState([]);
  const [finish, setFinish] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const fetchData = async (): Promise<void> => {
    setLoading(true);
    const res = await fetch('https://opentdb.com/api.php?amount=2&type=boolean');
    res
      .json()
      .then((res) => {
        setQuizzes(res);
        setLoading(false);
      })
      .catch((err) => setLoading(false));
    setStartTimer(false);
    setCounter(180);
    setFinish(false);
    setSelectedQuiz(1000);
    setIndexQuiz(0);
    setQuizChoice([{ question: '', answer: false }]);
  };
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
    fetchData();
  }, []);

  const handleChoice = (key: number) => {
    let data = quizChoice;
    let soal = quizzes?.results[indexQuiz].question;
    // let inAnswer = inCorrectAnswer;

    console.log('jawaban yang benar', quizzes?.results[indexQuiz].incorrect_answers.toString());
    // setTempAnswer();
    setSelectedQuiz(key);
    if (quizChoice[0].question === '') {
      console.log('ditimpa');
      setQuizChoice([{ question: soal ? soal.toString() : '', answer: answer[key] }]);
      return;
    }
    if (soal === quizChoice[indexQuiz]?.question && quizChoice[indexQuiz]?.answer === answer[key]) {
      console.log('soal dan jawaban sama');
      return;
    } else if (soal === quizChoice[indexQuiz]?.question && quizChoice[indexQuiz]?.answer !== answer[key]) {
      console.log(
        'soal sama jawaban sebelum = ' + quizChoice[indexQuiz].answer + ' dan diganti dengan jawaban ' + answer[key],
      );
      Object.assign(data[indexQuiz], { question: soal ? soal.toString() : '', answer: answer[key] });
    } else {
      console.log('push array');
      data.push({ question: soal ? soal.toString() : '', answer: answer[key] });
    }

    console.log(data);
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
            <span className="text-xs w-full items-center justify-center">{val ? 'Benar' : 'Salah'}</span>
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
                {finish ? 'HASIL QUIZ' : ` soal ${indexQuiz + 1} / ${quizzes?.results.length}`}
              </span>
              <span className="h-px w-16 bg-gray-300" />
            </div>
            <div className="grid grid-cols-1 gap-2 w-full max-w-screen-sm mt-2">
              {!finish && (
                <span className="text-primary-600 text-xs">
                  {loading ? 'tunggu sebentar ......' : _.unescape(quizzes?.results[indexQuiz].question)}
                </span>
              )}
              {!finish &&
                answer.map((val, key) => {
                  return <>{temp(key, val)}</>;
                })}

              {finish && (
                <>
                  {quizChoice.map((res, key) => {
                    if (`${res.answer}`.toLowerCase() === `${quizzes?.results[key].correct_answer}`.toLowerCase()) {
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
            </div>
            <div className="flex mt-10">
              <div className="w-full items-center justify-center">
                {finish && (
                  <div className="flex items-center justify-center">
                    <Button
                      loading={loading}
                      onClick={() => {
                        if (finish) {
                          fetchData();
                          return;
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
                      if (selectedQuiz !== 1000) {
                        setSelectedQuiz(1000);
                        let i = indexQuiz;
                        if (quizzes) {
                          if (quizzes.results.length - 1 > indexQuiz) {
                            i++;
                            setIndexQuiz(i);
                            return;
                          }
                        }
                        setFinish(true);
                        setIndexQuiz(0);
                        setCounter(0);
                        setStartTimer(false);
                      } else {
                        message.error('silahkan pilih jawaban anda');
                      }
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
  let response: any = [];
  // try {
  //   const getDetail = await httpService.get(httpService.apiUrl + `question`);
  //   if (getDetail.status === 200) {
  //     response = getDetail.data.result;
  //   } else {
  //     response = [];
  //   }
  // } catch (err) {}
  // console.log('#######################################', response);

  return {
    props: { response },
  };
}

export default Tenant;
