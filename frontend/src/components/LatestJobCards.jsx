import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';

const LatestJobCards = ({ job }) => {
    const navigate = useNavigate();

    // Truncate description to 20-25 words
    const truncateDescription = (text, maxWords) => {
        const words = text.split(' ');
        return words.length > maxWords ? `${words.slice(0, maxWords).join(' ')}...` : text;
    };

    return (
        <div 
            onClick={() => navigate(`/description/${job._id}`)} 
            className="p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer"
        >
            <div>
                <h1 className="font-medium text-lg">{job?.company?.name}</h1>
                <p className="text-sm text-gray-500">India</p>
            </div>
            <div>
                <h1 className="font-bold text-lg my-2">{job?.title}</h1>
                <p className="text-sm text-gray-600">
                    {truncateDescription(job?.description || '', 25)}
                </p>
            </div>
            <div className="flex items-center gap-2 mt-4">
                <Badge className="text-blue-700 font-bold" variant="ghost">{job?.position} Positions</Badge>
                <Badge className="text-[#F83002] font-bold" variant="ghost">{job?.jobType}</Badge>
                <Badge className="text-[#7209b7] font-bold" variant="ghost">{job?.salary}LPA</Badge>
            </div>
        </div>
    );
};

export default LatestJobCards;
