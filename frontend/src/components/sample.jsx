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