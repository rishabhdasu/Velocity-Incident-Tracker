const mongoose = require("mongoose");
const Counter = require("./Counter");

const IncidentSchema = new mongoose.Schema(
  {
    incidentNumber: {
      type: String,
      unique: true,
    },
    asset: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Asset",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["open", "in-progress", "closed", "pending", "on-hold"],
      default: "open",
    },
    priority: { type: String, enum: ["low", "medium", "high", "critical"] },
  },
  { timestamps: true },
);

IncidentSchema.pre("save", async function (next) {
  const doc = this;

  // Only run this if the incident is new
  if (doc.isNew) {
    try {
      // Find the "incident_seq" and increment it by 1
      const counter = await Counter.findOneAndUpdate(
        { id: "incident_seq" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }, // Create it if it doesn't exist
      );

      // Set the incidentNumber (e.g., INC-1001)
      doc.incidentNumber = `INC-${counter.seq}`;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});

module.exports = mongoose.model("Incident", IncidentSchema);
