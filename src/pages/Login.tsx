import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Separator } from '@/components/ui/separator';
import { FaRegPlayCircle } from "react-icons/fa";
import { FaRegQuestionCircle } from "react-icons/fa";

const Login: React.FC = () => {
  return (
    <Wrapper className="h-[100vh] w-[100vw] grid grid-cols-2   ">
      <div className="overflow-hidden max-h-[100vh] flex justify-center items-center">
        <Card className="max-w-sm mx-auto w-[500px]">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-[50px]">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    to="#"
                    className="inline-block ml-auto text-sm underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" required />
              </div>
             <Link to={"/"}>
             <Button
                type="submit"
                className="w-full bg-teal-700 hover:bg-teal-600"
              >
                Login
              </Button>
             </Link>
            </div>
            <div className="mt-4 text-sm text-center">
              First time user?
              <Link to="#" className="font-[600] text-teal-600">
                REGISTER HERE
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className=" pt-[30px] w-full">
        <h2 className='text-[20px] font-[600] text-slate-700'>Welcome to MsCorpres Workers Hub</h2>
        <h1 className='text-[30px] font-[700] text-slate-700'>Employee Search Portal</h1>
        <div className='flex items-center gap-[20px] px-[20px] py-[10px] rounded-full bg-neutral-100 max-w-max mt-[20px]'>
          <Link to={"#"} className='font-[500]'>NEED HELP?</Link>
          <Separator orientation="vertical" className='bg-slate-300 h-[20px]'/>
          <Link to={"#"} className='flex items-center gap-[5px] text-teal-600 font-[500]'><FaRegPlayCircle/> WATCH DEMO</Link>
          <Separator orientation="vertical" className='bg-slate-300 h-[20px] w-[2px]'/>
          <Link to={"#"} className='flex items-center gap-[5px] text-teal-600 font-[500]'><FaRegQuestionCircle/>FAQS?</Link>
         
        </div>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  background-image: linear-gradient(
      to right,
      rgb(218, 218, 218),
      rgb(212, 212, 212),
      rgba(226, 226, 226, 0.493),
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 0)
    ),
    url('/login2.png');
  background-size: cover;
  background-repeat: no-repeat;
`;
export default Login;
