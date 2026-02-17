import { useState, useEffect } from "react";

export default function AdminDraw() {
  const [loading, setLoading] = useState(false);
  const [drawHistory, setDrawHistory] = useState([]);
  const [winners, setWinners] = useState([]);
  const [showWinners, setShowWinners] = useState(false);
  const [error, setError] = useState("");

  // Fetch draw history and stats on component mount
  useEffect(() => {
    fetchDrawHistory();
  }, []);

  const fetchDrawHistory = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/draws`);
      if (!response.ok) throw new Error("Failed to fetch history");
      const data = await response.json();
      setDrawHistory(data);
    } catch (err) {
      console.error("Error fetching history:", err);
    }
  };

  const startDraw = async () => {
    // Confirmation before starting draw
    if (
      !window.confirm(
        "Are you sure you want to run the draw today? This action cannot be undone!",
      )
    ) {
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/draws`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add authorization if needed
          // 'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
      });

      const data = await response.json();
      console.log("Draw response:", data);
      if (!response.ok) {
        throw new Error(data.message || "Failed to run draw");
      }

      // Show success message with winners
      setWinners(data.winners || []);
      setShowWinners(true);

      // Refresh history and stats
      await fetchDrawHistory();
    } catch (err) {
      setError(err.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const closeWinnersModal = () => {
    setShowWinners(false);
    setWinners([]);
  };

  // Format date for display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handlewinnersClick = async () => {
    try {
      await fetch(`${import.meta.env.VITE_BASE_URL}/admin/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error("Error creating admin winners:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block p-3 bg-blue-600 rounded-full mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-white mb-3">
            অ্যাডমিন প্যানেল
          </h1>
          <p className="text-xl text-gray-300">ড্র ম্যানেজমেন্ট সিস্টেম</p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Tickets */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">মোট টিকেট</p>
                <p className="text-white text-3xl font-bold mt-2">0</p>
              </div>
              <div className="bg-blue-400 bg-opacity-30 p-3 rounded-xl">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Total Participants */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">মোট অংশগ্রহণকারী</p>
                <p className="text-white text-3xl font-bold mt-2">0</p>
              </div>
              <div className="bg-purple-400 bg-opacity-30 p-3 rounded-xl">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Last Draw */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">সর্বশেষ ড্র</p>
                <button
                  onClick={handlewinnersClick}
                  className="text-white text-lg font-bold mt-2 hover:underline"
                >
                  Set Winners
                </button>
              </div>
              <div className="bg-green-400 bg-opacity-30 p-3 rounded-xl">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Main Control Card */}
        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8 border border-gray-700">
          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <span className="text-3xl">🎲</span>
                ড্র কন্ট্রোল
              </h2>
              <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-semibold">
                {new Date().toLocaleDateString("bn-BD")}
              </span>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 bg-red-900 border border-red-700 text-red-200 px-6 py-4 rounded-xl flex items-center gap-3">
                <span className="text-2xl">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Draw Button Section */}
            <div className="bg-gray-700 rounded-xl p-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center animate-pulse">
                    <span className="text-3xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-xl mb-1">
                      টুডে'স ড্র
                    </h3>
                    <p className="text-gray-300">
                      বিজয়ী নির্বাচন করতে রান বাটনে ক্লিক করুন
                    </p>
                  </div>
                </div>

                <button
                  onClick={startDraw}
                  disabled={loading}
                  className={`px-10 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 flex items-center gap-3 ${
                    loading
                      ? "bg-gray-600 text-gray-300 cursor-not-allowed"
                      : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg"
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      প্রসেসিং...
                    </>
                  ) : (
                    <>
                      <span>🎲</span>
                      রান ড্র
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Warning Message */}
            <div className="mt-4 bg-yellow-900 bg-opacity-50 border border-yellow-700 rounded-xl p-4">
              <p className="text-yellow-200 text-sm flex items-center gap-2">
                <span className="text-xl">⚠️</span>
                ড্র রান করার পর এটি আর পরিবর্তন করা যাবে না। দয়া করে নিশ্চিত
                হয়ে রান করুন।
              </p>
            </div>
          </div>
        </div>

        {/* Draw History */}
        <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-3xl">📋</span>
              ড্র হিস্টোরি
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                    স্থান
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                    তারিখ
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                    বিজয়ী টিকেট নম্বর
                  </th>

                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-200">
                    স্ট্যাটাস
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {drawHistory.length > 0 ? (
                  drawHistory.map((draw, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-700 transition-colors"
                    >
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-300">
                        {formatDate(draw.drawDate)}
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-white">
                        <p>
                          {draw.winningNumbers.map((num, i) => (
                            <span
                              key={i}
                              className="inline-block mr-2 mb-2 bg-yellow-500 bg-opacity-20 text-white px-2 py-1 rounded-full text-xs"
                            >
                              {num}
                            </span>
                          ))}
                        </p>
                      </td>

                      <td className="px-6 py-4">
                        <span className="bg-green-500 bg-opacity-20 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          কমপ্লিটেড
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-12 text-center text-gray-400"
                    >
                      <span className="text-4xl block mb-3">📭</span>
                      কোন ড্র হিস্টোরি পাওয়া যায়নি
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Winners Modal */}
        {showWinners && winners.length > 0 && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
              <div className="p-6 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <span className="text-3xl">🏆</span>
                  আজকের বিজয়ীগণ
                </h3>
                <button
                  onClick={closeWinnersModal}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="space-y-4">
                  {winners.map((winner, index) => (
                    <div key={index} className="bg-gray-700 rounded-xl p-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-xl font-bold">
                          #{index + 1}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-bold">
                            {winner.name}
                          </h4>
                          <p className="text-gray-300 text-sm">
                            টিকেট: {winner.ticketNumber}
                          </p>
                          <p className="text-gray-400 text-xs">
                            {winner.phone}
                          </p>
                        </div>
                        <span className="bg-green-500 text-white px-3 py-1 rounded-full text-xs">
                          বিজয়ী
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 border-t border-gray-700">
                <button
                  onClick={closeWinnersModal}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition-colors"
                >
                  বন্ধ করুন
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
