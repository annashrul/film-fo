import React, { useState, useEffect                                                              } from "react";
import "react-intl-tel-input/dist/main.css";
import Layout from 'Layouts'
import Api from 'lib/httpService';
// import Helper from 'lib/helper';
import {iCategory,iPagin} from 'lib/interface';
import { Pagination } from '@windmill/react-ui'
import moment from 'moment'
import nookies from 'nookies'
import { NextPageContext } from 'next'
import { handleDelete, handleGet } from "lib/handleAction";
// import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import httpService from "lib/httpService";
// import Mutasi from 'components/transaksi/mutasi_row'
import ModalCategory from 'components/Backoffice/Category/modal_category';
import { DropdownMenu } from "@react-md/menu";
import {
    MoreVertSVGIcon,
    AddCircleOutlineSVGIcon,
  } from "@react-md/material-icons";
//   import { useToasts } from 'react-toast-notifications'
import Swal from "sweetalert2";
interface iCategoryPage {
    datum: any;
}


const CategoryPage: React.FC<iCategoryPage> = (datum) =>{
    
    // const { addToast } = useToasts();
    const [datumCategory,setDatumCategory]= useState<Array<iCategory>>([]);
    const [openCategoryModal, setOpenCategoryModal] = useState(false);
    const [arrData, setArrData] = useState<iPagin>();
    const [any,setAny]=useState("");
    const [type,setType]=useState("0");
    const [categoryData,setCategoryData]=useState({});
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

    const handleModal=(val:any)=>{
        setCategoryData(val);
        setOpenCategoryModal(true);
    }

    const handleDeleteData= async (id:string) => {
        Swal.fire({
            title: 'Yakin menghapus data ini?',
            showCancelButton: true,
            confirmButtonText: `Hapus`,
            cancelButtonText: `Batal`,
          }).then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                await handleDelete(Api.apiClient + `category/${id}`, async () => {});
            } else {
              Swal.close();
            }
          })
    }
    const handlePage=(pagenum:string)=>{
        if (hitFirst === 0) {
             if (any !== '') {
                handleLoadData(`page=${pagenum}&q=${btoa(any)}&type=${type}&perpage=10`);
            }
        }
       
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
                        <button 
                            className="px-8 rounded-lg bg-white  text-gray-200 font-bold p-3 mt-1 uppercase border-white border-t border-b border-r"
                            onClick={(event)=>{event.preventDefault();handleModal({})}}
                            >
                                <AddCircleOutlineSVGIcon />
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
                                                    <DropdownMenu
                                                        id="example-dropdown-menu"
                                                        items={[
                                                        { onClick: () => handleDeleteData(item.id), children: "Delete" },
                                                        { onClick: () => handleModal(item), children: "Edit" },
                                                        ]}
                                                        buttonType="icon"
                                                        aria-label="Options..."
                                                    >
                                                        <MoreVertSVGIcon />
                                                    </DropdownMenu>
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
            <ModalCategory open={openCategoryModal} closeModal={() => setOpenCategoryModal(false)} data={categoryData} />
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