import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";


dotenv.config();

const PORT = process.env.PORT || 3002;

async function main() {
    try {
       
        await mongoose.connect(process.env.MONGODB_URL, {
          
        });
        console.log("✅ Connected to database");

        app.listen(PORT, () => {
            console.log(`🚀 App listening on port ${PORT}`);
        });
    } catch (err) {
        console.error("❌ Failed to connect to the database", err);
        process.exit(1); // Exit process on failure
    }
}

main();

