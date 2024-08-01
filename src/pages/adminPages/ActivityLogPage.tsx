import { Button } from '@/components/ui/button';
import { columns, dummyData } from '@/table/activityLogTable';
import { AgGridReact } from 'ag-grid-react';
import React, { useMemo } from 'react'
import { IoMdDownload } from 'react-icons/io';


const ActivityLogPage:React.FC = () => {
  const defaultColDef = useMemo(() => {
    return {
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    };
  }, []);
  return (
    <div>
     <div className='h-[50px] flex items-center justify-end px-[20px]'>
     <Button className='flex items-center gap-[5px] bg-teal-500 hover:bg-teal-600 shadow-neutral-400'><IoMdDownload className='h-[20px] w-[20px]'/> Download</Button>
     </div>
     <div className="ag-theme-quartz h-[calc(100vh-120px)]">
          <AgGridReact
            suppressCellFocus={false}
            defaultColDef={defaultColDef}
            columnDefs={columns}
            rowData={dummyData}
            pagination={true}
          />
        </div>
    </div>
  )
}

export default ActivityLogPage
