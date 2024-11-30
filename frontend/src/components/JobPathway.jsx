import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { 
  Target, 
  Clock, 
  Star, 
  Book, 
  Award, 
  TrendingUp,
  CheckCircle 
} from 'lucide-react';

const PathwaySection = ({ icon: Icon, title, items }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="border rounded-lg p-4 bg-gray-100 shadow-sm">
      <div className="flex items-center mb-3">
        <Icon className="mr-2 text-blue-600" />
        <h3 className="font-semibold text-lg text-gray-800">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li 
            key={index} 
            className="flex items-center text-gray-700 pl-6 relative"
          >
            <CheckCircle className="absolute left-0 text-green-500 w-5 h-5" />
            {item.includes('**') 
              ? <>
                  <strong>{item.split('**')[1]}:</strong> {item.replace(/\*\*.*?\*\*/g, "")}
                </>
              : item
            }
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
        // const response = await axios.get(
        //   `http://localhost:8000/api/v1/ai/jobs/${jobId}/pathway`
        // );
        // if (response?.status === 200) {
        //   setData(response.data);
        // } else {
        //   setError("Failed to fetch data.");
        // }
        const response = {
            "pathway": {
                "status": "success",
                "job": {
                    "id": "6749cf17dc0267ae9d4c5c8e",
                    "title": "Full Stack Developer",
                    "description": "Job description Key Responsibilities: • Coding prowess: A deep understanding of JavaScript, HTML, and CSS. • Framework mastery: Rock-solid experience with Node.js and React. • Database wizardry: Knowledge of database management systems and ORM tools. • API ninja: Experience with RESTful APIs and API design principles. • Version control guru: Familiarity with Git. • Problem-solving skills: The ability to conquer any coding challenge. • Team player: A knack for working collaboratively. • Progressive web app expertise: Building apps that work seamlessly across devices. • Cloud ninja: Experience with Kubernetes and AWS/GCP. • Testing prowess: Familiarity with testing frameworks. • Serverless wizardry: Knowledge of serverless architectures.",
                    "requirements": [
                        "Python",
                        " Node.js",
                        " React "
                    ]
                },
                "pathStr": "**Skills:**\n\n* JavaScript\n* HTML\n* CSS\n* Node.js\n* React\n* Database Management Systems (e.g., MySQL, PostgreSQL)\n* Object-Relational Mapping (ORM) tools\n* RESTful APIs\n* API Design Principles\n* Git\n* Problem-Solving\n* Team Collaboration\n* Progressive Web App Development\n* Cloud Technologies (e.g., Kubernetes, AWS/GCP)\n* Testing Frameworks\n* Serverless Architectures\n\n**Certifications**:\n\n* **Coursera:**\n    * Full-Stack Web Development with React Specialization\n    * Node.js for Full-Stack Web Development\n* **Udemy:**\n    * The Complete Full Stack Web Development Course 2023\n    * React - The Complete Guide (incl Hooks, React Router, Redux)\n* **edX:**\n    * Microsoft Professional Program in Full Stack Engineering with Node.js and React\n    * IBM Professional Certificate in Full Stack Web Development\n\n**Timeline:**\n\n* **Junior Full Stack Developer:**\n    * Develop fundamental skills in JavaScript, HTML, CSS, and Node.js.\n    * Complete online courses or certifications in Full-Stack Web Development.\n    * Build a portfolio of personal projects.\n* **Mid-Level Full Stack Developer:**\n    * Gain experience with advanced frameworks like React and database management systems.\n    * Obtain certifications in Full-Stack Web Development with React and Node.js.\n    * Contribute to open-source projects or freelance to showcase skills.\n* **Senior Full Stack Developer:**\n    * Master cloud technologies, testing frameworks, and serverless architectures.\n    * Lead development projects and mentor junior developers.\n    * Participate in industry conferences and workshops.\n\n**Potential Roles:**\n\n* Web Developer\n* Front-End Developer\n* Back-End Developer\n* Software Engineer\n\n**Tips:**\n\n* Stay updated with the latest technologies and trends in full-stack development.\n* Build a strong portfolio that showcases your skills and projects.\n* Network with other developers and attend industry events.\n* Seek mentorship from experienced professionals in the field.\n* Continuously improve your problem-solving abilities and communication skills.\n* Embrace agile methodologies and contribute to team collaboration.",
                "pathJson": {
                    "Skills:": [
                        "* JavaScript",
                        "* HTML",
                        "* CSS",
                        "* Node.js",
                        "* React",
                        "* Database Management Systems (e.g., MySQL, PostgreSQL)",
                        "* Object-Relational Mapping (ORM) tools",
                        "* RESTful APIs",
                        "* API Design Principles",
                        "* Git",
                        "* Problem-Solving",
                        "* Team Collaboration",
                        "* Progressive Web App Development",
                        "* Cloud Technologies (e.g., Kubernetes, AWS/GCP)",
                        "* Testing Frameworks",
                        "* Serverless Architectures"
                    ],
                    "Certifications:": [
                        "* **Coursera:**",
                        "* Full-Stack Web Development with React Specialization",
                        "* Node.js for Full-Stack Web Development",
                        "* **Udemy:**",
                        "* The Complete Full Stack Web Development Course 2023",
                        "* React - The Complete Guide (incl Hooks, React Router, Redux)",
                        "* **edX:**",
                        "* Microsoft Professional Program in Full Stack Engineering with Node.js and React",
                        "* IBM Professional Certificate in Full Stack Web Development"
                    ],
                    "Timeline:": [
                        "* **Junior Full Stack Developer:**",
                        "* Develop fundamental skills in JavaScript, HTML, CSS, and Node.js.",
                        "* Complete online courses or certifications in Full-Stack Web Development.",
                        "* Build a portfolio of personal projects.",
                        "* **Mid-Level Full Stack Developer:**",
                        "* Gain experience with advanced frameworks like React and database management systems.",
                        "* Obtain certifications in Full-Stack Web Development with React and Node.js.",
                        "* Contribute to open-source projects or freelance to showcase skills.",
                        "* **Senior Full Stack Developer:**",
                        "* Master cloud technologies, testing frameworks, and serverless architectures.",
                        "* Lead development projects and mentor junior developers.",
                        "* Participate in industry conferences and workshops."
                    ],
                    "Potential Roles:": [
                        "* Web Developer",
                        "* Front-End Developer",
                        "* Back-End Developer",
                        "* Software Engineer"
                    ],
                    "Tips:": [
                        "* Stay updated with the latest technologies and trends in full-stack development.",
                        "* Build a strong portfolio that showcases your skills and projects.",
                        "* Network with other developers and attend industry events.",
                        "* Seek mentorship from experienced professionals in the field.",
                        "* Continuously improve your problem-solving abilities and communication skills.",
                        "* Embrace agile methodologies and contribute to team collaboration."
                    ]
                },
                "certifications": [
                    {
                        "title": "Top Certifications for Full Stack Developers in 2024 (Ranked)",
                        "link": "https://www.tealhq.com/certifications/full-stack-developer"
                    },
                    {
                        "title": "10 Best Full Stack Developer Certifications (Online)",
                        "link": "https://www.reliablesoft.net/best-full-stack-developer-certifications/"
                    },
                    {
                        "title": "Full Stack Certification? : r/learnprogramming",
                        "link": "https://www.reddit.com/r/learnprogramming/comments/1780ezi/full_stack_certification/"
                    },
                    {
                        "title": "10 Best Full Stack Developer Courses [2025]",
                        "link": "https://www.geeksforgeeks.org/best-full-stack-developer-courses/"
                    },
                    {
                        "title": "What is the most recommended certification for becoming ...",
                        "link": "https://www.quora.com/What-is-the-most-recommended-certification-for-becoming-a-full-stack-developer-How-much-does-it-typically-cost-to-obtain-these-certifications"
                    },
                    {
                        "title": "Top 10 Full-Stack Development Certifications to Earn in 2024",
                        "link": "https://www.nucamp.co/blog/coding-bootcamp-full-stack-web-and-mobile-development-top-10-fullstack-development-certifications-to-earn-in-2024"
                    },
                    {
                        "title": "Full Stack Web Development Courses Online",
                        "link": "https://www.coursera.org/courses?query=full%20stack%20web%20development"
                    },
                    {
                        "title": "Top 3 Must-Have Certifications for a Full-Stack Developer",
                        "link": "https://www.linkedin.com/pulse/top-3-must-have-certifications-full-stack-developer-myexamcloud"
                    },
                    {
                        "title": "15 Best Full Stack Developer Courses Online - 2024",
                        "link": "https://www.interviewbit.com/blog/best-full-stack-developer-courses/"
                    }
                ]
            }
        }
        setData(response.pathway);
      } catch (err) {
        setError(err.message || "Error fetching data.");
      } finally {
        setLoading(false);
      }
    };
    fetchCareerPathway();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-10">
        Loading career pathway...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        Error: {error}
      </div>
    );
  }

  // Safely access nested data
  const pathJson = data?.pathJson || {};
  const job = data?.job || {};
  const certifications = data?.certifications || [];

  return (
    <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 min-h-screen">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-xl overflow-hidden">
        {/* Job Header */}
        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-3xl font-bold">{job.title || "Job Title"}</h1>
          <p className="mt-2 text-blue-100">{job.description || "Job description not available."}</p>
        </div>

        {/* Career Pathway Sections */}
        <div className="p-6 space-y-6">
          <PathwaySection 
            icon={Target} 
            title="Skills" 
            items={pathJson.Skills} 
          />

          <PathwaySection 
            icon={TrendingUp} 
            title="Career Stages" 
            items={[
              ...((pathJson['Beginner (1-2 years):'] || []).map(item => item)),
              ...((pathJson['Mid-level (3-5 years):'] || []).map(item => item)),
              ...((pathJson['Senior (6+ years):'] || []).map(item => item))
            ]} 
          />

          <PathwaySection 
            icon={Star} 
            title="Potential Roles" 
            items={pathJson['Potential Roles']} 
          />

          <PathwaySection 
            icon={Book} 
            title="Tips" 
            items={pathJson.Tips} 
          />

          {/* Certifications Section */}
          <div className="border rounded-lg p-4 bg-gray-100 shadow-sm">
            <div className="flex items-center mb-3">
              <Award className="mr-2 text-blue-600" />
              <h3 className="font-semibold text-lg text-gray-800">Recommended Certifications</h3>
            </div>
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
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      <CheckCircle className="mr-2 text-green-500" />
                      {cert.title}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No certifications found for this role.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPathway;