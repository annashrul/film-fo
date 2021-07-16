import React, { useState, useEffect                                                              } from "react";
import "react-intl-tel-input/dist/main.css";
import Layout from 'Layouts'
import Api from 'lib/httpService';
import Helper from 'lib/helper';
import {iQuiz,iPagin} from 'lib/interface';
import { Pagination } from '@windmill/react-ui'
import moment from 'moment'
import nookies from 'nookies'
import { NextPageContext } from 'next'
import { handleGet } from "lib/handleAction";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import httpService from "lib/httpService";
// import Mutasi from 'components/transaksi/mutasi_row'

interface iQuestionPage {
    datum: any;
}


const QuestionPage: React.FC<iQuestionPage> = (datum) =>{
    const [datumQuestion,setDatumQuestion]= useState<Array<iQuiz>>([]);
    const [arrData, setArrData] = useState<iPagin>();
    const [datefrom,setDatefrom]=useState(moment(new Date()).format("MM/DD/yyyy"));
    const [dateto,setDateto]=useState(moment(new Date()).format("MM/DD/yyyy"));
    const [any,setAny]=useState("");
        const [hitFirst,setHitFirst]=useState(1);

    useEffect(() => {
         setDatumQuestion(datum.datum.data);
        setArrData(datum.datum);
        // handleLoadData(`page=1&datefrom=${datefrom}&dateto=${dateto}&perpage=10`);
    }, []);

   
    const handleLoadData = async (val: string) => {
        let url = Api.apiClient+`question`;
        if(val!==null){
            url+=`?${val}`;
        }
        await handleGet(url,(datum)=>{
            setDatumQuestion(datum.data);
            setArrData(datum);
        })
       
    }

    const handleSearch=()=>{
        let where = "";
        if(any!==''){
            where+=`&q=${btoa(any)}`;
        }
        handleLoadData(`page=1${where}`);
    }
    const handlePage=(pagenum:string)=>{
        if (hitFirst === 0) {
             if (any !== '') {
                handleLoadData(`page=${pagenum}&q=${btoa(any)}&datefrom=${datefrom}&dateto=${dateto}&perpage=10`);
            }
        }
       
    }
    const handleEvent=(event:any,picker:any)=>{
        console.log(event);
        const from = moment(picker.startDate._d).format('YYYY-MM-DD');
        const to = moment(picker.endDate._d).format('YYYY-MM-DD');
        setDatefrom(moment(picker.startDate._d).format('MM/DD/yyyy'));
        setDateto(moment(picker.endDate._d).format('MM/DD/yyyy'));
        handleLoadData(`page=1&datefrom=${from}&dateto=${to}&perpage=10`);
    }

    return (
        <Layout title="Question">
            <div className="container mt-6 px-2 lg:px-7 mx-auto grid mb-20">
                <div className="flex justify-between">
                    <div>
                        <h2 className="mt-6 text-2xl align-middle font-semibold text-gray-700 dark:text-gray-200">
                            Question
                        </h2>
                    </div>
                </div>
                <div className="shadow-md rounded my-6">
                    <div className={"mt-4 flex"}>
                        <DateRangePicker onApply={handleEvent}>
                            <input type="text" readOnly={true} className="block w-full mt-1 px-3 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-none  dark:text-gray-300 div-input" value={`${datefrom} - ${dateto}`}/>
                        </DateRangePicker>
                        <input 
                            className="block w-full mt-1 px-3 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-none  dark:text-gray-300 div-input" 
                            placeholder="Cari disini" 
                            value={any}
                            onChange={(event)=>setAny(event.target.value)}
                            onKeyPress={event=>{if(event.key==='Enter'){handleSearch();}}}
                        />
                        <button 
                            className="px-8 rounded-r-lg bg-old-gold  text-gray-800 font-bold p-3 mt-1 uppercase border-yellow-500 border-t border-b border-r"
                            onClick={(event)=>{event.preventDefault();handleSearch()}}
                            >
                            <svg className="text-gray-200 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 56.966 56.966"  xmlSpace="preserve" width="512px" height="512px">
                                <path d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z" />
                            </svg>
                        </button>
                    </div>
                <br/>
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
                            {
                            datumQuestion?.length>0?datumQuestion.map((item:iQuiz,i:number)=>{
                                    return(
                                    <tr className="bg-gray-700 border-b border-gray-600">
                                        <td className="px-4 py-4"><button type="button">ACTION</button></td>
                                        <td className="px-4 py-4">{item.slug_project}</td>
                                        <td className="px-4 py-4">{item.id_project}</td>
                                        <td className="px-4 py-4">{item.question}</td>
                                    </tr>
                                    );
                                }):<tr><td colSpan={12}><img className="w-full" src={`${httpService.noData}`}/></td></tr>
                            }
                        </tbody>
                    </table>
                    </div>
                    <br/>
                    <Pagination
                        totalResults={arrData===undefined?0:arrData.total}
                        resultsPerPage={arrData===undefined?0:arrData.per_page}
                        onChange={() => {setHitFirst(0);handlePage}}
                        label="Page navigation"
                    />
                </div>
            </div>
        </Layout>
      );
}
export async function getServerSideProps(ctx:NextPageContext) {
    const cookies = nookies.get(ctx)
    if(!cookies._prowara_bo){
        return {
          redirect: {
              destination: '/backoffice/auth/login',
              permanent: false,
          },
        }
    }else{
        // Api.axios.defaults.headers.common["Authorization"] = Helper.decode(cookies._prowara);
    }
    //   const getData = await Api.get(Api.apiUrl +`question?page=1&datefrom=${moment(new Date()).format('YYYY-MM-DD')}&dateto=${moment(new Date()).format('YYYY-MM-DD')}`);
let datum=[];
  try {
      const getData = await Api.get(Api.apiUrl +`question?page=1&datefrom=${moment(new Date()).format('YYYY-MM-DD')}&dateto=${moment(new Date()).format('YYYY-MM-DD')}`);
    if(getData.status===200){
        datum = getData.data.result;
    }else{
      datum=[];
    }
  } catch (err) {
        

  }
    return { 
        props:{datum}
    }
}


export default QuestionPage;