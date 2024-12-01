import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Target, Book, Award, CheckCircle } from "lucide-react";
import { response } from "./response";
import "./pathway.css"

const PathwaySection = ({ icon: Icon, title, items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="timeline-content-section">
      <div className="flex items-center mb-2">
        <Icon className="mr-2 text-blue-600" />
        <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
      </div>
      <ul className="space-y-2 pl-8">
        {items.map((item, index) => (
          <li key={index} className="flex items-start text-gray-700">
            <CheckCircle className="text-green-500 w-5 h-5 mr-2" />
            {item.includes("**") ? (
              <>
                <strong>{item.split("**")[1]}:</strong> {item.replace(/\*\*.*?\*\*/g, "")}
              </>
            ) : (
              item
            )}
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
        console.log("Fetching data for jobId:", jobId);
        setData(response.pathway); // Mock data
      } catch (err) {
        setError(err.message || "Error fetching data.");
      } finally {
        setLoading(false);
      }
    };
    fetchCareerPathway();
  }, [jobId]);

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-10">
        <div className="animate-pulse">Loading career pathway...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        <p>Error: {error}</p>
      </div>
    );
  }

  const pathJson = data?.pathJson || {};
  const job = data?.job || {};
  const certifications = data?.certifications || [];

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white rounded-xl overflow-hidden">
        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-3xl font-bold">{job.title || "Job Title"}</h1>
          <p className="mt-2 text-lg font-normal text-blue-100">{job.description || "Job description not available."}</p>
        </div>

        <div className="p-6 relative">
          <div className="timeline-line"></div>

          {Object.entries(pathJson).map(([stage, content], index) => (
            <div key={stage} className="flex flex-col mb-8 relative">
              <div className="timeline-step">
                <div className="timeline-step-number">{index + 1}</div>
                {index < Object.entries(pathJson).length - 1 && (
                  <div className="w-px bg-blue-600 h-full absolute left-1/2 -top-8"></div>
                )}
              </div>
              <div className="timeline-step-content">
                <h2 className="timeline-stage-title">{stage}</h2>
                <div className="space-y-4">
                  <PathwaySection icon={Target} title="Skills" items={content?.Skills} />
                  <PathwaySection icon={Book} title="Tasks" items={content?.Tasks} />
                  <PathwaySection icon={Award} title="Tips" items={content?.Tips} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications Section */}
        <div className="border rounded-2xl p-6 m-3">
          <h3 className="font-semibold text-lg text-gray-800 mb-3">Recommended Certifications</h3>
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
                    aria-label={`Learn more about ${cert.title}`}
                    className="text-blue-600 hover:underline flex items-center"
                  >
                    <CheckCircle className="mr-2 text-green-500 w-5 h-5" />
                    {cert.title}
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No certifications available.</p>
          )}
        </div>
      </div>
    </div>
  );
};
 export default JobPathway;