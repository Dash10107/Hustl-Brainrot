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
  } catch (error) {
    console.error('Error parsing ranking score:', error);
    return null;
  }
}

const JobInsights = ({ jobId }) => {
  const [jobData, setJobData] = useState(null);
  const [applicantsData, setApplicantsData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        setJobData(data.job);
        setApplicantsData(data.applicants);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data", error);
        setLoading(false);
      }
    };

    fetchJobData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-xl">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="container w-[100vw] p-8 space-y-8">
      <h3 className="text-2xl font-semibold mb-4">Applicants</h3>
      <div className="grid grid-cols-1 gap-6">
        {applicantsData.length === 0 && <p>No applicants available.</p>}
        {applicantsData?.map((applicant) => (
          <ApplicantCard
            key={applicant.applicant.id}
            applicant={applicant.applicant}
            insights={applicant.insights}
            rankingScore={applicant.rankingScore}
          />
        ))}
      </div>
    </div>
  );
};

export default JobInsights;
