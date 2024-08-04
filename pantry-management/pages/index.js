// app/index.js
import React, { useState, useEffect } from 'react';
import HomePage from '../app/pantrytracker'; // Import the homepage component
import Layout from '../app/layout'; // Ensure you have Layout component wrapping your pages


export default function Index() {
  return (
    <Layout>
      <HomePage />
    </Layout>
  );
}

