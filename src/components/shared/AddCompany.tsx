import React, { useState } from 'react';

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
import { CgWebsite } from 'react-icons/cg';
import { FaCreditCard } from 'react-icons/fa';
import { FaSave } from 'react-icons/fa';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalTitle,
  ModalDescription,
} from '@/components/ui/model';

import { FakeCompanyData } from '../../data/index';
import { AiFillLike } from 'react-icons/ai';
import { Separator } from '../ui/separator';
import { FaRegCheckCircle } from 'react-icons/fa';

const AddCompany: React.FC = () => {
  const [modelOpen, setModelOpen] = useState<boolean>(false);
  const [company, setCompany] = useState<string | null>(null);
  const [input, setInput] = useState<string>('');
  return (
    <>
      <Modal open={modelOpen} onOpenChange={setModelOpen}>
        <ModalContent className="p-0 overflow-hidden min-w-[50vw]">
          <ModalHeader className="bg-[url(/addcompany.png)] h-[150px] flex justify-end pb-[10px] pl-[20px] bg-cover">
            <ModalTitle className="text-slate-600 text-[20px] font-[700]">
              Add company
            </ModalTitle>
            <ModalDescription className="text-yellow-500 flex  gap-[5px] text-[13px]">
              {/* <MdOutlineWarningAmber className="h-[20px] w-[20px]" /> */}
              An existing company name or a copied name <br /> should not be
              added.
            </ModalDescription>
          </ModalHeader>
          <div className="modal-body px-[20px]">
            <div className="floating-label-group">
              <Input
                required
                className={inputStyle}
                onChange={(e: any) => {
                  setInput(e.target.value);
                }}
                value={input}
              />
              <Label className="floating-label  gap-[10px]">
                <span className="flex items-center gap-[10px]">
                  <Building2 className="h-[18px] w-[18px]" /> Enter Company Name
                </span>{' '}
              </Label>
            </div>

            <div className=" mt-[20px]">
              <ModalTitle className="text-slate-600 text-[16px]">
                Existing company list
              </ModalTitle>
              <ul className="list-disc  text-[14px] mt-[10px] max-h-[200px] min-h-[200px] overflow-y-auto p-[10px] rounded-lg bg-blue-50 overflow-hidden flex flex-col gap-[5px]">
                {!input ? (
                  FakeCompanyData.map((data) => (
                    <>
                      <li
                        key={data}
                        className="font-[500] hover:bg-slate-200 rounded-md px-[10px] py-[5px]"
                      >
                        {data}
                        <p className="text-[13px] font-[400]">
                          Lorem ipsum dolor sit amet...
                        </p>
                      </li>
                      <Separator className="bg-white " />
                    </>
                  ))
                ) : (
                  <>
                    {FakeCompanyData.filter((data) =>
                      data.toLowerCase().includes(input.toLowerCase()),
                    ).length > 0 ? (
                      FakeCompanyData.filter((data) =>
                        data.toLowerCase().includes(input.toLowerCase()),
                      ).map((data) => (
                        <>
                          <li
                            key={data}
                            className="font-[500] hover:bg-slate-200 rounded-md px-[10px] py-[5px]"
                          >
                            {data}
                            <p className="text-[13px] font-[400]">
                              Lorem ipsum dolor sit amet...
                            </p>
                          </li>
                          <Separator className="bg-white " />
                        </>
                      ))
                    ) : (
                      <div className="flex items-center justify-center w-full h-[180px] gap-[20px] flex-col">
                        <FaRegCheckCircle className="h-[50px] w-[50px] text-green-600" />
                        <p className="text-green-600 flex items-center gap-[5px]">
                          <AiFillLike /> Nice! Your company name is looking good
                          and unique.
                        </p>
                      </div>
                    )}
                  </>
                )}
              </ul>
            </div>
          </div>
          <ModalFooter className=" h-[50px]  justify-center items-center px-[20px] shadow border-t">
            <Button variant={'outline'} onClick={() => setModelOpen(false)}>
              Close
            </Button>
            <Button
              disabled={FakeCompanyData.map((company) =>
                company.toLowerCase(),
              ).includes(input.toLowerCase())}
              onClick={() => {
                if (
                  !FakeCompanyData.map((company) =>
                    company.toLowerCase(),
                  ).includes(input.toLowerCase())
                ) {
                  setCompany(input);
                  setModelOpen(false);
                }
              }}
              className="bg-teal-500 hover:bg-teal-600 shadow-neutral-400"
            >
              Next
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
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
              <Button
                onClick={() => setModelOpen(true)}
                className="justify-start w-full bg-transparent  rounded-none shadow-none text-[#9e9e9e] border-b  border-neutral-400 hover:bg-transparent"
              >
                {company === null || company === '' ? (
                  <span className="flex items-center gap-[10px]">
                    <Building2 className="h-[18px] w-[18px]" /> Enter Company
                    Name
                  </span>
                ) : (
                  company
                )}
              </Button>
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
                    <CgWebsite className="h-[18px] w-[18px]" />
                    Company Website
                  </span>
                </Label>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end px-6 py-4 border-t">
            <Button className="bg-teal-500 hover:bg-teal-600 shadow-neutral-400 flex items-center gap-[10px]">
              <FaSave className="h-[20px] w-[20px]" />
              Add
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default AddCompany;
