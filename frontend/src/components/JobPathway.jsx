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
        return "border-yellow-500 bg-yellow-400";
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
                            className="opacity-0 group-hover:opacity-100 transition-opacity absolute top-0 left-1/2 w-full mx-auto bg-white border border-gray-200 rounded-2xl p-4 transform-translate-x-1/2 -translate-y-full bg-gray-100 text-sm shadow-md rounded-md p-2"
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
        <div className="w-[80vw]  bg-white border border-gray-200 rounded-2xl p-4">
          <h2 className="text-lg font-bold text-gray-700">Certifications</h2>
          <ul className="space-y-2">
            {response.pathway.certifications.map((cert, index) => (
              <li key={index} className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all">
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Learn more about ${cert.title}`}
                  className="text-blue-600 hover:underline flex items-center"
                >
                  {cert.title}
                </a>
              </li>
            ))}
            </ul>
        </div>
      </div>
    </div>
  );
};

export default JobPathway;
