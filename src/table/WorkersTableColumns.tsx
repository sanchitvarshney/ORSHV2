import { ColDef } from 'ag-grid-community';

export const columnDefs: ColDef[] = [
  { headerName: 'First Name', field: 'firstName', sortable: true, filter: true },
  { headerName: 'Last Name', field: 'lastName', sortable: true, filter: true },
  { headerName: 'Phone', field: 'phone', sortable: true, filter: true },
  { headerName: 'E-mail', field: 'email', sortable: true, filter: true },
  { headerName: 'Company', field: 'company', sortable: true, filter: true },
  { headerName: 'Branch', field: 'branch', sortable: true, filter: true },
];
export interface RowData {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    company: string;
    branch: string;
  }
  export const dummyData: RowData[] = [
    { firstName: 'John', lastName: 'Doe', phone: '1234567890', email: 'john.doe@example.com', company: 'ABC Corp', branch: 'New York' },
    { firstName: 'Jane', lastName: 'Smith', phone: '0987654321', email: 'jane.smith@example.com', company: 'XYZ Ltd', branch: 'Los Angeles' },
    { firstName: 'Alice', lastName: 'Johnson', phone: '1112223334', email: 'alice.johnson@example.com', company: 'Example Inc', branch: 'Chicago' },
    // Add more rows as needed
  ];
  
  