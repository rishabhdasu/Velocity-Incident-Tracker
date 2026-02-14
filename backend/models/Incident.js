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
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Organization",
      required: true
    }
  },
  { timestamps: true },
);


IncidentSchema.pre("save", async function () {
  if (this.isNew) {
    let counter = await Counter.findOne({ id: "incident_seq" });

    if (!counter) {
      counter = await Counter.create({ 
        id: "incident_seq", 
        seq: 100001, 
        series: "A" 
      });
    } else {
      counter = await Counter.findOneAndUpdate(
        { id: "incident_seq" },
        { $inc: { seq: 1 } },
        { new: true }
      );
    }

    const paddedSeq = String(counter.seq).padStart(6, "0");
    this.incidentNumber = `J${counter.series}${paddedSeq}`;
  }
});

module.exports = mongoose.model("Incident", IncidentSchema);
