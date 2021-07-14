import { NextPageContext } from 'next';
import React, { useState, useEffect } from 'react';

import helper from 'lib/helper';
import { handlePost } from 'lib/handleAction';
import httpService from 'lib/httpService';
import { iTenant, iUser } from 'lib/interface';
import { widgetFirst, widgetHeader, widgetTwo } from 'components/tenant/tenantCommon';
import { Button, message, Steps } from 'antd';
import 'antd/dist/antd.css';
import OTPInput from 'components/Common/Otp';
const { Step } = Steps;
const steps = [
  { content: '' },
  { content: 'Second-content' },
  { content: 'Last-content' },
  { content: 'Last-content' },
];

interface iGetTenant {
  response: iTenant;
}

const Tenant: React.FC<iGetTenant> = ({ response }) => {
  return <h1>KUIS</h1>;
};

export async function getServerSideProps(ctx: NextPageContext) {
  let response: any = [];
  try {
    const getDetail = await httpService.get(httpService.apiUrl + `tenant/get/${ctx.query.tenant}`);
    if (getDetail.status === 200) {
      response = getDetail.data.result;
    } else {
      response = [];
    }
  } catch (err) {}

  return {
    props: { response },
  };
}

export default Tenant;
