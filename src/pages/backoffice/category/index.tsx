import React from 'react';
import 'react-intl-tel-input/dist/main.css';
import dynamic from 'next/dynamic';
const Layout = dynamic(() => import('Layouts'), { ssr: false });

const CategoryPage: React.FC = () => {
  return (
    <Layout title="Category">
      <div className="container xs:mx-auto grid mb-20">
        <div className="flex justify-between">
          <div>
            <h2 className="mt-6 text-2xl align-middle font-semibold text-gray-700 dark:text-gray-200">Category</h2>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CategoryPage;
