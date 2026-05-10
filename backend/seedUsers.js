import mongoose from "mongoose";
import User from "./models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

const users = [
    {
        name: "Admin User",
        email: "admin@example.com",
        password: "password123",
        role: "admin"
    },
    {
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        role: "customer"
    },
    {
        name: "Jane Smith",
        email: "jane@example.com",
        password: "password123",
        role: "customer"
    }
];

const seedUsers = async () => {
    try {
        const mongoUri = process.env.MONGO_URI || "mongodb+srv://nemmanisuryateja_db_user:4XDjS9zP2K4NaL0f@ecommerce.grzrvl5.mongodb.net/?appName=ECommerce";
        
        await mongoose.connect(mongoUri);
        console.log('DB connected');

        // Delete existing users with these emails to avoid unique constraint errors
        const emails = users.map(u => u.email);
        await User.deleteMany({ email: { $in: emails } });
        console.log('Old seed users deleted');

        // We use create() instead of insertMany() to trigger the 'save' hook for password hashing
        for (const userData of users) {
            await User.create(userData);
        }

        console.log('Users created successfully');
        console.log('-------------------------');
        console.log('Admin: admin@example.com / password123');
        console.log('User 1: john@example.com / password123');
        console.log('User 2: jane@example.com / password123');
        
        process.exit(0);
    } catch (error) {
        console.error('Error seeding users:', error);
        process.exit(1);
    }
};

seedUsers();
