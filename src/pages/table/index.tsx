import React, { Component } from 'react';
import STable from 'src/components/search-table';

class Index extends Component {

  render() {
    const searchConfig = [
      { label: '名称', name: 'a1', type: 'input' },
      { label: '名称2', name: 'a2', type: 'select' },
      { label: '名称3', name: 'a3', type: 'number' },
      { label: '名称4', name: 'a4', type: 'data' },
      { label: '名称5', name: 'a5', type: 'range' },
    ];
    return (
      <STable
        searchConfig={searchConfig}
      />
    );
  }
}

export default Index;