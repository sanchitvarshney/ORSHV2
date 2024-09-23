import React, { useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { columnDefs } from '@/table/ListWorkerTable';
import { DatePicker, Space } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import { fetchWorkers } from '@/features/admin/adminPageSlice';
import { format } from 'date-fns';
import WorkerDetails from '@/components/shared/WorkerDetails';
import Loading from '@/components/reusable/Loading';
const { RangePicker } = DatePicker;

const ListWorker: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { workers, loading } = useSelector(
    (state: RootState) => state.adminPage,
  );
  const [selectedEmpId, setSelectedEmpId] = useState<string | null>(null);

  const handleDateRangeUpdate = (dates: any) => {
    if (dates && dates.length === 2) {
      const [startDate, endDate] = dates;
      const formattedStartDate = format(startDate.toDate(), 'dd-MM-yyyy');
      const formattedEndDate = format(endDate.toDate(), 'dd-MM-yyyy');
      dispatch(
        fetchWorkers({
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        }),
      );
    } else {
      console.error('Invalid date range');
    }
  };

  const toggleShowDetails = (empId?: string) => {
    setSelectedEmpId(empId ?? null);
  };

  const defaultColDef = useMemo(
    () => ({
      filter: 'agTextColumnFilter',
      floatingFilter: true,
    }),
    [],
  );

  return (
    <div className="flex flex-col h-[calc(100vh-140px)]">
      {loading && <Loading />}
      <div className="mb-4 pl-5 pt-5">
        <Space direction="vertical" size={12}>
          <RangePicker
            onChange={handleDateRangeUpdate}
            format="DD-MM-YYYY"
            className="w-full"
          />
        </Space>
      </div>
      <div className="flex flex-1">
        <div className="flex-1 mr-4">
          <div className="ag-theme-quartz h-full">
            <AgGridReact
              rowData={workers}
              columnDefs={columnDefs}
              defaultColDef={defaultColDef}
              pagination={true}
              context={{ toggleShowDetails }}
              suppressCellFocus={true}
            />
          </div>
        </div>
        {selectedEmpId && (
          <div className="flex-1 h-full">
            <WorkerDetails
              showEdit
              setOpen={() => toggleShowDetails()}
              empId={selectedEmpId} // Pass the selected employee ID
              toggleDetails={toggleShowDetails} // Pass the function to close details
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ListWorker;
