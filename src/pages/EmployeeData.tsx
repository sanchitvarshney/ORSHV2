import React, { useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { columnDefs, rowData } from '@/table/EploayTableColumn';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { TbFilterSearch } from 'react-icons/tb';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const EmployeeData: React.FC = () => {
    const defaultColDef = useMemo(() => {
        return {
            filter: 'agTextColumnFilter',
            floatingFilter: true,
        };
    }, []);

  return (
    <div className="grid grid-cols-[350px_1fr]">
      <div className="h-[calc(100vh-70px)] overflow-hidden border-r">
        <div className="h-[50px] w-full bg-[#e0f2f1] flex items-center justify-between px-[10px]">
          <p className="flex gap-[5px] items-center font-[600]">
            <TbFilterSearch />
            Filters
          </p>
          <Badge className="bg-teal-700 rounded-full hover:bg-teal-600">
            100 Records
          </Badge>
        </div>
        <div className="h-[calc(100vh-270px)] overflow-y-auto"></div>
        <div className="bg-[#e0f2f1] h-[150px] w-full">
          <div className="h-[100px]">
            <div  className="h-[50px] flex gap-[10px] items-center p-[10px]">
              <Checkbox id="1" />
              <Label htmlFor="1" className='text-[13px] font-[400]'>
              Exclude workers who are not working anymore in your interested industry but has a past experience.
              </Label>
            </div>
            <Separator/>
            <div className="h-[50px] flex gap-[10px] items-center p-[10px]">
              <Checkbox id="2" />
              <Label htmlFor="2" className='text-[13px] font-[400]'>
              Exclude workers who are not working anymore in your interested company but has a past experience.</Label>
            </div>
          </div>
          <div className="h-[50px] flex items-center gap-[10px] p-[10px] ">
            <Input type="number" placeholder="Data limit" className='bg-white'/>
            <Button className="bg-teal-700 shadow-sm hover:bg-teal-600 shadow-neutral-500">
              Fetch
            </Button>
          </div>
        </div>
      </div>
      <div>
        <div className="ag-theme-quartz h-[calc(100vh-70px)]">
          <AgGridReact defaultColDef={defaultColDef} columnDefs={columnDefs} rowData={rowData} />
        </div>
      </div>
    </div>
  );
};

export default EmployeeData;
