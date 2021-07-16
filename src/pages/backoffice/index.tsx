import React from 'react';
import Layout from '../../Layouts'
import { NextPageContext } from 'next'
import nookies from 'nookies'


const Dashboard: React.FC<iDashboard> = ({widget,berita,report,bonus}) => {

  return (
      <Layout title="Dashboard">
        <div className="container mt-6 lg:px-6 md:px-3 mx-auto xs:px-2 sm:px-2 grid mb-20">
          <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
            Dashboard
          </h2>
        </div>
      </Layout>
  );
}


export async function getServerSideProps(ctx:NextPageContext) {
  // Parse
  const cookies = nookies.get(ctx)
  if(!cookies._prowara_bo){
    return {
      redirect: {
        destination: '/backoffuce/auth/login',
        permanent: false,
      },
    }
  }else{
    // Api.axios.defaults.headers.common["Authorization"] = Helper.decode(cookies._prowara);
  }

    // GET BANK DATA
  let datum=[];
  try {
    const getData = await Api.get(Api.apiUrl+"site/memberarea")
    if(getData.status===200){
      datum=getData.data.result;
    }else{
      datum=[];
    }
  } catch (err) {}

//   let berita:any=[];
//   await handleGet(Api.apiUrl+'content/berita',(res)=>{
//     if(res.data!==undefined) berita=res.data;
//   },false)

//   let report:any=[];
//   await handleGet(Api.apiUrl+'transaction/history?page=1',(res)=>{
//     report=res.data;
//   },false)

//   let bonus:any=[];
//   await handleGet(Api.apiUrl+'transaction/history?page=1&q=U2hhcmluZyBQcm9maXQgZGFyaSA=',(res)=>{
//     bonus=res.data;
//   },false)

  // Destroy
  // nookies.destroy(ctx, 'cookieName')

  return { props:{
      cookies,
      widget:datum,
    //   berita,
    //   report,
    //   bonus
    }
  }
}

export default Dashboard
