import React, { useState, useEffect } from 'react';
import 'react-intl-tel-input/dist/main.css';
import Layout from 'Layouts';
import Api from 'lib/httpService';
import Helper from 'lib/helper';
import { iCategory, iPagin } from 'lib/interface';
import { Pagination } from '@windmill/react-ui';
import moment from 'moment';
import nookies from 'nookies';
import { NextPageContext } from 'next';
import { handleGet } from 'lib/handleAction';
import DateRangePicker from 'react-bootstrap-daterangepicker';
import 'bootstrap-daterangepicker/daterangepicker.css';
import httpService from 'lib/httpService';
// import Mutasi from 'components/transaksi/mutasi_row'

const CategoryPage: React.FC = ({ time }) => {
  return (
    <Layout title="Category">
      <div className="container xs:mx-auto grid mb-20">
        <div className="flex justify-between">
          <div>
            <h2 className="mt-6 text-2xl align-middle font-semibold text-gray-700 dark:text-gray-200">
              Category {time}
            </h2>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export async function getServerSideProps(ctx: NextPageContext) {
  console.log('request', ctx);

  // res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');

  return {
    props: {
      time: new Date().toISOString(),
    },
  };
}
export default CategoryPage;
