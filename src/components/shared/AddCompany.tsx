import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '../ui/label';
import { inputStyle } from '@/style/CustomStyles';
import { Building2, Mail, Phone } from 'lucide-react';
import { CgWebsite } from "react-icons/cg";
import { FaCreditCard } from "react-icons/fa";

const AddCompany: React.FC = () => {
  return (
    <div>
      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle className="text-[20px] font-[650] text-slate-600">
            Add Company
          </CardTitle>
          <CardDescription>
            Here you can add companies to our companies master
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="floating-label-group">
            <Input required className={inputStyle} />
            <Label className="floating-label  gap-[10px]">
              <span className="flex items-center gap-[10px]">
                <Building2 className="h-[18px] w-[18px]" /> Enter Company Name
              </span>{' '}
            </Label>
          </div>
          <div className="grid grid-cols-2 gap-[50px] mt-[50px]">
            <div className="floating-label-group">
              <Input required className={inputStyle} />
              <Label className="floating-label  gap-[10px]">
                <span className="flex items-center gap-[10px]">
                  <Mail className="h-[18px] w-[18px]" /> Email
                </span>
              </Label>
            </div>
            <div className="floating-label-group">
              <Input required className={inputStyle} />
              <Label className="floating-label  gap-[10px]">
                <span className="flex items-center gap-[10px]">
                  <Phone className="h-[18px] w-[18px]" /> Phone Number
                </span>
              </Label>
            </div>
            <div className="floating-label-group">
              <Input required className={inputStyle} />
              <Label className="floating-label  gap-[10px]">
                <span className="flex items-center gap-[10px]">
                  <FaCreditCard className="h-[18px] w-[18px]" /> Pan no.
                </span>
              </Label>
            </div>
            <div className="floating-label-group">
              <Input required className={inputStyle} />
              <Label className="floating-label  gap-[10px]">
                <span className="flex items-center gap-[10px]">
                  <CgWebsite className="h-[18px] w-[18px]" />Company Website
                </span>
              </Label>
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-6 py-4 border-t">
          <Button className="bg-teal-500 hover:bg-teal-600 shadow-neutral-400">
            Add
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddCompany;
