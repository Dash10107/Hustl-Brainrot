import { CircularProgress, Box, Typography } from "@mui/material";

const truncateText = (text, maxLength) => {
  if (!text || text.length <= maxLength) return text;
  return `${text.slice(0, maxLength)}...`;
};

const ApplicantCard = ({ applicant, insights, rankingScore }) => {
  const { fullname, email, skills } = applicant;
  const { relevanceScore, professionalBrand, summary, sentiment } = insights;
  const { score, explanation, social_profile_insights_details } = rankingScore;

  return (
    <div className="bg-white shadow-xl rounded-lg p-6 border border-gray-200 w-full transform transition-all hover:scale-103 hover:shadow-2xl duration-300">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 ">{fullname}</h2>
        <span
          className={`text-sm font-medium px-2 py-1 rounded-full ${
            sentiment === "positive"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {sentiment}
        </span>
      </div>

      {/* Skills Section */}
      <div className="mb-4 mx-auto bg-white border border-gray-200 rounded-2xl p-4">
        <h3 className="text-lg font-semibold text-gray-800 ">Key Skills:</h3>
        <ul className="flex flex-wrap gap-2 mt-2">
          {skills.map((skill, index) => (
            <li
              key={index}
              className="bg-blue-100 text-blue-700 text-xs font-medium px-2 py-1 rounded-full transition-colors duration-300 hover:bg-blue-200"
            >
              {skill}
            </li>
          ))}
        </ul>
      </div>
      <div className="mb-4 mx-auto bg-white border border-gray-200 rounded-2xl p-4 ">
      <div className="flex justify-between items-center">
        {/* Professional Brand */}
        <div className="mb-4 w-2/3 ">
          <h3 className="text-lg font-semibold text-gray-800 ">Professional Brand:</h3>
          <p className="text-gray-700 text-sm mt-1 font-medium">
            <strong>Strengths:</strong> {truncateText(professionalBrand.strengths, 50)}
          </p>
          <p className="text-gray-700 text-sm mt-1 font-medium">
            <strong>Engagement:</strong> {truncateText(professionalBrand.onlineEngagement, 50)}
          </p>
          <p className="text-gray-700 text-sm mt-1 font-medium">
            <strong>Development Areas:</strong>{" "}
            {truncateText(professionalBrand.developmentAreas, 50)}
          </p>
        </div>

        {/* Relevance Score */}
        <div className="mb-4 flex flex-col items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-600 py-2">Relevance Score:</h3>
          <Box
            sx={{ position: "relative", display: "inline-flex", alignItems: "center" }}
          >
            <CircularProgress
              variant="determinate"
              value={relevanceScore}
              size={100}
              thickness={4}
              sx={{ color: "#2463EB" }}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: "absolute",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                variant="caption"
                component="div"
                color="text.secondary"
                fontWeight="bold"
                fontSize={"20px"}
              >
                {relevanceScore}%
              </Typography>
            </Box>
          </Box>
        </div>
      </div>
      </div>

      {/* Social Profiles */}
      <div className="mb-4 w-full mx-auto bg-white border border-gray-200 rounded-2xl p-4">
        <h3 className="text-lg font-semibold text-gray-800 ">Social Profiles:</h3>
        <ul className="mt-2 text-gray-700 text-sm font-medium">
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
      <div className="mb-4 w-full mx-auto bg-white border border-gray-200 rounded-2xl p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Application Summary:</h3>
        <p className="text-gray-700 text-sm mt-1">{truncateText(summary, 100)}</p>
      </div>

      {/* Contact Information */}
      <div className="flex items-center justify-between border-t pt-4">
        <div>
          <h4 className="text-lg font-semibold text-gray-800">Contact:</h4>
          <p className="text-gray-700 text-sm">{email}</p>
        </div>
        <button className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded hover:bg-blue-700 transition-all duration-300">
          View Full Profile
        </button>
      </div>
      </div>
    </div>
  );
};

export default ApplicantCard;
