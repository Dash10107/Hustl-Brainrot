import express from "express";
import { generateJobPathway,getApplicantsWithAI } from "../controllers/ai.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router = express.Router();



router.get("/jobs/:id/pathway", async (req, res) => {
    try {
        const jobId = req.params.id;
        const pathway = await generateJobPathway(jobId);
        res.status(200).json({ pathway });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get("/jobs/:id/applicants", getApplicantsWithAI);



export default router;