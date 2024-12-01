import React from "react";

const ApplicantCard = ({ applicant, insights, rankingScore }) => {
  const { fullname, email, skills } = applicant;
  const {
    relevanceScore,
    professionalBrand,
    summary,
    sentiment,
  } = insights;
  const {
    score,
    explanation,
    social_profile_insights_details,
  } = rankingScore;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mb-4 border border-gray-200">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{fullname}</h2>
        <span
          className={`text-sm font-medium px-2 py-1 rounded ${
            sentiment === "positive"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {sentiment}
        </span>
      </div>

      {/* Skills Section */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-600">Key Skills:</h3>
        <ul className="flex flex-wrap gap-2 mt-2">
          {skills.map((skill, index) => (
            <li
              key={index}
              className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>

      {/* Professional Brand */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-600">Professional Brand:</h3>
        <p className="text-gray-700 text-sm mt-1">
          <strong>Strengths:</strong> {professionalBrand.strengths}
        </p>
        <p className="text-gray-700 text-sm mt-1">
          <strong>Engagement:</strong> {professionalBrand.onlineEngagement}
        </p>
        <p className="text-gray-700 text-sm mt-1">
          <strong>Development Areas:</strong> {professionalBrand.developmentAreas}
        </p>
      </div>

      {/* Relevance Score */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-600">Relevance Score:</h3>
        <p className="text-gray-800 text-lg font-bold">{relevanceScore}</p>
      </div>

      {/* Ranking Score Breakdown */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-600">Ranking Score:</h3>
        <p className="text-gray-800 text-lg font-bold">{score}</p>
        <p className="text-gray-700 text-sm mt-1">{explanation}</p>
      </div>

      {/* Social Profiles */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-600">Social Profiles:</h3>
        <ul className="mt-2 text-gray-700 text-sm">
          <li>
            <strong>GitHub:</strong> {social_profile_insights_details.github}
          </li>
          <li>
            <strong>LinkedIn:</strong> {social_profile_insights_details.linkedin}
          </li>
          <li>
            <strong>Portfolio:</strong> {social_profile_insights_details.portfolio}
          </li>
        </ul>
      </div>

      {/* Summary Section */}
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-gray-600">Application Summary:</h3>
        <p className="text-gray-700 text-sm mt-1">{summary}</p>
      </div>

      {/* Contact Information */}
      <div className="flex items-center justify-between border-t pt-4">
        <div>
          <h4 className="text-sm font-semibold text-gray-600">Contact:</h4>
          <p className="text-gray-700 text-sm">{email}</p>
        </div>
        <button className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-700 transition">
          View Full Profile
        </button>
      </div>
    </div>
  );
};

export default ApplicantCard;
