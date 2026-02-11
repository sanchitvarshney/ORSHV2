
import UpdateCompany from '@/components/admin/companies/UpdateCompany';
import Loading from '@/components/reusable/Loading';
import AddClient from '@/components/shared/AddClient';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { LabelInput } from '@/components/ui/EmpUpdate';
import IconButton from '@/components/ui/IconButton';
import {
  getCompanyBranchOptions,
  getCompanyInfo,
} from '@/features/admin/adminPageSlice';
import { AppDispatch, RootState } from '@/store';
import {
  Building2,
  CalendarIcon,
  CreditCard,
  Edit,
  Ellipsis,
  Globe,
  Mail,
  Phone,
  User,
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

export interface CompanyInfoContentProps {
  companyId: string;
  /** When true, used inside drawer (slightly more compact). */
  embedded?: boolean;
}

/** Reusable company detail content. Use with companyId from route or from parent (e.g. drawer). */
export function CompanyInfoContent({ companyId, embedded }: CompanyInfoContentProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { companyInfo: details, branches, loading } = useSelector(
    (state: RootState) => state.adminPage,
  );

  // const [showAddBranchDialog, setShowAddBranchDialog] = useState(false);
  // const [updatingBranch, setUpdatingBranch] = useState<null>(null);
  const [showAddClientDialog, setShowAddClientDialog] = useState<boolean>(false);
  const [showUpdateComDialog, setShowUpdateComDialog] = useState<boolean>(false);

  useEffect(() => {
    if (!companyId) return;
    dispatch(getCompanyInfo(companyId));
    dispatch(getCompanyBranchOptions(companyId));
  }, [companyId, dispatch]);

  const wrapperClass = embedded
    ? 'flex-1 bg-white flex flex-col gap-4 p-6'
    : 'flex-1 bg-white flex flex-col gap-6 border rounded-lg p-8';

  return (
    <div className={wrapperClass}>
      {loading && <Loading />}
      <AddClient
        branches={branches}
        show={showAddClientDialog}
        hide={() => setShowAddClientDialog(false)}
      />
      <UpdateCompany
        branches={branches}
        show={showUpdateComDialog}
        hide={() => setShowUpdateComDialog(false)}
      />
      {/* <UpdateBranchModal
        branches={branches}
        show={showAddBranchDialog}
        hide={() => setShowAddBranchDialog(false)}
        updatingBranch={updatingBranch}
      /> */}
      <div className="flex justify-between items-center border-b-2 border-b-muted ">
        <div className="flex gap-2 items-center ml-[-10px]">
          <div className="flex gap-1 items-center">
            <Building2 />
            <p className="font-semibold text-xl">{details[0]?.name}</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <DropDown
            // setShowAddBranchDialog={setShowAddBranchDialog}
            setShowAddClientDialog={setShowAddClientDialog}
            setShowUpdateComDialog={setShowUpdateComDialog}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2  px-4 gap-4">
        <LabelInput
          value={details[0]?.email}
          onChange={() => {}}
          icon={Mail}
          label="Email"
          required
          stacked
        />
        <LabelInput
          value={details[0]?.mobile}
          onChange={() => {}}
          icon={Phone}
          label="Contact No."
          required
          stacked
        />
        <LabelInput
          value={details[0]?.panNo}
          onChange={() => {}}
          icon={CreditCard}
          label="PAN No."
          required
          stacked
        />
        <LabelInput
          value={details[0]?.website}
          onChange={() => {}}
          icon={Globe}
          label="Website"
          required
          stacked
        />
        <LabelInput
          value={details[0]?.createdOn}
          onChange={() => {}}
          icon={CalendarIcon}
          label="Company Added On"
          required
          stacked
        />
        <LabelInput
          value={details[0]?.updatedOn}
          onChange={() => {}}
          icon={CalendarIcon}
          label="Company Last Updated On"
          required
          stacked
        />
        <LabelInput
          value={details?.[0]?.isActive ? 'Yes' : 'No'}
          onChange={() => {}}
          icon={CalendarIcon}
          label="Is Company Active?"
          required
          stacked
        />
      </div>
      <div className="h-[2px] bg-muted" />
    </div>
  );
}

export default function CompanyInfo() {
  const params = useParams<{ id: string }>();
  const companyId = params?.id ?? '';

  if (!companyId) return null;

  return <CompanyInfoContent companyId={companyId} />;
}

interface PropTypes {
  setShowAddClientDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setShowAddBranchDialog?: React.Dispatch<React.SetStateAction<boolean>>;
  setShowUpdateComDialog: React.Dispatch<React.SetStateAction<boolean>>;
}

const DropDown = (props: PropTypes) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IconButton icon={<Ellipsis size={19} />} />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="group"
          onClick={() => props.setShowAddClientDialog(true)}
        >
          <div className="flex  items-center gap-1">
            <User size={18} className="text-muted-foreground" />
            Add As Client
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="group"
          onClick={() => props.setShowUpdateComDialog(true)}
        >
          <div className="flex items-center gap-2">
            <Edit size={16} className="text-muted-foreground" />
            Update Company
          </div>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem
          className="group"
          onClick={() => props?.setShowAddBranchDialog(true)}
        >
          <div className="flex items-center gap-1 ">
            <PlusIcon size={18} className="text-muted-foreground" />
            Add Branch
          </div>
        </DropdownMenuItem> */}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
