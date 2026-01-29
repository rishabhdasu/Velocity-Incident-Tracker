import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const CreateIncidentForm = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllAssets = async () => {
    try {
      if (loading) setLoading(true);
      const response = await axiosInstance.get(
        `${API_PATHS.ASSETS.GET_ALL_ASSET}`,
      );
      if (response.data) {
        setAssets(response.data);
      }
    } catch (err) {
      console.error("Unable to fetch the Assets", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllAssets();
  }, []);

  return (
    <div>
      <form>
        <label>Select Asset</label>
        <select>
          {assets.map((asset) => (
            <option>{asset.serialNumber}</option>
          ))}
        </select>
      </form>
    </div>
  );
};

export default CreateIncidentForm;
