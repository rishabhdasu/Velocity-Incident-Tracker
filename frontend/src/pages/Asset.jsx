import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";

const Asset = () => {
  const [assets, setAssets] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllAssets = async () => {
   setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${API_PATHS.ASSETS.GET_ALL_ASSET}`,
      );
      setAssets(response.data);
    } catch (err) {
      console.error("Unable to fetch all assets", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllAssets();
    return () => {};
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      {loading ? "Loading Assets...": (<div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="w-full text-left border-collapsebg-gray-100 uppercase text-xs font-semibold text-gray-600">
            <tr>
              <th className="px-6 py-4">Serial Number</th>
              <th className="px-6 py-4">Asset Name</th>
              <th className="px-6 py-4">Asset Status</th>
              <th className="px-6 py-4">Installed Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {assets.map((asset) => (
              <tr
                key={asset._id}
                className="hover:bg-blue-50 transition-colors border-gray-200 border-2"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {asset.serialNumber}
                </td>
                <td className="px-6 py-4 text-gray-700">{asset.assetName}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      asset.status === "Connected"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {asset.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {new Date(asset.installedDate).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {assets.length === 0 && (
          <div className="p-10 text-center text-gray-400">
            No assets found in the system.
          </div>
        )}
      </div>)}
    </div>
  );
};

export default Asset;
