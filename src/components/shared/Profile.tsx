import AppPasswordDialog from '@/components/shared/AppPasswordDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import IconButton from '@/components/ui/IconButton';
import { Input } from '@/components/ui/input';
import { Building2, Info, Mail, Pen, Phone, User, Check } from 'lucide-react';
import { ReactNode, useState } from 'react';

function Profile() {
  let user = localStorage.getItem('loggedInUser') ?? 'null';
  const data = JSON.parse(user);
  const [contactNo, setContactNo] = useState(data?.mobile);
  const [email, setEmail] = useState(data?.email);
  const [supportEmail, setSupportEmail] = useState(data?.email);
  const [recruitmentEmail, setRecruitmentEmail] = useState(data?.email);
  const [showAppPasswordDialog, setAppPasswordDialog] = useState(false);

  const updateUserData = async (field: string, value: string) => {
    console.log(`Updating ${field} to ${value}`);
  };

  return (
    <div>
      {user && (
        <div className="flex flex-col items-center mt-[50px]">
          <div className="w-3/4 flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle>
                  <div className="flex gap-2 items-center text-[25px] font-[650]">
                    <User />
                    {data?.firstName} {data?.lastName}
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-2">
                <div className="flex">
                  <div className="flex gap-1">
                    <div className="flex items-center gap-1 text-muted-foregroundb text-[20px]">
                      <Building2 size={19} />
                      <strong>Company : </strong>
                    </div>
                    <p className="ml-4">{user?.company}</p>
                  </div>
                </div>
                <div className="h-[2px] w-full bg-muted my-2" />
                <div className="grid grid-cols-3 gap-4 gap-y-6">
                  <SingleItem
                    label="Contact No."
                    icon={<Phone size={19} />}
                    value={contactNo}
                    editable
                    notVerified
                    onUpdate={(newValue) => {
                      setContactNo(newValue);
                      updateUserData('contactNo', newValue);
                    }}
                  />
                  <SingleItem
                    label="E-Mail"
                    icon={<Mail size={19} />}
                    value={email}
                    editable
                    notVerified
                    onUpdate={(newValue) => {
                      setEmail(newValue);
                      updateUserData('email', newValue);
                    }}
                  />
                  <SingleItem
                    label="Support E-mail"
                    icon={<Mail size={19} />}
                    value={supportEmail}
                    editable
                    notVerified
                    onUpdate={(newValue) => {
                      setSupportEmail(newValue);
                      updateUserData('supportEmail', newValue);
                    }}
                  />
                  <SingleItem
                    label="Recruitment E-mail"
                    icon={<Mail size={19} />}
                    value={recruitmentEmail}
                    editable
                    notVerified
                    onUpdate={(newValue) => {
                      setRecruitmentEmail(newValue);
                      updateUserData('recruitmentEmail', newValue);
                    }}
                  />
                </div>
              </CardContent>
            </Card>
            <InfoCard />
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;

interface PropTypes {
  icon: ReactNode;
  label: string;
  value: string;
  editable?: boolean;
  notVerified?: boolean;
  extra?: ReactNode;
  onUpdate?: (newValue: string) => void;
}

const SingleItem = ({
  icon,
  label,
  value,
  editable,
  notVerified,
  extra,
  onUpdate,
}: PropTypes) => {
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const handleSave = () => {
    if (onUpdate) {
      onUpdate(inputValue);
    }
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col gap-0">
      <div className="flex items-center gap-1 justify-between text-muted-foreground">
        <div className="flex gap-1 items-center ">
          {icon}
          <strong>{label}</strong>
        </div>
        {notVerified && (
          <div className="bg-white text-black">
            <IconButton
              tooltip={
                <div className="flex items-center p-2 flex-col gap-2 w-[200px] bg-white text-black">
                  <p className="font-semibold">{label} is not verified</p>
                  <Button className="w-full h-[27px] bg-teal-500 hover:bg-teal-600 shadow-neutral-400">
                    Verify
                  </Button>
                </div>
              }
              color="text-yellow-700"
              hoverBackground="hover:bg-white"
              hoverColor="hover:text-yellow-900"
              noSpace
              icon={<Info size={15} />}
            />
          </div>
        )}
      </div>
      <div className="flex gap-2 items-center justify-between pr-10 pl-5">
        {isEditing ? (
          <>
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1"
            />
            <Button variant="outline" onClick={handleSave} className="ml-2">
              <Check size={16} />
            </Button>
          </>
        ) : (
          <>
            <p>{value}</p>
            {editable && (
              <IconButton
                hoverBackground="hover:bg-transparent"
                noSpace={true}
                icon={<Pen size={16} />}
                onClick={() => setIsEditing(true)}
              />
            )}
          </>
        )}
      </div>
      {extra}
    </div>
  );
};

const InfoCard = () => {
  return (
    <div className="rounded-lg border border-border p-5 w-full bg-amber-50">
      <div className="text-muted-foreground mb-4 flex">
        <Info size={20} />
      </div>
      <ul className="flex flex-col gap-2 text-muted-foreground">
        <li>
          <p>
            <strong>Support Email</strong> is used if we need any support from
            you or your technical team.
          </p>
        </li>
        <li>
          <p>
            <strong>Recruitment Email</strong> is used when you contact workers
            through e-mail.
          </p>
          <p>
            You will need to create and set a <strong>App Password</strong> with
            your <strong>Recruitment Email</strong> so we can use that e-mail to
            send mails otherwise the e-mails will be sent through our E-mail ID.
          </p>
        </li>
      </ul>
    </div>
  );
};
