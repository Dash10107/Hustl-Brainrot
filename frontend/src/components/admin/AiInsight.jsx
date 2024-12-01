import React, { useEffect, useState } from "react";
import axios from "axios";
import ApplicantCard from "./AdminApplicant";
import { data } from "./response";

function parseInsights(insights) {
  try {

    const cleanInsights = insights.replace(/^```json(?:n)?\n|\n```$/gi, '');
  
    return JSON.parse(cleanInsights);
  } catch (error) {
    console.error('Error parsing insights:', error);
    return null;
  }
}
function parseRankingScore(rankingScore) {
  try {
    const cleanRankingScore = rankingScore.replace(/^```markdown\n|\n```$/g, '');
    // console.log(cleanRankingScore)
    
} catch (error) {
    console.error('Error parsing ranking score:', error);
    return null;
  }
}

const JobInsights = ({jobId}) => {
    
  const [jobData, setJobData] = useState(null);
  const [applicantsData, setApplicantsData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch job and applicants data from API
  useEffect(() => {
    const fetchJobData = async () => {
      try {
        // const response = await axios.get(`http://localhost:8000/api/v1/ai/jobs/${jobId}/applicants`); // replace with your API URL
        // const data = response.data;
        setJobData(data.job);
        setApplicantsData(data.applicants);
        // console.log(data.applicants)
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };

    fetchJobData();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl">
        <span>Loading...</span>
      </div>
    );
  }



  return (
    <div className="container mx-auto p-8 space-y-8">
      {/* Job Info */}
      {/* <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-900">{jobData.title}</h2>
        <p className="mt-4 text-gray-700">{jobData.description}</p>
      </div> */}
     <h3>Applicants</h3>
            {applicantsData.length === 0 && <p>No applicants available.</p>}
            {applicantsData?.map((applicant, index) => {
              // console.log(applicant)
                
                return (
                    <ApplicantCard
                        key={applicant.applicant.id}
                       applicant={applicant.applicant}
                       insights={applicant.insights}
                      rankingScore={applicant.rankingScore}
                    />
                );
            })}

    </div>
  );
};

export default JobInsights;
