import dotenv from "dotenv";
import { Job } from "../models/job.model.js";
import { User } from "../models/user.model.js";
import { Application } from "../models/application.model.js";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import {  LLMChain } from "langchain/chains";
import { PromptTemplate } from "@langchain/core/prompts";
import { getJson } from "serpapi";
import axios from "axios";
import { fetchResumeText } from "../utils/parseResume.js";
import { applicationPromptTemplate, careerPathwayTemplate, rankingPromptTemplate } from "../utils/prompt.templates.js";


dotenv.config(); // Load environment variables
// Initialize Gemini
const llm = new ChatGoogleGenerativeAI({
  apiKey: process.env.GEMINI_API_KEY,
  model: "gemini-pro",
  maxOutputTokens: 2048,
});


function parseToJson(input) {
  const sections = input.split(/\n(?=\*\*)/).filter(Boolean);
  const result = {};

  // biome-ignore lint/complexity/noForEach: <explanation>
  sections.forEach(section => {
      const [headerLine, ...contentLines] = section.split('\n').filter(Boolean);
      const header = headerLine.replace(/\*\*/g, '').trim(); // Extract the header
      const content = contentLines.map(line => {
          if (line.startsWith('- **')) {
              // For Timeline key-value items
              const [key, value] = line.slice(2).split(':').map(str => str.trim());
              return { [key]: value };
          }
          return line.replace(/^- /, '').trim(); // For regular list items
      });

      result[header] = content.flat();
  });

  return result;
}



// LangChain PromptTemplate setup
const prompt = new PromptTemplate({
  template: careerPathwayTemplate,
  inputVariables: ["title", "description", "requirements"],
});

const applicationPrompt = new PromptTemplate({
  template: applicationPromptTemplate,
  inputVariables: ["jobRequirements", "skills", "resumeText","socialProfiles"],

});

const rankingPrompt = new PromptTemplate({
  template: rankingPromptTemplate,
  inputVariables: ["aiInsights"],
});

// Async function to generate the career pathway
export const generateJobPathway = async (jobId) => {
  try {
    // Step 1: Fetch Job Details
    const job = await Job.findById(jobId);
    if (!job) throw new Error("Job not found");

    // Step 2: Generate Career Pathway using LangChain
    const chain = new LLMChain({ llm, prompt });
    const initialPathway = await chain.call({
      title: job.title,
      description: job.description,
      requirements: job.requirements.join(", "),
    });

    // Step 3: Fetch Live Certifications using SerpAPI
    const query = `Top certifications or courses for ${job.title}`;
    const searchResults = await getJson({
      engine: "google",
      q: query,
      api_key: process.env.SERP_API_KEY,
      });


    const certifications = searchResults?.organic_results?.map((result) => ({
      title: result.title,
      link: result.link
    }));
      const  properPathWay = parseToJson(initialPathway.text.trim());
    // Step 4: Combine and Return Results
    return {
      status: "success",
      job: {
        id: job._id,
        title: job.title,
        description: job.description,
        requirements: job.requirements,
      },
      pathStr: initialPathway.text.trim(),
      pathJson : properPathWay,
      certifications,
    };
  } catch (error) {
    console.error("Error generating job pathway:", error);
    return {
      status: "error",
      message: error.message,
    };
  }
};





// Route to get AI-enhanced applicants for a job
export const getApplicantsWithAI = async (req, res) => {
  try {
      const jobId = req.params.id;

      // Fetch job and applicants
      const job = await Job.findById(jobId).populate({
          path: 'applications',
          options: { sort: { createdAt: -1 } },
          populate: {
              path: 'applicant',
          }
      });

      if (!job) {
          return res.status(404).json({
              message: 'Job not found.',
              success: false
          });
      }

      // Extract job details for matching
      const jobRequirements = job.requirements;

      // Process each applicant with AI
      const processedApplicants = await Promise.all(
          job.applications.map(async (application) => {
              const applicant = application.applicant;
              const socials =  applicant.profile.socialLinks;

              // Parse resume (assuming resumes are stored as URLs)
              const resumeText = await fetchResumeText(applicant.profile.resume);

              // Step 1: Generate AI insights
              const insightsChain = new LLMChain({ llm, prompt: applicationPrompt });
              const insightsResponse = await insightsChain.call({
                  jobRequirements: jobRequirements.join(", "),
                  skills: applicant.profile.skills.join(", "),
                  resumeText: resumeText,
                  socialProfiles: socials.join(", ")

              });

              const aiInsights = insightsResponse.text.trim();



              const rankingChain = new LLMChain({ llm, prompt: rankingPrompt });
              const rankingResponse = await rankingChain.call({
                  aiInsights: aiInsights,
              });

              const rankingScore = rankingResponse.text.trim();

              // Return the structured output
              return {
                  applicant: {
                      id: applicant._id,
                      fullname: applicant.fullname,
                      email: applicant.email,
                      skills: applicant.profile.skills,
                  },
                  insights: aiInsights,
                  rankingScore: rankingScore,
              };
          })
      );

      // Sort applicants by ranking score in descending order
      processedApplicants.sort((a, b) => b.rankingScore - a.rankingScore);

      return res.status(200).json({
          job: {
              id: job._id,
              title: job.title,
              description: job.description,
          },
          applicants: processedApplicants,
          success: true,
      });

  } catch (error) {
      console.error("Error in AI-enhanced applicants route:", error);
      return res.status(500).json({
          message: "Internal Server Error",
          success: false,
      });
  }
};


