import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import Input from "../components/Inputs/Input";
import Select from "../components/Inputs/Select";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CreateIncidentPage = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [previewNum, setPreviewNum] = useState("Loading...");
  const [searchSerial, setSearchSerial] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "Open",
    priority: "Medium"
  });
const PRIORITY_OPTIONS = ["Low", "Medium", "High", "Critical"];
const STATUS_OPTIONS = ["Open", "In-Progress", "Pending", "On-Hold"];
  const [assetFound, setAssetFound] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchPreviewNumber = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.INCIDENTS.GET_PREVIEW);
      setPreviewNum(response.data.nextIncidentNumber);
    } catch (err) {
      console.error("Unable to fetch Preview Number", err);
      setPreviewNum(" ");
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field] : value
    }))
  }

  const handleAssetFind = async () => {
    if (!searchSerial) return alert("Enter a Serial Number");
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.ASSETS.FIND_BY_SERIAL}/${searchSerial}`,
      );
      setAssetFound(response.data);
      handleInputChange("assetId", response.data._id);
    } catch (err) {
      console.error("Search failed", err);
      setAssetFound(null);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
   if(!formData.assetId) return toast.error("Please link an Asset to create an incident");
   setIsSubmitting(true);
   try {
    const res = await axiosInstance.post(API_PATHS.INCIDENTS.CREATE_INCIDENTS, formData);
    toast.success("Ticket Created Successfully:" + res.data.newIncident.incidentNumber);
    navigate("/incidents")
   }
   catch(err) {
    console.error(err);
    toast.error("Failed to create ticket")
   }
   finally {
    setIsSubmitting(false);
   }
  }

  useEffect(() => {
    fetchPreviewNumber();
  }, []);

  return (
  <div className="bg-gray-50 min-h-screen pb-10">
  {/* TOP HEADER */}
  <div className="p-4 px-6">
    <h1 className="text-xl font-bold text-primary">
      New Incident: <span className="text-gray-900 font-mono">{previewNum}</span>
    </h1>
  </div>

  {/* ASSET LOOKUP CONTAINER */}
  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 m-4 mt-0">
    <h3 className="text-[10px] font-bold uppercase text-gray-400 mb-6 tracking-[0.15em]">
      Asset LookUp
    </h3>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-3">
      {/* COLUMN 1: INTERACTION */}
      <div className="flex flex-col h-full">
        <div className="space-y-3">
          <Input
            label="Asset Name" 
            value={assetFound?.assetName || ""} 
            readOnly 
          />
          
          <Input 
            label="Serial Number" 
            value={searchSerial}
            onChange={(e) => setSearchSerial(e.target.value.toUpperCase())}
            placeholder="AKJD88723"
          />
        </div>

        <div className="mt-auto flex justify-end pt-4">
          <button onClick={handleAssetFind} className="btn-primary py-1.5 px-10 text-xs uppercase h-9">
            {loading ? "..." : "Find"}
          </button>
        </div>
      </div>

      {/* COLUMN 2: CONTEXT */}
      <div className="space-y-3">
        <Input label="Site Name" value={assetFound?.siteName || ""} readOnly />
        <Input label="Device Status" value={assetFound?.status || ""} readOnly className="font-bold" />
        <Input label="City / Region" value={assetFound?.city || ""} readOnly />
      </div>
    </div>
  </div>

  {/* INCIDENT DETAILS CONTAINER */}
  <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 m-4">
    <h3 className="text-[10px] font-bold uppercase text-gray-400 mb-6 tracking-[0.15em]">
      Incident Details
    </h3>
    <div>
      <form>
        <Input  type="text"
        label="Incident Title"
        value={formData.title}
        onChange={(e) => handleInputChange("title", e.target.value)}
        placeholder="Incident Title"
        />
        <Input  type="textarea"
        label="Incident Description"
        value={formData.description}
        onChange={(e) => handleInputChange("description", e.target.value)}
        placeholder="Incident Description"
        />
        <div className="grid grid-cols-2 gap-4">
      <Select 
      label="Priority"
      options={PRIORITY_OPTIONS}
      value={formData.priority}
      onChange={(e) => handleInputChange("priority", e.target.value)}
    />
    <Select
      label="Status"
      options={STATUS_OPTIONS}
      value={formData.status}
      onChange={(e) => handleInputChange("status", e.target.value)}
    />
  </div>
  <button disabled={isSubmitting} className="btn-primary" onClick={handleSubmit}>{isSubmitting ? "Saving" : "Create Incident"}</button>
  </form>
    </div>
  </div>
    </div>
  );
};

export default CreateIncidentPage;
