import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AddCompany from '@/components/shared/AddCompany';
import ListCompany from '@/components/shared/ListCompany';
const CompanyPage: React.FC = () => {
  return (
    <>
      <Tabs defaultValue="add-company">
        <div className='h-[70px] flex items-center px-[10px]'>
        <TabsList className='h-[50px] p-[10px]'>
          <TabsTrigger value="add-company" className=' py-[10px] px-[10px] text-slate-600'>Add company</TabsTrigger>
          <TabsTrigger value="list-company" className=' py-[10px] px-[10px] text-slate-600'>List Companies</TabsTrigger>
        </TabsList>
        </div>
        <TabsContent value="add-company" className='h-[calc(100vh-140px) m-0 px-[10px]'>
          <AddCompany />
        </TabsContent>
        <TabsContent value="list-company" className='h-[calc(100vh-140px) m-0'>
          <ListCompany />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default CompanyPage;
