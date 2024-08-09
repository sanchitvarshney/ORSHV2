import { SelectOptionsSchema } from '@/types/general';
import * as z from 'zod';

const errorMessages = {
  fatherName: "Please enter emplooyee's father's name.",
  motherName: "Please enter emplooyee's mother's name.",
  maritalStatus: "Please select emplooyee's maritalStatus.",
  spouseName: "Please enter emplooyee's spouse's name.",
  marriageAnniversery: "Please select emplooyee's marriage anniversery date.",
  childrenCount:
    "Please select emplooyee's children count. If you have children, Enter 0 if not",
  childName: "Please enter emplooyee's child's name.",
  childDob: "Please select emplooyee's child's date of birth.",
  childAttendSchool: "Please select if emplooyee's child attends school.",
  gender: 'Please select gender',
  account: "Please enter emplooyee's account number",
  reAccount: "Please enter emplooyee's account number again",
  accountNumberValidation:
    "emplooyee's account number does not match, Please check",
  ifsc: "Please enter emplooyee's ifsc code",
  subject: 'Please enter subject',
  mailBody: 'Please enter mail body',
};

export const UpdateEmployeeSchema = z.object({
  basic: z.object({
    firstName: z
      .string({ required_error: "Please enter emplooyee's first name" })
      .min(3, "Please enter emplooyee's first name"),
    middleName: z.string().optional(),
    lastName: z
      .string({ required_error: "Please enter emplooyee's last name" })
      .min(3, "Please enter emplooyee's last name"),
    dob: z.union([
      z.string(),
      z.date({ required_error: "Please select employee's DOB" }),
    ]),
    // .min(10, "Please select emplooyee's date of birth."),
    gender: z.union([
      z.string({ required_error: 'Please select a gender' }),
      SelectOptionsSchema,
    ]),
    bloodGroup: z.union([z.string().optional(), SelectOptionsSchema]),
    adhaar: z
      .string({ required_error: "Please enter emplooyee's Adhaar number" })
      .min(1, "Please select emplooyee's Adhaar number."),
    mark: z.string().optional(),
    hobbies: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().optional(),
    maritalStatus: z.union([z.string().optional(), SelectOptionsSchema]),
    department: z.union([
      z.string({ required_error: 'Please select a department' }),
      SelectOptionsSchema,
    ]),
    designation: z.union([
      z.string({ required_error: 'Please select a designation' }),
      SelectOptionsSchema,
    ]),
    pan: z.string().optional(),
  }),
  address: z.object({
    permanent: z.object({
      pinCode: z.string().optional(),
      house: z.string().optional(),
      area: z.string().optional(),
      state: z.union([z.string(), SelectOptionsSchema]),
      city: z.string().optional(),
      district: z.string().optional(),
    }),
    present: z.object({
      pinCode: z.string().optional(),
      house: z.string().optional(),
      area: z.string().optional(),
      state: z.union([z.string(), SelectOptionsSchema]),
      city: z.string().optional(),
      district: z.string().optional(),
    }),
  }),
  family: z.object({
    spouseName: z.string().optional(),
    //   family details
    fatherName: z
      .string({ required_error: errorMessages.fatherName })
      .min(3, errorMessages.fatherName),
    motherName: z
      .string({ required_error: errorMessages.motherName })
      .min(3, errorMessages.motherName),
    childCount: z.string().optional(),
  }),
  // benifits details
  benifits: z.object({
    esi: z.string({ required_error: 'Please enter ESI' }).min(1),
    uan: z
      .string({ required_error: "Please enter emplooyee's UAN number" })
      .min(1),
  }),

  //   employement details
  employement: z.array(
    z.object({
      payroll: z.object({
        company: z
          .string({ required_error: 'Please enter company name' })
          .min(1),
        branch: z.string({ required_error: 'Please enter branch' }).min(1),
      }),
      // company: z.object({
      //   company: z
      //     .string({ required_error: "Please enter company name" })
      //     .min(1),
      //   branch: z.string({ required_error: "Please enter branch" }).min(1),
      // }),
      company: z.union([
        z.string({ required_error: 'Please select a company' }),
        SelectOptionsSchema,
      ]),
      branch: z.union([
        z.string({ required_error: 'Please select a branch' }),
        SelectOptionsSchema,
      ]),

      role: z.union([
        z.string({ required_error: 'Please select a role' }),
        SelectOptionsSchema,
      ]),
      dateOfJoining: z.union([
        z.string({ required_error: 'Please select date of joining' }),
        z.date({ required_error: 'Please select date of joining' }),
      ]),
      dateOfLeaving: z.union([
        z
          .string({ required_error: 'Please select date of leaving' })
          .optional(),
        z.date({ required_error: 'Please select date of leaving' }).optional(),
      ]),
    }),
  ),

  //   education details
  education: z.array(
    z.object({
      degree: z.union([
        z.string({ required_error: 'Please select a degree' }),
        SelectOptionsSchema,
      ]),
      subject: z.union([
        z.string({ required_error: 'Please select a subject' }),
        SelectOptionsSchema,
      ]),
      grade: z.string().min(1, "Please enter emplooyee's grade"),
      university: z.union([
        z.string({ required_error: 'Please select a university' }),
        SelectOptionsSchema,
      ]),
      startYear: z.string().optional(),
      endYear: z.string().min(1, "Please specify the employee's passing year"),
    }),
  ),
});

export const EmailSchema = z.object({
  subject: z
    .string({ required_error: errorMessages.subject })
    .min(3, errorMessages.subject),
  body: z
    .string({ required_error: errorMessages.mailBody })
    .min(3, errorMessages.mailBody),
});
export const WhatsappMessageSchema = z.object({
  body: z
    .string({ required_error: errorMessages.mailBody })
    .min(3, errorMessages.mailBody),
});

export type UpdateEmployeeType = z.infer<typeof UpdateEmployeeSchema>;
export type EmailType = z.infer<typeof EmailSchema>;
export type WhatsappMessagType = z.infer<typeof WhatsappMessageSchema>;
export interface CreatedEmailType extends EmailType {
  id: string;
}

export interface RegisteredEmployeeType extends UpdateEmployeeType {
  empCode: string;
}

export const initialValues = {
  basic: {
    firstName: undefined,
    lastName: undefined,
    dob: undefined,
    gender: 'M',
    bloodGroup: undefined,
    adhaar: undefined,
    mark: undefined,
    hobbies: undefined,
    phone: undefined,
    email: undefined,
  },
  address: {
    permanent: {
      pinCode: undefined,
      house: undefined,
      area: undefined,
      state: undefined,
      city: undefined,
      district: undefined,
    },
    present: {
      pinCode: undefined,
      house: undefined,
      area: undefined,
      state: undefined,
      city: undefined,
      district: undefined,
    },
  },
  family: {
    fatherName: undefined,
    motherName: undefined,
    childCount: undefined,
    spouseName: undefined,
  },
  department: undefined,
  designation: undefined,
  pan: undefined,
  esi: undefined,
  uan: undefined,
  bankName: undefined,
  accountNumber: undefined,
  ifsc: undefined,
  employement: [
    {
      role: undefined,
      company: undefined,
      branch: undefined,
      dateOfJoining: null,
      dateOfLeaving: null,
    },
  ],
  education: [
    {
      degree: undefined,
      subject: undefined,
      grade: undefined,
      university: undefined,
      startYear: undefined,
      endYear: undefined,
    },
  ],
  childInfo: [
    {
      gender: undefined,
      childName: undefined,
      childDob: undefined,
    },
  ],
};
