import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { response } from "./response";
import "./pathway.css";
import { HoverLabel, LessonCompletionSvg, TileIcon, UnitHeader } from "./pathwayComp";
import Navbar from "./shared/Navbar";

const JobPathway = () => {
  const { id: jobId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCareerPathway = async () => {
      try {
        console.log("Fetching data for jobId:", jobId);
        setData(response.pathway.pathJson); // Mock data
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



  const tileLeftClassNames = [
    "left-0",
    "left-[-45px]",
    "left-[-70px]",
    "left-[-45px]",
    "left-[45px]",
    "left-[135px]",

  ]

  const getTileLeftClassName = ({ index,unitNumber, tilesLength }) => {
    
    const classNames =
    unitNumber % 2 === 1
      ? tileLeftClassNames
      : [...tileLeftClassNames.slice(4), ...tileLeftClassNames.slice(0, 4)];

  return classNames[index % classNames.length] ?? "left-0";

  };

  const getTileColors = ({ tileType, status, defaultColors }) => {
    switch (status) {
      case "LOCKED":
        if (tileType === "fast-forward") return defaultColors;
        return "border-gray-300 bg-gray-200";
      case "COMPLETE":
        return "border-blue-500 bg-blue-400";
      case "ACTIVE":
        return defaultColors;
      default:
        return "";
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <Navbar/>
      {/* heading */}
      <div className="text-center">
        <h1 className="text-3xl font-bold">Pathway for </h1>
        <p className="mt-2 text-lg font-normal text-gray-700">{response.pathway.job.title}</p>
      </div>
      <div className="relative mb-8 mt-8 flex flex-col items-center gap-6 max-w-3xl mx-auto">
      {Object.entries(data).map(([timeframe, details], i) =>{
        // console.log(timeframe, details);
          const status = "ACTIVE"; // Mock status
          return (
            <Fragment key={i}>
              {(() => {
                switch (details.type) {
                  case "star":
                  case "book":
                  case "trophy":
                  case "fast-forward":
                    return (
                      <div
                        className={[
                          "relative h-24 w-24",
                          getTileLeftClassName({
                            index: i,
                            unitNumber: details.unitNumber,
                            tilesLength: details.Skills.length,
                          }),
                        ].join(" ")}
                      >
                        <div className="relative group">
                          <button
                            type="button"
                            className={[
                              "absolute rounded-full border-4 p-4 hover:scale-110 transition-transform",
                              getTileColors({
                                tileType: details.type,
                                status,
                                defaultColors: `${details.borderColor} ${details.backgroundColor}`,
                              }),
                            ].join(" ")}
                          >
                            
                            <TileIcon tileType={details.type} status={status} />
                          </button>
                          <HoverLabel
                            details={details}
                            textColor="text-gray-700"
                            className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-0 left-1/2 w-full mx-auto bg-white border border-gray-200 rounded-2xl p-4 transform-translate-x-1/2 -translate-y-full text-sm shadow-md"
                          />
                        </div>
                      </div>
                    );
                  case "treasure":
                    return (
                      <div
                        className="relative h-24 w-24"
                        onClick={() => {
                          if (status === "ACTIVE") {
                            // Handle active treasure click
                          }
                        }}
                        tabIndex={status === "ACTIVE" ? 0 : undefined}
                        aria-hidden={status !== "ACTIVE"}
                        aria-label={status === "ACTIVE" ? "Collect reward" : ""}
                      >
                        <TileIcon tileType={tile.type} status={status} />
                      </div>
                    );
                  default:
                    return null;
                }
              })()}
            </Fragment>
          );
        })}

        {/* certifications */}
        <div className="w-[80vw] bg-white border border-gray-200 rounded-2xl p-6 mt-8 shadow-lg">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Certifications</h2>
          <div className="grid grid-cols-2 gap-4">
            {response.pathway.certifications.map((cert, index) => (
              <div 
                key={index} 
                className="bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-md transition-all transform hover:-translate-y-1"
              >
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Learn more about ${cert.title}`}
                  className="text-blue-600 hover:underline font-semibold flex items-center"
                >
                  {cert.title}
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-5 w-5 ml-2 text-blue-500" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default JobPathway;
