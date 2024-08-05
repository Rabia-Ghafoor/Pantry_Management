import React from 'react';
import HomePage from '../app/pantrytracker'; // Corrected import path for the homepage component
import Layout from '../app/navbar'; // Corrected import path for the Layout component

const Index = () => {
  return (
    <Layout>
      <HomePage />
    </Layout>
  );
}

export default Index;
