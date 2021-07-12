import React from 'react';
import Layout from 'Layouts'
import { NextPageContext } from 'next'

interface iDashboard{}

const Dashboard: React.FC<iDashboard> = ({}) => {

  return (
    <div className="container mt-6 lg:px-6 md:px-3 mx-auto xs:px-2 sm:px-2 grid mb-20">
      <h2 className="my-6 text-2xl font-semibold text-gray-700 dark:text-gray-200">
        Dashboard
      </h2>
      {/* CARD SECTION */}
    
    </div>
  );
}


export async function getServerSideProps(ctx:NextPageContext) {
  // Parse
  // const cookies = nookies.get(ctx)
  // if(!cookies._prowara){
  //   return {
  //     redirect: {
  //       destination: '/auth/login',
  //       permanent: false,
  //     },
  //   }
  // }else{
  //   Api.axios.defaults.headers.common["Authorization"] = Helper.decode(cookies._prowara);
  // }
  // Destroy
  // nookies.destroy(ctx, 'cookieName')

  return { props:{} }
}

export default Dashboard
