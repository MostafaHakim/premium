import React, { useState, useEffect } from "react";

const AllTickets = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    expired: 0,
    totalAmount: 0,
  });

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      // Replace with actual API call
      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/orders`);
      const data = await response.json();

      setTickets(data);
      console.log("Fetched tickets:", data);
      // Calculate stats
      const activeTickets = data.filter((t) =>
        t.tickets.some((ticket) => ticket.status === "active"),
      ).length;

      const expiredTickets = data.filter((t) =>
        t.tickets.some((ticket) => ticket.isExpired),
      ).length;

      const totalAmount = data.reduce((sum, t) => sum + t.amount, 0);

      setStats({
        total: data.length,
        active: activeTickets,
        expired: expiredTickets,
        totalAmount: totalAmount,
      });
    } catch (error) {
      console.error("Error fetching tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterTickets = () => {
    return tickets.filter((ticket) => {
      // Search filter
      const matchesSearch =
        ticket.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.phone.includes(searchTerm) ||
        ticket.transectionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.tickets.some((t) => t.ticketNumber.includes(searchTerm));

      // Status filter
      const ticketStatus = ticket.tickets[0]?.status || "unknown";
      const matchesStatus =
        filterStatus === "all"
          ? true
          : filterStatus === "active"
            ? ticketStatus === "active"
            : filterStatus === "expired"
              ? ticket.tickets[0]?.isExpired
              : filterStatus === "inactive"
                ? ticketStatus === "inactive"
                : true;

      return matchesSearch && matchesStatus;
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("bn-BD", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getStatusBadge = (ticket) => {
    const ticketInfo = ticket.tickets[0];
    if (ticketInfo?.isExpired) {
      return (
        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
          মেয়াদোত্তীর্ণ
        </span>
      );
    } else if (ticketInfo?.status === "active") {
      return (
        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
          সক্রিয়
        </span>
      );
    } else if (ticketInfo?.status === "inactive") {
      return (
        <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-semibold">
          নিষ্ক্রিয়
        </span>
      );
    } else {
      return (
        <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-xs font-semibold">
          অজানা
        </span>
      );
    }
  };

  const ViewDetailsModal = ({ ticket, onClose }) => {
    if (!ticket) return null;

    const ticketInfo = ticket.tickets[0];

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
            <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <span className="text-3xl">🎫</span>
              টিকেট বিস্তারিত
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors"
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

          <div className="p-6 space-y-6">
            {/* User Info */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-5">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">👤</span>
                গ্রাহকের তথ্য
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">নাম</p>
                  <p className="font-medium text-gray-800">{ticket.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ফোন</p>
                  <p className="font-medium text-gray-800">{ticket.phone}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-sm text-gray-500">ঠিকানা</p>
                  <p className="font-medium text-gray-800">
                    {ticket.address || "দেওয়া হয়নি"}
                  </p>
                </div>
              </div>
            </div>

            {/* Transaction Info */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">💰</span>
                পেমেন্ট তথ্য
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">ট্রানজেকশন আইডি</p>
                  <p className="font-medium text-gray-800 font-mono">
                    {ticket.transectionId}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">পরিমাণ</p>
                  <p className="font-medium text-gray-800">{ticket.amount} ৳</p>
                </div>
              </div>
            </div>

            {/* Ticket Info */}
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-5">
              <h4 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
                <span className="text-2xl">🎫</span>
                টিকেট তথ্য
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">টিকেট নম্বর</p>
                  <p className="font-bold text-2xl text-blue-600 font-mono">
                    {ticketInfo?.ticketNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">স্ট্যাটাস</p>
                  <div className="mt-1">{getStatusBadge(ticket)}</div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ক্রয়ের তারিখ</p>
                  <p className="font-medium text-gray-800">
                    {formatDate(ticketInfo?.buyDate)}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">ড্র তারিখ</p>
                  <p className="font-medium text-gray-800">
                    {formatDate(ticketInfo?.drawDate)}
                  </p>
                </div>
                {ticketInfo?.isExpired && (
                  <div className="col-span-2 mt-2">
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <span>⚠️</span>
                      এই টিকেটের মেয়াদ উত্তীর্ণ হয়ে গেছে
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* System Info */}
            <div className="bg-gray-50 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-gray-500 mb-2">
                সিস্টেম তথ্য
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                <div>ID: {ticket._id}</div>
                <div>টিকেট ID: {ticketInfo?._id}</div>
                <div>তৈরির তারিখ: {formatDate(ticket.createdAt)}</div>
                <div>হালনাগাদ: {formatDate(ticket.updatedAt)}</div>
                <div>ভার্সন: {ticket.__v}</div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-4 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all"
            >
              বন্ধ করুন
            </button>
          </div>
        </div>
      </div>
    );
  };

  const filteredTickets = filterTickets();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-block p-3 bg-blue-600 rounded-full mb-4">
            <span className="text-4xl">🎫</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            সর্বমোট টিকেট
          </h1>
          <p className="text-xl text-gray-600">সকল টিকেটের তালিকা ও তথ্য</p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">মোট টিকেট</p>
                <p className="text-3xl font-bold text-gray-800">
                  {stats.total}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📊</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">সক্রিয় টিকেট</p>
                <p className="text-3xl font-bold text-green-600">
                  {stats.active}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">মেয়াদোত্তীর্ণ</p>
                <p className="text-3xl font-bold text-gray-600">
                  {stats.expired}
                </p>
              </div>
              <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⏰</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 mb-1">মোট পরিমাণ</p>
                <p className="text-3xl font-bold text-purple-600">
                  {stats.totalAmount} ৳
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">💰</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder="নাম, ফোন, ট্রানজেকশন বা টিকেট নম্বর দিয়ে সার্চ করুন..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white"
              >
                <option value="all">সব স্ট্যাটাস</option>
                <option value="active">সক্রিয়</option>
                <option value="inactive">নিষ্ক্রিয়</option>
                <option value="expired">মেয়াদোত্তীর্ণ</option>
              </select>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setFilterStatus("all");
                }}
                className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-all font-medium"
              >
                রিসেট
              </button>
            </div>
          </div>
        </div>

        {/* Tickets Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
              <p className="text-gray-600">লোড হচ্ছে...</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        ক্র.নং
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        গ্রাহকের নাম
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        ফোন
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        টিকেট নম্বর
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        পরিমাণ
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        স্ট্যাটাস
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold">
                        ক্রয়ের তারিখ
                      </th>
                      <th className="px-6 py-4 text-center text-sm font-semibold">
                        অ্যাকশন
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredTickets.length > 0 ? (
                      filteredTickets.map((ticket, index) => (
                        <tr
                          key={ticket._id}
                          className="hover:bg-gray-50 transition-colors"
                        >
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-medium text-gray-900">
                              {ticket.name}
                            </div>
                            {ticket.address && (
                              <div className="text-xs text-gray-500">
                                {ticket.address}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {ticket.phone}
                          </td>
                          <td className="px-6 py-4">
                            <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                              {ticket.tickets[0]?.ticketNumber}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                            {ticket.amount} ৳
                          </td>
                          <td className="px-6 py-4">
                            {getStatusBadge(ticket)}
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {formatDate(ticket.tickets[0]?.buyDate)}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => setSelectedTicket(ticket)}
                              className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors"
                            >
                              বিস্তারিত
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan="8"
                          className="px-6 py-12 text-center text-gray-500"
                        >
                          <span className="text-4xl block mb-3">📭</span>
                          কোন টিকেট পাওয়া যায়নি
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {filteredTickets.length > 0 && (
                <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                  <p className="text-sm text-gray-600">
                    মোট {filteredTickets.length} টি টিকেট
                  </p>
                  <div className="flex gap-2">
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                      পূর্ববর্তী
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      ১
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                      ২
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                      ৩
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors">
                      পরবর্তী
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Export Options */}
        <div className="mt-6 flex justify-end gap-3">
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center gap-2">
            <span>📥</span>
            এক্সপোর্ট CSV
          </button>
          <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-all flex items-center gap-2">
            <span>🖨️</span>
            প্রিন্ট
          </button>
        </div>
      </div>

      {/* Details Modal */}
      <ViewDetailsModal
        ticket={selectedTicket}
        onClose={() => setSelectedTicket(null)}
      />
    </div>
  );
};

export default AllTickets;
