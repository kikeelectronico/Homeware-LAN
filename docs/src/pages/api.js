import React from 'react';
import Layout from '@theme/Layout';
import SwaggerUI from "swagger-ui-react"
import "swagger-ui-react/swagger-ui.css"

function API() {
  return (
    <Layout title="API">
      <div
        style={{
        }}>

        <SwaggerUI url="/Homeware-LAN/swagger.json" />

      </div>
    </Layout>
  );
}

export default API;
