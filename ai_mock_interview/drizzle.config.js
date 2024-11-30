/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://neondb_owner:ris3lWdw1Jgj@ep-empty-hill-a5hpsa84.us-east-2.aws.neon.tech/neondb?sslmode=require',
    }
  };