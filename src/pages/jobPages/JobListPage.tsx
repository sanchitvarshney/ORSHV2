import { useEffect, useMemo, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import { jobColumnDefs, JobRowData } from '@/table/JobTableColumns';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Loading from '@/components/reusable/Loading';
import { toast } from '@/components/ui/use-toast';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import {
  fetchDepartments,
  fetchDesignations,
  fetchJobs,
} from '@/features/admin/adminPageSlice';
import { AlertDialogPopup } from '@/components/shared/AlertDialogPopup';
import EditJobDialog from '@/components/shared/EditJobDialog';
import { useForm } from 'react-hook-form';

const JobListPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { department, designation } = useSelector(
    (state: RootState) => state.adminPage,
  );
  const [jobs, setJobs] = useState<JobRowData[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<JobRowData[]>([]);
  const [loading, setLoading] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<JobRowData | null>(null);
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);

  const form = useForm<JobRowData>({
    defaultValues: {
      jobTitle: '',
      jobType: '',
      department: '',
      designation: '',
      minSalary: 0,
      maxSalary: 0,
      experience: '',
      jobStatus: '',
      skills: '',
      qualification: '',
      facilities: '',
    },
  });

  useEffect(() => {
    dispatch(fetchDepartments());
    dispatch(fetchDesignations());
  }, [ isEditDialogOpen]);

  useEffect(() => {
    setLoading(true);
    // TODO: Replace with actual API call
    dispatch(fetchJobs()).then((response: any) => {
      setJobs(response.payload.data || []);
      setFilteredJobs(response.payload.data || []);
      setLoading(false);
    });
  }, [dispatch]);

  const defaultColDef = useMemo<ColDef>(
    () => ({
      filter: 'agTextColumnFilter',
      floatingFilter: true,
      resizable: true,
    }),
    [],
  );

  const handleJobUpdate = (jobId: string, field: string, newValue: any) => {
    setJobs((prevJobs) =>
      prevJobs.map((job) =>
        job.jobID === jobId || job.id === jobId
          ? { ...job, [field]: newValue }
          : job,
      ),
    );

    // TODO: Replace with actual API call
    // dispatch(updateJob({ jobId, field, value: newValue })).then(
    //   (response: any) => {
    //     if (response.payload.success) {
    //       toast({
    //         title: 'Success!!',
    //         description: 'Job updated successfully',
    //       });
    //     } else {
    //       toast({
    //         variant: 'destructive',
    //         title: 'Error',
    //         description: response.payload.message,
    //       });
    //     }
    //   },
    // );

    toast({
      title: 'Success!!',
      description: `${field} updated successfully`,
    });
  };

  const handleEdit = (job: JobRowData) => {
    setSelectedJob(job);
    form.reset({
      jobTitle: job.jobTitle || '',
      jobType: job.jobType || '',
      department: job.department || '',
      designation: job.designation || '',
      minSalary: job.minSalary || 0,
      maxSalary: job.maxSalary || 0,
      experience: job.experience || '',
      jobStatus: job.jobStatus || '',
      skills: job.skills || '',
      qualification: job.qualification || '',
      facilities: job.facilities || '',
    });
    setIsEditDialogOpen(true);
  };

  const handleDelete = (jobId: string) => {
    setJobToDelete(jobId);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (jobToDelete) {
      setJobs((prevJobs) =>
        prevJobs.filter(
          (job) => job.jobID !== jobToDelete && job.id !== jobToDelete,
        ),
      );

      // TODO: Replace with actual API call
      // dispatch(deleteJob(jobToDelete)).then((response: any) => {
      //   if (response.payload.success) {
      //     toast({
      //       title: 'Success!!',
      //       description: 'Job deleted successfully',
      //     });
      //   } else {
      //     toast({
      //       variant: 'destructive',
      //       title: 'Error',
      //       description: response.payload.message,
      //     });
      //   }
      // });

      toast({
        title: 'Success!!',
        description: 'Job deleted successfully',
      });
      setIsDeleteDialogOpen(false);
      setJobToDelete(null);
    }
  };

  const handleSaveEdit = (data: JobRowData) => {
    if (selectedJob) {
      const jobId = selectedJob.jobID || selectedJob.id;
      const updatedJob = {
        ...selectedJob,
        ...data,
      };

      setJobs((prevJobs) =>
        prevJobs.map((job) =>
          job.jobID === jobId || job.id === jobId ? updatedJob : job,
        ),
      );

      // TODO: Replace with actual API call
      // dispatch(updateJob({ jobId, ...data })).then((response: any) => {
      //   if (response.payload.success) {
      //     toast({
      //       title: 'Success!!',
      //       description: 'Job updated successfully',
      //     });
      //   } else {
      //     toast({
      //       variant: 'destructive',
      //       title: 'Error',
      //       description: response.payload.message,
      //     });
      //   }
      // });

      toast({
        title: 'Success!!',
        description: 'Job updated successfully',
      });
      setIsEditDialogOpen(false);
      setSelectedJob(null);
    }
  };

  const getStatusCounts = () => {
    return {
      all: jobs.length,
      'currently-hiring': jobs.filter((j) => j.jobStatus === 'currently-hiring')
        .length,
      closed: jobs.filter((j) => j.jobStatus === 'closed').length,
      draft: jobs.filter((j) => j.jobStatus === 'draft').length,
      'on-hold': jobs.filter((j) => j.jobStatus === 'on-hold').length,
    };
  };

  const statusCounts = getStatusCounts();

  return (
    <div className="p-4 max-h-[calc(100vh-75px)] overflow-y-auto">
      <AlertDialogPopup
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false);
          setJobToDelete(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Delete Job"
        description="Are you sure you want to delete this job? This action cannot be undone."
      />

      <Card className="rounded-lg">
        <CardHeader>
          <CardTitle className="text-[20px] font-[650] text-slate-600">
            Job List
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <Loading />}
          <div className="mb-2 space-y-2">
            <div className="flex flex-wrap gap-4 p-2 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-700">Total:</span>
                <span className="text-lg font-bold text-gray-900">
                  {statusCounts.all}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-green-600">
                  Currently Hiring:
                </span>
                <span className="text-lg font-bold text-green-700">
                  {statusCounts['currently-hiring']}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-red-600">Closed:</span>
                <span className="text-lg font-bold text-red-700">
                  {statusCounts.closed}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-yellow-600">Draft:</span>
                <span className="text-lg font-bold text-yellow-700">
                  {statusCounts.draft}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-blue-600">On Hold:</span>
                <span className="text-lg font-bold text-blue-700">
                  {statusCounts['on-hold']}
                </span>
              </div>
            </div>
          </div>

          <div className="ag-theme-quartz h-[calc(100vh-400px)] min-h-[450px]">
            <AgGridReact
              rowData={filteredJobs}
              columnDefs={jobColumnDefs(handleEdit, handleDelete)}
              defaultColDef={defaultColDef}
              pagination={true}
              paginationPageSize={20}
              suppressCellFocus={true}
              singleClickEdit={true}
              stopEditingWhenCellsLoseFocus={true}
              onCellValueChanged={(params) => {
                const jobId = params.data.jobID || params.data.id;
                const field = params.colDef.field;
                const newValue = params.newValue;

                if (jobId && field) {
                  handleJobUpdate(jobId, field, newValue);
                }
              }}
            />
          </div>
        </CardContent>
      </Card>

      <EditJobDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        form={form}
        onSubmit={handleSaveEdit}
        onCancel={() => {
          setIsEditDialogOpen(false);
          setSelectedJob(null);
        }}
        department={department}
        designation={designation}
      />
    </div>
  );
};

export default JobListPage;
