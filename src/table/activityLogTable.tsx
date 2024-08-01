import { ColDef } from "ag-grid-community";

export interface RowData {
    id: number;
    insertedBy: string;
    insertDate: string;
    action: string;
  }
  
export  const columns: ColDef[] = [
    { headerName: '#', field: 'id', headerClass: 'custom-header',filter:false,maxWidth:50 },
    { headerName: 'Inserted By', field: 'insertedBy', headerClass: 'custom-header', flex:2},
    { headerName: 'Insert Date', field: 'insertDate', headerClass: 'custom-header' ,flex:1},
    { headerName: 'Action', field: 'action', headerClass: 'custom-header',flex:1 },
  ];
  
 export const dummyData: RowData[] = [
    { id: 1, insertedBy: 'User A', insertDate: '2024-08-01', action: 'Edit' },
    // Add more row data as needed
  ];