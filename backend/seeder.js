import mongoose from "mongoose";
import { faker } from '@faker-js/faker';
import { User } from './models/user.model.js';
import { Company } from './models/company.model.js';
import { Job } from './models/job.model.js';
import { Application } from './models/application.model.js';
import dotenv from "dotenv";
import connectDB from "./utils/db.js";

dotenv.config({});
const resumes = [
    "https://code.ics.uci.edu/wp-content/uploads/2020/06/Resume-Sample-1-Software-Engineer.pdf",
    "https://www.uvic.ca/career-services/_assets/docs/resume-computer-engineering.pdf",
    "https://monisha-jega.github.io/files/cv.pdf",
    "https://www.rit.edu/careerservices/sites/rit.edu.careerservices/files/docs/AlumniResumes/Computer%20Science%20Resume.pdf",
    "https://satu0king.github.io/resume.pdf",
]



// Seed Users
const seedUsers = async (count = 10) => {
    const users = [];
    for (let i = 0; i < count; i++) {
        const user = new User({
            fullname: faker.name.fullName(),
            email: faker.internet.email(),
            phoneNumber: faker.phone.number('##########'),
            password: faker.internet.password(),
            role: faker.helpers.arrayElement(['student', 'recruiter']),
            profile: {
                bio: faker.lorem.sentence(),
                skills: faker.helpers.uniqueArray(() => faker.lorem.word(), 3),
                resume: faker.helpers.arrayElement(resumes), 
                resumeOriginalName: "resume.pdf",
                profilePhoto: faker.image.avatar(),
            }
        });
        users.push(user);
    }
    await User.insertMany(users);
    console.log(`${count} users seeded`);
    return users;
};

// Seed Companies
const seedCompanies = async (users, count = 5) => {
    const companies = [];
    for (let i = 0; i < count; i++) {
        const company = new Company({
            name: faker.company.name(),
            description: faker.company.catchPhrase(),
            website: faker.internet.url(),
            location: faker.address.city(),
            logo: faker.image.avatar(),
            userId: faker.helpers.arrayElement(users)._id,
        });
        companies.push(company);
    }
    await Company.insertMany(companies);
    console.log(`${count} companies seeded`);
    return companies;
};

// Seed Jobs
const seedJobs = async (companies, count = 20) => {
    const jobs = [];
    for (let i = 0; i < count; i++) {
        const job = new Job({
            title: faker.name.jobTitle(),
            description: faker.lorem.paragraph(),
            requirements: faker.helpers.uniqueArray(() => faker.lorem.words(3), 5),
            salary: faker.number.int({ min: 30000, max: 150000 }),
            experienceLevel: faker.number.int({ min: 0, max: 10 }),
            location: faker.address.city(),
            jobType: faker.helpers.arrayElement(['Full-time', 'Part-time', 'Contract']),
            position: faker.number.int({ min: 1, max: 10 }),
            company: faker.helpers.arrayElement(companies)._id,
            created_by: faker.helpers.arrayElement(companies).userId,
        });
        jobs.push(job);
    }
    await Job.insertMany(jobs);
    console.log(`${count} jobs seeded`);
    return jobs;
};

// Seed Applications
const seedApplications = async (users, jobs, count = 50) => {
    const applications = [];
    for (let i = 0; i < count; i++) {
        const application = new Application({
            job: faker.helpers.arrayElement(jobs)._id,
            applicant: faker.helpers.arrayElement(users)._id,
            status: faker.helpers.arrayElement(['pending', 'accepted', 'rejected']),
        });
        applications.push(application);
    }
    await Application.insertMany(applications);
    console.log(`${count} applications seeded`);
};

// Execute Seeding
const seedDatabase = async () => {
    
    connectDB();
    // // Clear existing data

    await User.deleteMany();
    await Company.deleteMany();
    await Job.deleteMany();
    await Application.deleteMany();

    // Seed data
    const users = await seedUsers(20);
    const companies = await seedCompanies(users.filter(user => user.role === 'recruiter'), 10);
    const jobs = await seedJobs(companies, 50);
    await seedApplications(users.filter(user => user.role === 'student'), jobs, 100);

    mongoose.connection.close();
    console.log("Seeding completed!");
};

seedDatabase();
