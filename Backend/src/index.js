import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js"; // Import app (configured Express)

dotenv.config();  // Load environment variables from .env file

const PORT = process.env.PORT || 3002;  // Default to 3002 if no PORT is provided

async function main() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URL, {
    
    });
    console.log(" Connected to MongoDB");

    // Start the Express server
    app.listen(PORT, () => {
      console.log(` App listening on port ${PORT}`);
    });
  } catch (err) {
    console.error(" Failed to connect to the database", err);
    process.exit(1); // Exit the process if DB connection fails
  }
}

main();
