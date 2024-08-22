import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { tabTriggerStyle } from '@/style/CustomStyles';
import Profile from '@/components/shared/Profile';
import SetAppPassword from '@/pages/profilePage/SetAppPassword';

const WorkersPage: React.FC = () => {

  return (
    <Tabs defaultValue="add-worker">
      <div className="h-[70px] flex items-center px-[10px] justify-between">
        <TabsList className="h-[50px] gap-[20px] bg-white shadow-sm shadow-stone-300 px-[10px] rounded-full">
          <TabsTrigger value="add-worker" className={tabTriggerStyle}>
            Profile
          </TabsTrigger>
          <TabsTrigger value="list-worker" className={tabTriggerStyle}>
           Set App password
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="add-worker" className="h-[calc(100vh-140px)] m-0">
        <Profile/>
      </TabsContent>
      <TabsContent value="list-worker" className="h-[calc(100vh-140px)] m-0">
        <SetAppPassword />
      </TabsContent>
    </Tabs>
  );
};

export default WorkersPage;
