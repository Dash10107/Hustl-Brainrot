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

const applicationPromptTemplate = `
You are an AI designed to evaluate job applicants for a given role. Your task is to assess how well an applicant's resume matches the job requirements and their skillset. Please follow these instructions carefully:

1. **Job Requirements**: {jobRequirements}  
   These are the key skills and qualifications the employer is looking for in a candidate.

2. **Applicant Skills**: {skills}  
   These are the skills the applicant has listed in their resume.

3. **Resume Text**: {resumeText}  
   This is the full text from the applicant's resume. It may contain detailed experiences, qualifications, and other information.

   4. **Social Profile Insights**: {socialProfiles}  
 Applicant's professional online profiles like github and linkedin.

**Evaluation Instructions**:
- Conduct a holistic assessment using the resume, skills, and social profile insights.
- Match the **Applicant Skills** with the **Job Requirements** to calculate the relevance score.
- Identify the exact **skills matched** between the two sets and list them.
- Identify any **missing skills** that the applicant lacks according to the job requirements and list them.
- Assess the applicant's professional branding and online reputation.
- Provide context on the applicant's additional professional activities and achievements.
- Provide a **summary** of the applicant's suitability for the role based on their resume.
- Include a **sentiment** assessment based on the resume’s tone. This should be one of the following values: **positive**, **neutral**, or **negative**. If the sentiment is unclear, consider it **neutral**.

Please provide your response as a **JSON object** in this format:
    "relevanceScore":   // Score the relevance between the job requirements and the applicant's resume (0 = no match, 100 = perfect match)
    "skillMatch": "",  // List of skills that match between the job requirements and applicant's skills
    "missingSkills": "",  // List of job requirements that the applicant is missing
    "professionalBrand": // Assessment of the applicant's professional branding and online reputation
        "strengths": "",  // Key professional attributes
        "onlineEngagement": "",  // Summary of professional online activities
        "developmentAreas": ""  // Potential areas for growth
    ,
    "summary": "",  // A brief explanation of why the applicant is a good or bad fit

    "sentiment": ""  // Sentiment analysis based on resume content (consider tone, confidence, and wording)


**Important Notes**:
- If there are no missing skills, you can leave the missingSkills\ array empty: [].
- If no skills match, the skillMatch array should be empty: [].
- If the resume is very general or lacks information, indicate that in the summary and adjust the relevanceScore accordingly.
- Ensure that the sentiment is based on the overall tone of the resume: Look for any signs of enthusiasm, confidence, or negativity.

Make sure to provide detailed and thoughtful insights, as this will be used to help evaluate the applicant for the job.
`;




// Prompt Template for Career Pathway
const careerPathwayTemplate = `
You are an advanced career advisor AI specializing in actionable career pathways for job seekers.

Job Title: {title}
Job Description: {description}
Requirements: {requirements}


Create a detailed career pathway for this role. Include:
1. Recommended skills to develop.
2. Certifications or courses to take (platforms like Coursera, Udemy, etc.).
3. A step-by-step timeline for progression.
4. Examples of potential job titles leading to this role.
5. Tips for excelling in this career.

**Format:**
- **Skills**: [list of skills]
- **Certifications**: [list of certifications or courses]
- **Timeline**: [step-by-step progression]
- **Potential Roles**: [list of roles]
- **Tips**: [career tips]
`;

const rankingPromptTemplate = `
You are an advanced AI system responsible for comprehensively ranking job applicants across multiple evaluation dimensions. Your role is to analyze the AI-generated insights, including the applicant's resume and social profile information, to provide a detailed and nuanced ranking score between 0 and 100.

Evaluation Metrics and Weights:
1. **Skill Match (25%)**: Alignment of technical and professional skills with job requirements
2. **Relevance of Experience (20%)**: Depth and relevance of professional experience
3. **Resume Quality (15%)**: Structure, clarity, and presentation of professional achievements
4. **Missing Skills Impact (10%)**: Assessment of skill gaps and their potential significance
5. **Soft Skills and Professional Qualities (10%)**: Evaluation of interpersonal and adaptive capabilities
6. **Social Profile Insights (20%)**: Comprehensive analysis of online professional presence
   - GitHub/Code Repositories: Quality of projects, contributions, technical depth
   - LinkedIn: Professional network, endorsements, recommendations
   - Personal Portfolio: Demonstrated skills, personal branding, additional projects
7. **Professional Continuous Learning (10%)**: Evidence of ongoing skill development, certifications, side projects

Detailed Evaluation Criteria for Social Profile Insights:
- Technical Contribution Quality
- Consistency of Professional Narrative
- Open Source Contributions
- Project Complexity and Innovation
- Community Engagement
- Professional Network Strength
- Visibility of Professional Growth

Input for Evaluation:
{aiInsights}

### Comprehensive Ranking Instructions:
- Conduct a holistic assessment integrating resume and social profile information
- Provide a granular breakdown of how each metric contributes to the final score
- Emphasize the interconnection between traditional resume metrics and online professional presence
- Ensure the scoring reflects both quantitative skills and qualitative professional attributes

### Output Format:
Provide your output in the following strict JSON format:


  "score": score, 
  "explanation": "explanation",
  "granular_breakdown": 

      "skill_match": score,
    "relevance_of_experience": score,
    "resume_quality": score,
    "missing_skills_impact": score,
    "soft_skills_and_professional_qualities": score,
    "social_profile_insights": score,
    "professional_continuous_learning": score
  ,
  "social_profile_insights_details": 
    "github": "details",
    "linkedin": "details",
    "portfolio": "details"
  


Where:
- **score**: A numerical score between 0 and 100 representing the overall ranking of the applicant.
- **explanation**: A concise explanation (1-2 sentences) highlighting the key factors that contributed to the overall score. It should focus on strengths and weaknesses.
- **granular_breakdown**: A dictionary containing the detailed breakdown of the score across different evaluation metrics.
- **social_profile_insights_details**: A dictionary containing specific details derived from the applicant's social profiles (e.g., GitHub, LinkedIn, and Portfolio). Each key corresponds to a specific profile, and the value provides detailed insights into the impact of that profile on the score.
`;

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

    // const certifications = searchResults?.ads?.map((result) => ({
    //         title: result.title,
    //         link: result.link
    //     }));

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

