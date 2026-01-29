import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { previewController } from "../../../backend/controllers/previewController";

const CreateIncidentPage = () => {
  const [previewNum, setPreviewNum] = useState("Loading...");
  const fetchPreviewNumber = async () => {
    try {
      const previewNumber = await axiosInstance.get(previewController);
      setPreviewNum(previewNumber);
    } catch (err) {
      console.error("Unable to fetch Preview Number", err);
      setPreviewNum(" ");
    }
  };

  useEffect(() => {
    fetchPreviewNumber();
  }, []);

  return (
    <div>
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Incident Management
        </h1>
        <p className="text-sm text-gray-500">{previewNum}</p>
      </div>
    </div>
  );
};

export default CreateIncidentPage;
