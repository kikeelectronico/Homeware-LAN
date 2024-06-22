import React from 'react';
import Layout from '@theme/Layout';
import IframeResizer from 'iframe-resizer-react'

function API() {

  const height = 800;

  return (
    <Layout title="API">
      <iframe src="/api-build/" style={{width: '100%', height: height}}/>
    </Layout>
  );
}

export default API;
