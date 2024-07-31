import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { columnDefs, dummyData } from '@/table/ListWorkerTable';
import { DateRangePicker } from '../ui/dateRangePicker';

const ListWorker: React.FC = () => {
  const defaultColDef = useMemo(() => {
    return {
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    };
  }, []);
  return (
    <div>
      <div className="h-[50px] flex items-center px-[20px]">
        <DateRangePicker
          align="center"
          locale="en-US"
          onUpdate={(e) => console.log(e)}
          showCompare={false}
        />
      </div>
      <div className=" ag-theme-quartz h-[calc(100vh-190px)]">
        <AgGridReact
          rowData={dummyData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          pagination={true}
        />
      </div>
    </div>
  );
};

export default ListWorker;
