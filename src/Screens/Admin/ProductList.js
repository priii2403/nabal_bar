import React from 'react';
import { Table } from 'antd';

function ProductList({ columns, productList }) {
  return (
    <Table style={{ padding: '20px' }} columns={columns} dataSource={productList} />
  );
}

export default ProductList;
