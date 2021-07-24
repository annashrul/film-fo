import { NextPageContext } from 'next';
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <img
      src="https://illustatus.herokuapp.com/?title=Oops,%20Page%20not%20found&fill=%234f86ed"
      alt="https://illustatus.herokuapp.com/?title=Oops,%20Page%20not%20found&fill=%234f86ed"
    />
  );
};

export async function getServerSideProps(ctx: NextPageContext) {
  return { props: {} };
}

export default Dashboard;
