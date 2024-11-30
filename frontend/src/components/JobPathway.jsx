import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { 
  Target, 
  Clock, 
  Star, 
  Book, 
  Award, 
  TrendingUp,
  CheckCircle 
} from 'lucide-react';
import { response } from "./response";

const PathwaySection = ({ icon: Icon, title, items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="border rounded-lg p-4 bg-gray-100 shadow-sm">
      <div className="flex items-center mb-3">
        <Icon className="mr-2 text-blue-600" />
        <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li 
            key={index} 
            className="flex items-center text-gray-700 pl-6 relative"
          >
            <CheckCircle className="absolute left-0 text-green-500 w-5 h-5" />
            {item.includes('**') 
              ? <>
                  <strong>{item.split('**')[1]}:</strong> {item.replace(/\*\*.*?\*\*/g, "")}
                </>
              : item
            }
          </li>
        ))}
      </ul>
    </div>
  );
};

const JobPathway = () => {
  const { id: jobId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCareerPathway = async () => {
      try {
        // const response = await axios.get(
        //   `http://localhost:8000/api/v1/ai/jobs/${jobId}/pathway`
        // );
        // if (response?.status === 200) {
        //   setData(response.data);
        // } else {
        //   setError("Failed to fetch data.");
        // }
        
        setData(response.pathway);
      } catch (err) {
        setError(err.message || "Error fetching data.");
      } finally {
        setLoading(false);
      }
    };
    fetchCareerPathway();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-10">
        Loading career pathway...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        Error: {error}
      </div>
    );
  }

  // Safely access nested data
  const pathJson = data?.pathJson || {};
  const job = data?.job || {};
  const certifications = data?.certifications || [];

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        {/* Job Header */}
        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-3xl font-bold">{job.title || "Job Title"}</h1>
          <p className="mt-2 text-blue-100">{job.description || "Job description not available."}</p>
        </div>

        {/* Career Pathway Sections */}
        <div className="p-6 space-y-6">
          <PathwaySection 
            icon={Target} 
            title="Skills" 
            items={pathJson.Skills} 
          />

          <PathwaySection 
            icon={TrendingUp} 
            title="Career Stages" 
            items={[
              ...((pathJson['Beginner (1-2 years):'] || []).map(item => item)),
              ...((pathJson['Mid-level (3-5 years):'] || []).map(item => item)),
              ...((pathJson['Senior (6+ years):'] || []).map(item => item))
            ]} 
          />

          <PathwaySection 
            icon={Star} 
            title="Potential Roles" 
            items={pathJson['Potential Roles']} 
          />

          <PathwaySection 
            icon={Book} 
            title="Tips" 
            items={pathJson.Tips} 
          />

          {/* Certifications Section */}
          <div className="border rounded-lg p-4 bg-gray-100 shadow-sm">
            <div className="flex items-center mb-3">
              <Award className="mr-2 text-blue-600" />
              <h3 className="font-semibold text-lg text-gray-800">Recommended Certifications</h3>
            </div>
            {certifications.length > 0 ? (
              <ul className="space-y-2">
                {certifications.map((cert, index) => (
                  <li 
                    key={index} 
                    className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all"
                  >
                    <a 
                      href={cert.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      <CheckCircle className="mr-2 text-green-500" />
                      {cert.title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No certifications found for this role.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPathway;