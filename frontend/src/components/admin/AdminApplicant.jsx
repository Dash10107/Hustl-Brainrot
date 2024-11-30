import React from "react";

const ApplicantCard = ({ applicant }) => {
  const { name, email, phone, insights, rankingScore } = applicant;

  return (
    <div className="bg-white shadow-md rounded-lg p-6 space-y-4 border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      {/* Applicant Basic Info */}
      <div className="flex items-center space-x-4">
        <div className="bg-gray-100 h-12 w-12 rounded-full flex items-center justify-center text-gray-600 font-bold uppercase">
          {name} {/* Display initials */}
        </div>
        <div>
          <h4 className="text-lg font-medium text-gray-900">{name}</h4>
          <p className="text-sm text-gray-600">{email}</p>
        </div>
      </div>

      {/* Contact Info */}
      <div className="text-sm text-gray-600">
        <span className="font-semibold text-gray-800">Phone:</span> {phone}
      </div>

      {/* Insights Section */}
      <div>
        <h5 className="font-semibold text-gray-800">Professional Brand:</h5>
        <ul className="list-disc list-inside text-gray-700 space-y-1">
          <li>
            <span className="font-medium">Strengths:</span> {insights?.professionalBrand.strengths}
          </li>
          <li>
            <span className="font-medium">Engagement:</span> {insights?.professionalBrand.onlineEngagement}
          </li>
          <li>
            <span className="font-medium">Development Areas:</span> {insights?.professionalBrand.developmentAreas}
          </li>
        </ul>
      </div>

      {/* Ranking Section */}
      <div>
        <h5 className="font-semibold text-gray-800">Ranking:</h5>
        <p className="text-gray-700">
          <span className="font-medium">Score:</span> {rankingScore?.score}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Evaluation:</span> {rankingScore?.evaluation}
        </p>
        <p className="text-gray-700">
          <span className="font-medium">Explanation:</span> {rankingScore?.explaination}
        </p>
      </div>

      {/* CTA */}
      <div className="pt-4 flex justify-end">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition duration-300"
        type="button"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default ApplicantCard;
