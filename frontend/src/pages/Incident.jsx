import React, { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import { LuPlus } from "react-icons/lu";
import Modal from "../components/Modal";
import { useNavigate } from "react-router-dom";

const Incident = () => {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  const STATUS_STYLES = {
    open: "bg-red-100 text-red-700 border-red-200",
    "in-progress": "bg-blue-100 text-blue-700 border-blue-200",
    closed: "bg-green-100 text-green-700 border-green-200",
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    "on-hold": "bg-purple-100 text-purple-700 border-purple-200",
  };

  const PRIORITY_STYLES = {
    low: "text-gray-500 bg-gray-50",
    medium: "text-blue-600 bg-blue-50",
    high: "text-orange-600 bg-orange-50 font-bold",
    critical: "text-red-600 bg-red-50 font-black animate-pulse",
  };

  const fetchAllIncidents = async () => {
    try {
      if (loading) setLoading(true);
      const response = await axiosInstance.get(
        `${API_PATHS.INCIDENTS.GET_ALL_INCIDENTS}`,
      );
      if (response.data) {
        setIncidents(response.data);
      }
    } catch (err) {
      console.error("Unable to fetch the incidents", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllIncidents();
  }, []);

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            Incident Management
          </h1>
          <p className="text-sm text-gray-500">
            Track and manage system issues
          </p>
        </div>
        <button
          className="btn-primary"
          type="button"
          onClick={() => navigate("/incidents/create")}
        >
          <LuPlus size={20} />
          Create Incident
        </button>
      </div>
      <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead className="w-full text-left border-collapsebg-gray-100 uppercase text-xs font-semibold text-gray-600">
            <tr>
              <th className="px-6 py-4">Incident Number</th>
              <th className="px-6 py-4">Serial Number</th>
              <th className="px-6 py-4">Title</th>
              <th className="px-6 py-4">Description</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Priority</th>
              <th className="px-6 py-4">Date Created</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {incidents.map((inc) => (
              <tr
                key={inc._id}
                className="hover:bg-blue-50 transition-colors border-gray-200 border-2"
              >
                <td className="px-6 py-4 font-medium text-gray-900">
                  {inc.asset.serialNumber}
                </td>
                <td className="px-6 py-4 text-gray-700">{inc.title}</td>
                <td className="px-6 py-4 text-gray-700">{inc.description}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      STATUS_STYLES[inc.status]
                    }`}
                  >
                    {inc.status}
                  </span>
                </td>
                <td
                  className={`px-2 py-0.5 rounded text-xs capitalize ${PRIORITY_STYLES[inc.priority] || "text-gray-400"}`}
                >
                  {inc.priority}
                </td>
                <td className="px-6 py-4 text-gray-500">
                  {new Date(inc.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {incidents.length === 0 && (
          <div className="p-10 text-center text-gray-400">
            No Incidents found in the system.
          </div>
        )}
      </div>
      {openModal && <Modal onClose={() => setOpenModal(false)} />}
    </div>
  );
};

export default Incident;
