import React from 'react';
import { Table } from 'antd';

function ContactList({ columns, productList }) {
  return (
    <Table style={{ padding: '20px' }} columns={columns} dataSource={productList} />
  );
}

export default ContactList;