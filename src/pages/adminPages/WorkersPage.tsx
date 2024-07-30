import React, { useMemo } from 'react'
import { AgGridReact } from 'ag-grid-react';
import { columnDefs, dummyData } from '@/table/WorkersTableColumns';
const WorkersPage:React.FC = () => {
    const defaultColDef = useMemo(() => {
        return {
          filter: 'agTextColumnFilter',
          floatingFilter: true,
        };
      }, []);
    
  return (
    <div className=" ag-theme-quartz h-[calc(100vh-70px)]">
    <AgGridReact
      rowData={dummyData}
      columnDefs={columnDefs}
      defaultColDef={defaultColDef}
      pagination={true}
    />
  </div>
  )
}

export default WorkersPage
