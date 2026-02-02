import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const CreateIncidentPage = () => {
  const [previewNum, setPreviewNum] = useState("Loading...");
  const [searchSerial, setSearchSerial] = useState("");
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

  const handleAssetFind = async () => {
    if (!searchSerial) return alert("Enter a Serial Number");
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.ASSETS.FIND_BY_SERIAL}/${searchSerial}`,
      );
      setAssetFound(response.data);
      console.log("rishabh");
    } catch (err) {
      console.error("Search failed", err);
      setAssetFound(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPreviewNumber();
  }, []);

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h2 className="text-m font-bold text-primary">
        New Incident: <span className="text-black">{previewNum}</span>
      </h2>
      <div className="Link-Asset mt-2">
        <h3 className="text-gray-500">Link an Asset</h3>
        <div className="flex">
          <div className="Left-Column flex flex-col">
            <label>Asset Name</label>
            <input
              readOnly
              placeholder="Asset Name"
              value={assetFound?.assetName || ""}
              className="bg-gray-50 border p-2.5 rounded-lg text-gray-500 cursor-not-allowed"
            />
            <label>Serial Number</label>
            <input
              type="text"
              placeholder="Enter Serial Number"
              value={searchSerial}
              onChange={(e) => setSearchSerial(e.target.value.toUpperCase())}
            />
            <button
              className="btn-primary p-1"
              type="button"
              onClick={handleAssetFind}
            >
              {loading ? "..." : "Find"}
            </button>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default CreateIncidentPage;
