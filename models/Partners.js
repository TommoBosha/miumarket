import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema(
    {
        companyName: { type: String, require: true },
        phone: {
            type: String,
            require: true,
            match: [/^(\+380\d{9})$/, "Invalid phone number"],
        },
        email: {
            type: String,
            required: [true, "Email is required."],
            match: [/^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/i, "Invalid email address"],
        },
        socialMedia: { type: String },
        product: { type: String, require: true },
        description: { type: String, require: true, minLength: 10 },
    },
    {
        timestamps: true,
    }
);

const Partner =
    mongoose.models.Partner || mongoose.model("Partner", partnerSchema);

export default Partner;
