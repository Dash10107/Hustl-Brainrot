import { Link } from "react-router-dom";
import { ActiveBookSvg, ActiveDumbbellSvg, ActiveTreasureSvg, ActiveTrophySvg, CheckmarkSvg, FastForwardSvg, GoldenBookSvg, GoldenDumbbellSvg, GoldenTreasureSvg, GoldenTrophySvg, GuidebookSvg, LessonCompletionSvg0, LessonCompletionSvg1, LessonCompletionSvg2, LessonCompletionSvg3, LockedBookSvg, LockedDumbbellSvg, LockedTreasureSvg, LockedTrophySvg, LockSvg, StarSvg } from "./Svg";
import { useEffect, useRef, useState } from "react";

const UnitHeader = ({
    unitNumber,
    description,
    backgroundColor,
    borderColor,
  }) => {
    const language = "en"
    return (
      <article
        className={["max-w-2xl text-white sm:rounded-xl", backgroundColor].join(
          " ",
        )}
      >
        <header className="flex items-center justify-between gap-4 p-4">
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">Unit {unitNumber}</h2>
            <p className="text-lg">{description}</p>
          </div>
          <Link
            href={`https://duolingo.com/guidebook/${language.code}/${unitNumber}`}
            className={[
              "flex items-center gap-3 rounded-2xl border-2 border-b-4 p-3 transition hover:text-gray-100",
              borderColor,
            ].join(" ")}
          >
            <GuidebookSvg />
            <span className="sr-only font-bold uppercase lg:not-sr-only">
              Guidebook
            </span>
          </Link>
        </header>
      </article>
    );
  };


  const TileIcon = ({
    tileType,
    status,
  })=> {
    switch (tileType) {
      case "star":
        return status === "COMPLETE" ? (
          <CheckmarkSvg />
        ) : status === "ACTIVE" ? (
          <StarSvg />
        ) : (
          <LockSvg />
        );
      case "book":
        return status === "COMPLETE" ? (
          <GoldenBookSvg />
        ) : status === "ACTIVE" ? (
          <ActiveBookSvg />
        ) : (
          <LockedBookSvg />
        );
      case "dumbbell":
        return status === "COMPLETE" ? (
          <GoldenDumbbellSvg />
        ) : status === "ACTIVE" ? (
          <ActiveDumbbellSvg />
        ) : (
          <LockedDumbbellSvg />
        );
      case "fast-forward":
        return status === "COMPLETE" ? (
          <CheckmarkSvg />
        ) : status === "ACTIVE" ? (
          <StarSvg />
        ) : (
          <FastForwardSvg />
        );
      case "treasure":
        return status === "COMPLETE" ? (
          <GoldenTreasureSvg />
        ) : status === "ACTIVE" ? (
          <ActiveTreasureSvg />
        ) : (
          <LockedTreasureSvg />
        );
      case "trophy":
        return status === "COMPLETE" ? (
          <GoldenTrophySvg />
        ) : status === "ACTIVE" ? (
          <ActiveTrophySvg />
        ) : (
          <LockedTrophySvg />
        );
    }
  };

  const HoverLabel = ({ details, className, index }) => {
    const fixedWidth = 500; // Set a fixed width for all HoverLabels
    const isEven = index % 2 === 0;

    return (
        <div
            className={`absolute z-10 rounded-lg border-2 border-gray-200 bg-white px-5 py-4 shadow-lg ${className}`}
            style={{
                top: "50%",
                width: `${fixedWidth}px`, // Set fixed width
                left: isEven ? `-${fixedWidth + 40}px` : `calc(100% + 40px)`, // Adjust for left or right
                transform: "translateY(-50%)", // Center vertically
            }}
        >
            <h3 className="text-lg font-bold mb-2">Skills</h3>
            <ul className="list-disc ml-5 mb-4">
                {details?.Skills?.map((skill, index) => (
                    <li key={index} className="text-sm">
                        {skill}
                    </li>
                ))}
            </ul>

            <h3 className="text-lg font-bold mb-2">Tasks</h3>
            <ul className="list-disc ml-5">
                {details?.Tasks?.map((task, index) => (
                    <li key={index} className="text-sm">
                        {task}
                    </li>
                ))}
            </ul>

            <div
                className="absolute h-3 w-3 rotate-45 border-b-2 border-r-2 border-gray-200 bg-white"
                style={{
                    [isEven ? 'right' : 'left']: "-8px", // Align arrow to the correct side
                    top: "50%", // Center the arrow vertically
                    transform: "translateY(-50%)",
                }}
            ></div>
        </div>
    );
};


  const LessonCompletionSvg = ({
    lessonsCompleted,
    status,
    style = {},
  }) => {
    if (status !== "ACTIVE") {
      return null;
    }
    switch (lessonsCompleted % 4) {
      case 0:
        return <LessonCompletionSvg0 style={style} />;
      case 1:
        return <LessonCompletionSvg1 style={style} />;
      case 2:
        return <LessonCompletionSvg2 style={style} />;
      case 3:
        return <LessonCompletionSvg3 style={style} />;
      default:
        return null;
    }
  };
  

 export { UnitHeader , TileIcon , HoverLabel, LessonCompletionSvg }; 