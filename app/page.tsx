"use client";

import { useState } from "react";
import Loader from "./components/Loader";
import PostOfficeCard from "./components/PostOfficeCard";

interface PostOffice {
  Name: string;
  BranchType: string;
  DeliveryStatus: string;
  District: string;
  Division: string;
  Region: string;
  State: string;
  Country: string;
}

interface ApiResponse {
  Message: string;
  Status: string;
  PostOffice: PostOffice[] | null;
}

export default function Home() {
  const [pincode, setPincode] = useState("");
  const [loading, setLoading] = useState(false);
  const [postOffices, setPostOffices] = useState<PostOffice[]>([]);
  const [filterText, setFilterText] = useState("");
  const [error, setError] = useState("");
  const [apiMessage, setApiMessage] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleLookup = async () => {
    // Reset states
    setError("");
    setApiMessage("");
    setPostOffices([]);
    setFilterText("");
    setHasSearched(false);

    // Validate 6-digit pincode
    if (!/^\d{6}$/.test(pincode)) {
      setError("Pincode must be exactly 6 digits");
      alert("Pincode must be exactly 6 digits");
      return;
    }

    setLoading(true);
    setHasSearched(true);

    try {
      const response = await fetch(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data: ApiResponse[] = await response.json();

      if (data && data[0]) {
        const result = data[0];

        if (result.Status === "Error" || !result.PostOffice) {
          setError(result.Message || "No data found for this pincode");
          setPostOffices([]);
        } else {
          setPostOffices(result.PostOffice);
          setApiMessage(result.Message);
        }
      } else {
        setError("Invalid response from server");
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Filter post offices by name
  const filteredPostOffices = postOffices.filter((office) =>
    office.Name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-white p-6 md:p-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Enter Pincode</h1>

        {/* Input Form */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            className="w-full px-5 py-4 border-2 border-gray-900 rounded-xl text-xl mb-5 focus:outline-none focus:ring-2 focus:ring-gray-900 text-gray-900 placeholder-gray-400"
            maxLength={6}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleLookup();
              }
            }}
          />
          <button
            onClick={handleLookup}
            className="px-12 py-4 bg-black text-white rounded-xl text-base font-medium hover:bg-gray-800 transition-colors"
          >
            Lookup
          </button>
        </div>

        {/* Loading State */}
        {loading && <Loader />}

        {/* Error Message */}
        {error && !loading && (
          <div className="text-red-600 font-medium mb-4">{error}</div>
        )}

        {/* Results Section */}
        {!loading && hasSearched && postOffices.length > 0 && (
          <div>
            {/* Pincode and Message */}
            <div className="mb-6">
              <p className="font-bold text-lg text-gray-900">
                Pincode: <span className="font-normal">{pincode}</span>
              </p>
              {apiMessage && (
                <p className="text-base text-gray-700 mt-1">
                  <span className="font-bold">Message: </span>{apiMessage}
                </p>
              )}
            </div>

            {/* Filter Input */}
            <div className="mb-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Filter"
                  value={filterText}
                  onChange={(e) => setFilterText(e.target.value)}
                  className="w-full px-5 py-3 pl-11 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-gray-900 text-gray-900 placeholder-gray-500"
                />
                <svg
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Post Office Cards Grid */}
            {filteredPostOffices.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {filteredPostOffices.map((office, index) => (
                  <PostOfficeCard
                    key={index}
                    name={office.Name}
                    branchType={office.BranchType}
                    deliveryStatus={office.DeliveryStatus}
                    district={office.District}
                    division={office.Division}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center text-gray-700 py-12 text-lg">
                Couldn&apos;t find the postal data you&apos;re looking for…
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
