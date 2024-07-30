import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { columnDefs, DummyData } from '@/table/ListCompaniesTableCkumns';

const ListCompany: React.FC = () => {
    const defaultColDef = useMemo(() => {
        return {
          filter: 'agTextColumnFilter',
          floatingFilter: true,
        };
      }, []);
    
  return (
    <>
     <div className=" ag-theme-quartz h-[calc(100vh-140px)]">
      <AgGridReact
        rowData={DummyData}
        columnDefs={columnDefs}
        defaultColDef={defaultColDef}
        pagination={true}
      />
    </div>
    </>
  );
};

export default ListCompany;
