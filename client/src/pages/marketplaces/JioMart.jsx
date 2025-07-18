import React from 'react';
import { Helmet } from 'react-helmet';

const JioMart = () => {
  return (
    <>
      <Helmet>
        <title>JioMart Services | 99digicom</title>
        <meta name="description" content="Complete JioMart marketplace services including account management, listing optimization, and advertising." />
      </Helmet>
      <div className="min-h-screen pt-20 bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900">JioMart Services</h1>
        </div>
      </div>
    </>
  );
};

export default JioMart; 