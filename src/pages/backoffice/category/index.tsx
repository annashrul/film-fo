import React, { useState, useEffect                                                              } from "react";
import "react-intl-tel-input/dist/main.css";
import Layout from 'Layouts'
import Api from 'lib/httpService';
import Helper from 'lib/helper';
import {iCategory,iPagin} from 'lib/interface';
import { Pagination } from '@windmill/react-ui'
import moment from 'moment'
import nookies from 'nookies'
import { NextPageContext } from 'next'
import { handleGet } from "lib/handleAction";
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import httpService from "lib/httpService";
// import Mutasi from 'components/transaksi/mutasi_row'

interface iCategoryPage {
    datum: any;
}


const CategoryPage: React.FC<iCategoryPage> = (datum) =>{
    const [datumCategory,setDatumCategory]= useState<Array<iCategory>>([]);
    const [arrData, setArrData] = useState<iPagin>();
    const [datefrom,setDatefrom]=useState(moment(new Date()).format("MM/DD/yyyy"));
    const [dateto,setDateto]=useState(moment(new Date()).format("MM/DD/yyyy"));
    const [any,setAny]=useState("");
    const [type,setType]=useState("0");
    const [hitFirst,setHitFirst]=useState(1);

    useEffect(() => {
         setDatumCategory(datum.datum.data);
        setArrData(datum.datum);
        // handleLoadData(`page=1&datefrom=${datefrom}&dateto=${dateto}&perpage=10`);
    }, []);

   
    const handleLoadData = async (val: string) => {
        let url = Api.apiClient+`category`;
        if(val!==null){
            url+=`?${val}`;
        }
        await handleGet(url,(datum)=>{
            setDatumCategory(datum.data);
            setArrData(datum);
        })
       
    }

    const handleSearch=()=>{
        handleLoadData(`page=1&q=${btoa(any)}&type=${type}`);
    }
    const handlePage=(pagenum:string)=>{
        if (hitFirst === 0) {
             if (any !== '') {
                handleLoadData(`page=${pagenum}&q=${btoa(any)}&type=${type}&datefrom=${datefrom}&dateto=${dateto}&perpage=10`);
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
        <Layout title="Category">
            <div className="container mt-6 px-2 lg:px-7 mx-auto grid mb-20">
                <div className="flex justify-between">
                    <div>
                        <h2 className="mt-6 text-2xl align-middle font-semibold text-gray-700 dark:text-gray-200">
                            Category
                        </h2>
                    </div>
                </div>
                <div className="shadow-md rounded my-6">
                    <div className={"mt-4 flex"}>
                    <select 
                        className="block w-full mt-1 px-4 py-3 text-sm dark:border-gray-600 dark:bg-gray-700 focus:outline-none  dark:text-gray-300 div-input" 
                        value={type}
                        onChange={(event) => {
                            event.preventDefault();
                            setType(event.target.value);
                            handleSearch();
                        }}
                        // onKeyPress={event => { if (event.key === 'Enter') { handleSearch(''); } }}
                    >
                        <option value="0">NOL</option>
                        <option value="1">SATU</option>
                    </select>
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
                        <div className="flex flex-col lg:flex-row w-full lg:space-x-2 space-y-2 lg:space-y-0 mb-2 lg:mb-4">
                        {
                            datumCategory?.length>0?datumCategory.map((item:iCategory,i:number)=>{
                                    return(
                                        <div className="w-full lg:w-1/4">
                                            <div className="widget w-full p-4 rounded-lg dark:bg-grey-700 bg-white border border-gray-100 dark:border-gray-800">
                                                <div className="flex flex-row items-center justify-between">
                                                <div className="flex flex-col">
                                                    <div className="text-xs uppercase font-light text-gray-500">
                                                    {item.title}
                                                    </div>
                                                    <div className="text-xl font-bold">
                                                    {item.type}
                                                    </div>
                                                </div>
{/*                                                 
                                                <div>
                                                        <div className="dy-dropdown inline-block relative">
                                                            <button className="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
                                                            <span className="mr-1">Dropdown</span>
                                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /> </svg>
                                                            </button>
                                                            <ul className="dy-dropdown-menu absolute hidden text-gray-700 pt-1">
                                                            <li><a className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">One</a></li>
                                                            <li><a className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Two</a></li>
                                                            <li><a className="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap" href="#">Three is the magic number</a></li>
                                                            </ul>
                                                        </div>
                                                    </div> */}
                                                <div className="relative inline-flex">
                                                    <svg className="w-2 h-2 absolute top-0 right-0 m-4 pointer-events-none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 412 232"><path d="M206 171.144L42.678 7.822c-9.763-9.763-25.592-9.763-35.355 0-9.763 9.764-9.763 25.592 0 35.355l181 181c4.88 4.882 11.279 7.323 17.677 7.323s12.796-2.441 17.678-7.322l181-181c9.763-9.764 9.763-25.592 0-35.355-9.763-9.763-25.592-9.763-35.355 0L206 171.144z" fill="#648299" fillRule="nonzero" /></svg>
                                                    <select className="border border-gray-300 rounded-full text-gray-600 h-10 pl-5 pr-10 bg-white hover:border-gray-400 focus:outline-none appearance-none">
                                                        <option>ACTION</option>
                                                        <option>Red</option>
                                                        <option>Blue</option>
                                                        <option>Yellow</option>
                                                        <option>Black</option>
                                                        <option>Orange</option>
                                                        <option>Purple</option>
                                                        <option>Gray</option>
                                                        <option>White</option>
                                                    </select>
                                                </div>
                                                </div>
                                            </div>
                                            </div>

                                    );
                                }):<tr><td colSpan={12}><img className="w-full" src={`${httpService.noData}`}/></td></tr>
                            }
                        </div>
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
    //   const getData = await Api.get(Api.apiUrl +`category?page=1&datefrom=${moment(new Date()).format('YYYY-MM-DD')}&dateto=${moment(new Date()).format('YYYY-MM-DD')}`);
let datum=[];
  try {
      const getData = await Api.get(Api.apiUrl +`category?page=1&type=0&datefrom=${moment(new Date()).format('YYYY-MM-DD')}&dateto=${moment(new Date()).format('YYYY-MM-DD')}`);
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


export default CategoryPage;