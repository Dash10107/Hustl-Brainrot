import React, { useEffect, useState } from 'react'
import { Badge } from './ui/badge'
import { Button } from './ui/button'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { response } from "./response"
import Navbar from './shared/Navbar';
import Footer from './shared/Footer';

const JobDescription = () => {
    const navigate = useNavigate();
    const {singleJob} = useSelector(store => store.job);
    const {user} = useSelector(store=>store.auth);
    const isIntiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
    const [isApplied, setIsApplied] = useState(isIntiallyApplied);

    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    const applyJobHandler = async () => {
        try {
            const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {withCredentials:true});
            
            if(res.data.success){
                setIsApplied(true); // Update the local state
                const updatedSingleJob = {...singleJob, applications:[...singleJob.applications,{applicant:user?._id}]}
                dispatch(setSingleJob(updatedSingleJob)); // helps us to real time UI update
                toast.success(res.data.message);

            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message);
        }
    }

    useEffect(()=>{
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setSingleJob(res.data.job));
                    setIsApplied(res.data.job.applications.some(application=>application.applicant === user?._id)) // Ensure the state is in sync with fetched data
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchSingleJob(); 
    },[jobId,dispatch, user?._id]);

    useEffect(() => {
      setSingleJob(response);
    }, [])
    

    return (
        <div>
        <Navbar />
        <div className='max-w-7xl mx-auto my-10'>
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="font-bold text-2xl">{singleJob?.title}</h1>
                    <p className="text-gray-500 text-sm mt-1">Posted on: {singleJob?.createdAt.split("T")[0]}</p>
                    <div className="flex items-center gap-4 mt-4">
                        <Badge className="text-blue-700 font-bold border-2 border-blue-700 " variant="ghost">
                            <span className="material-icons">group</span> {singleJob?.postion} Positions
                        </Badge>
                        <Badge className="text-[#F83002] font-bold border-2 border-red-500 " variant="ghost">
                            <span className="material-icons">work</span> {singleJob?.jobType}
                        </Badge>
                        <Badge className="text-[#7209b7] font-bold border-2 border-violet-700" variant="ghost">
                            <span className="material-icons">attach_money</span> {singleJob?.salary} LPA
                        </Badge>
                    </div>
                </div>
                <Button
                    onClick={isApplied ? null : applyJobHandler}
                    disabled={isApplied}
                    className={`rounded-lg px-6 py-2 ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>

            <h1 className='border-b-2 border-b-gray-300 font-medium py-4'>Job Description</h1>
            <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="w-full mx-auto bg-white border border-gray-200 rounded-2xl p-4">
                    <h1 className="font-bold">Role</h1>
                    <p className="text-gray-700 font-normal">{singleJob?.title}</p>
                </div>
                <div className="w-full mx-auto bg-white border border-gray-200 rounded-2xl p-4">
                    <h1 className="font-bold">Location</h1>
                    <p className="text-gray-700 font-normal">{singleJob?.location}</p>
                </div>
                <div className="w-full mx-auto bg-white border border-gray-200 rounded-2xl p-4">
                    <h1 className="font-bold">Description</h1>
                    <p className="text-gray-700 font-normal">{singleJob?.description}</p>
                </div>
                <div className="w-full mx-auto bg-white border border-gray-200 rounded-2xl p-4">
                    <h1 className="font-bold">Experience</h1>
                    <p className="text-gray-700 font-normal">{singleJob?.experience || "N.A."} yrs</p>
                </div>
                <div className="w-full mx-auto bg-white border border-gray-200 rounded-2xl p-4">
                    <h1 className="font-bold">Salary</h1>
                    <p className="text-gray-700 font-normal">{singleJob?.salary} LPA</p>
                </div>
                <div className="w-full mx-auto bg-white border border-gray-200 rounded-2xl p-4">
                    <h1 className="font-bold">Total Applicants</h1>
                    <p className="text-gray-700 font-normal">{singleJob?.applications?.length}</p>
                </div>
            </div>

            <div className="mt-6">
                <button
                    type="button"
                    onClick={() => navigate(`/pathway/${singleJob?._id}`)}
                    className="bg-[#7209b7] text-white px-6 py-2 rounded-lg shadow hover:bg-[#5f32ad] transition-all font-semibold"
                >
                    Explore Pathway
                </button>
            </div>

        </div>
        <Footer />
        </div>
    )
}

export default JobDescription