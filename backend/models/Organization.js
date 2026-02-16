const mongoose = require("mongoose");

const OrganizationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    subscriptionPlan: {
        required: true,
        type: String,
        enum: ["free", "pro", "enterprise"],
        default: "free"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    themeColor: {
        type: String,
        default: "#00adef"
    },
    logoUrl: {
        type: String
    }
},
{timestamps: true}
);

module.exports = mongoose.model("Organization", OrganizationSchema);