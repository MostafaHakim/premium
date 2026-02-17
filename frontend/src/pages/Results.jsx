import React, { useState, useEffect } from "react";

const Results = () => {
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState(null);
  const [drawResults, setDrawResults] = useState([]);
  const [filter, setFilter] = useState("all"); // all, today, week, month
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch draw results on component mount
  useEffect(() => {
    fetchDrawResults();
  }, [filter]);
  console.log("Draw Results:", drawResults);
  const fetchDrawResults = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/draws`);
      if (!response.ok) throw new Error("Failed to fetch draw results");
      const data = await response.json();
      setDrawResults(data);
    } catch (error) {
      console.error("Error fetching results:", error);
    } finally {
      setLoading(false);
    }
  };

  const checkResult = async () => {
    if (!mobileNumber) {
      alert("দয়া করে আপনার মোবাইল নাম্বার দিন");
      return;
    }

    if (mobileNumber.length < 11) {
      alert("সঠিক মোবাইল নাম্বার দিন (১১ ডিজিট)");
      return;
    }

    setChecking(true);
    setResult(null);

    try {
      // Simulated API call - replace with actual API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Check if mobile number exists in winners (simulated)
      const found = drawResults.find((item) => item.mobile === mobileNumber);

      if (found) {
        setResult({
          status: "won",
          message: "🎉 অভিনন্দন! আপনি বিজয়ী হয়েছেন!",
          details: found,
        });
      } else {
        setResult({
          status: "lost",
          message: "😔 দুঃখিত, আপনি এই ড্রতে বিজয়ী হননি",
          details: null,
        });
      }
    } catch (error) {
      setResult({
        status: "error",
        message: "কোন সমস্যা হয়েছে। আবার চেষ্টা করুন।",
        details: null,
      });
    } finally {
      setChecking(false);
    }
  };

  const filterResults = () => {
    let filtered = [...drawResults];

    // Filter by date
    const today = new Date();
    if (filter === "today") {
      filtered = filtered.filter(
        (item) => new Date(item.date).toDateString() === today.toDateString(),
      );
    } else if (filter === "week") {
      const weekAgo = new Date(today.setDate(today.getDate() - 7));
      filtered = filtered.filter((item) => new Date(item.date) >= weekAgo);
    } else if (filter === "month") {
      const monthAgo = new Date(today.setMonth(today.getMonth() - 1));
      filtered = filtered.filter((item) => new Date(item.date) >= monthAgo);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (item) =>
          item.ticket.includes(searchTerm) ||
          item.winner.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    return filtered;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mb-4 shadow-lg">
            <span className="text-5xl">🏆</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">ড্র রেজাল্ট</h1>
          <p className="text-xl text-gray-600">
            আপনার মোবাইল নাম্বার দিয়ে চেক করুন আপনি জিতেছেন কিনা
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Check Result Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-10 transform hover:scale-105 transition-transform duration-300">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-6xl mb-4 block animate-bounce">🎲</span>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                আপনার রেজাল্ট চেক করুন
              </h2>
              <p className="text-gray-600">
                নিচে আপনার মোবাইল নাম্বার দিন এবং চেক বাটনে ক্লিক করুন
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="tel"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                placeholder="মোবাইল নাম্বার (যেমন: 017xxxxxxxx)"
                className="flex-1 px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all text-lg"
                maxLength="11"
              />
              <button
                onClick={checkResult}
                disabled={checking}
                className={`px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 flex items-center justify-center gap-3 ${
                  checking
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg"
                }`}
              >
                {checking ? (
                  <>
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                    চেক করা হচ্ছে...
                  </>
                ) : (
                  <>
                    <span>🔍</span>
                    রেজাল্ট চেক করুন
                  </>
                )}
              </button>
            </div>

            {/* Result Display */}
            {result && (
              <div
                className={`mt-6 p-6 rounded-xl animate-slideIn ${
                  result.status === "won"
                    ? "bg-gradient-to-r from-green-500 to-green-600 text-white"
                    : result.status === "lost"
                      ? "bg-gradient-to-r from-red-500 to-red-600 text-white"
                      : "bg-gradient-to-r from-yellow-500 to-yellow-600 text-white"
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-4xl">
                    {result.status === "won"
                      ? "🎉"
                      : result.status === "lost"
                        ? "😔"
                        : "⚠️"}
                  </span>
                  <div>
                    <p className="text-xl font-bold mb-2">{result.message}</p>
                    {result.details && (
                      <div className="bg-white bg-opacity-20 rounded-lg p-4 mt-3">
                        <p className="flex items-center gap-2">
                          <span>📅</span> তারিখ:{" "}
                          {formatDate(result.details.date)}
                        </p>
                        <p className="flex items-center gap-2">
                          <span>🎫</span> টিকেট নম্বর: {result.details.ticket}
                        </p>
                        <p className="flex items-center gap-2">
                          <span>🏆</span> পুরস্কার: {result.details.prize}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Table Section */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                <span className="text-3xl">📋</span>
                সকল ড্র এর ফলাফল
              </h2>

              <div className="flex flex-col sm:flex-row gap-3">
                {/* Filter Buttons */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  {["all", "today", "week", "month"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        filter === f
                          ? "bg-blue-600 text-white"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                    >
                      {f === "all"
                        ? "সব"
                        : f === "today"
                          ? "আজ"
                          : f === "week"
                            ? "সপ্তাহ"
                            : "মাস"}
                    </button>
                  ))}
                </div>

                {/* Search Input */}
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="টিকেট/নাম সার্চ করুন"
                    className="w-full sm:w-64 px-4 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                  />
                  <span className="absolute right-3 top-2.5 text-gray-400">
                    🔍
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">লোড হচ্ছে...</p>
            </div>
          ) : (
            <>
              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        তারিখ
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        টিকেট নম্বর সমুহ
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        পুরস্কার
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filterResults().length > 0 ? (
                      filterResults().map((item, index) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 text-sm text-gray-800">
                            {formatDate(item.drawDate)}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 font-mono">
                            <span className="">
                              {item.winningNumbers?.map((num, index) => (
                                <span
                                  key={index}
                                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full mx-1 text-xs font-semibold"
                                >
                                  {num}
                                </span>
                              ))}
                            </span>
                          </td>

                          <td className="px-6 py-4 text-sm">
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">
                              একটি প্রিমিয়াম মশারী জিতেছেন
                            </span>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="5"
                          className="px-6 py-12 text-center text-gray-500"
                        >
                          <span className="text-4xl block mb-3">📭</span>
                          কোন ফলাফল পাওয়া যায়নি
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden p-4 space-y-4">
                {filterResults().length > 0 ? (
                  filterResults().map((item, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 rounded-xl p-4 border border-gray-200"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold">
                          #{index + 1}
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">
                            {formatDate(item.drawDate)}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div ফclassName="col-span-2 flex flex-col space-y-2">
                          <p className="text-gray-500">টিকেট নাম্বার সমুহ</p>
                          <p className="font-mono font-semibold text-blue-600">
                            <span className="inline-flex flex-wrap gap-1 mt-1">
                              {item.winningNumbers?.map((num, index) => (
                                <span
                                  key={index}
                                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full mx-1 text-xs font-semibold"
                                >
                                  {num}
                                </span>
                              ))}
                            </span>
                          </p>
                        </div>
                        <div className="col-span-2 mt-2">
                          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs">
                            একটি প্রিমিয়াম মশারী জিতেছেন
                          </span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <span className="text-4xl block mb-3">📭</span>
                    কোন ফলাফল পাওয়া যায়নি
                  </div>
                )}
              </div>
            </>
          )}

          {/* Pagination */}
          {filterResults().length > 0 && (
            <div className="p-6 border-t border-gray-200 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                মোট {filterResults().length} টি ফলাফল
              </p>
              <div className="flex gap-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                  পূর্ববর্তী
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  ১
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                  পরবর্তী
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Info Card */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-center gap-4">
            <span className="text-4xl">ℹ️</span>
            <div>
              <h3 className="font-bold text-lg mb-1">
                কিভাবে রেজাল্ট চেক করবেন?
              </h3>
              <p className="text-blue-100">
                ১. আপনার মোবাইল নাম্বার উপরের বক্সে দিন
                <br />
                ২. "রেজাল্ট চেক করুন" বাটনে ক্লিক করুন
                <br />
                ৩. সাথে সাথে জানতে পারবেন আপনি জিতেছেন কিনা
                <br />
                ৪. নিচের টেবিলে সকল ড্র এর ফলাফল দেখতে পারবেন
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideIn {
          animation: slideIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Results;
