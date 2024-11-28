import { Job } from "../models/job.model.js";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config({});  // Load environment variables

// API key for Gemini AI
const geminiApiKey = process.env.GEMINI_API_KEY;  // Store your Gemini API key in your .env file
import  { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(geminiApiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
// Helper function to generate the job pathway using Gemini AI

export const generateJobPathway = async (jobId) => {
    try {
        // Fetch job details from the database
        const job = await Job.findById(jobId);
        if (!job) {
            throw new Error("Job not found");
        }

        // Prepare the prompt for the Gemini AI model
        const prompt = `
        You are a career advisor AI specializing in creating actionable career pathways for job seekers.

        Job Title: ${job.title}
        Job Description: ${job.description}
        Requirements: ${job.requirements.join(", ")}

        Create a detailed career pathway for this role. Include:
        1. Recommended skills to develop.
        2. Certifications or courses to take (platforms like Coursera, Udemy, etc.).
        3. A step-by-step timeline for progression (e.g., Entry-level to Senior-level roles).
        4. Examples of potential job titles leading to this role (e.g., Intern > Junior Analyst > Data Scientist).
        5. Tips for excelling in this career.

        **Return only the career pathway in the following format:**
        - **Skills**: [list of skills]
        - **Certifications**: [list of certifications or courses]
        - **Timeline**: [step-by-step progression]
        - **Potential Roles**: [list of roles]
        - **Tips**: [career tips]
        `;

        const result = await model.generateContent(prompt);
        const pathWayText = result.response.candidates[0].content.parts[0].text;

        
        return pathWayText;

    } catch (error) {
        console.error("Error generating job pathway:", error);
        throw new Error("Failed to generate job pathway");
    }
};
