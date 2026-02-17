import React, { useState } from "react";
import { Link } from "react-router-dom";

const Trams = () => {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-block p-3 bg-blue-100 rounded-full mb-4">
            <span className="text-5xl">📜</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            শর্তাবলী ও নিয়মাবলি
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-8">
          {/* Alert Banner */}
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-2">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <span className="text-yellow-600 text-xl">⚠️</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  এই ওয়েবসাইট ব্যবহার ও অর্ডার করার মাধ্যমে আপনি নিচের সকল শর্তে
                  সম্মতি প্রদান করছেন।
                </p>
              </div>
            </div>
          </div>

          {/* Terms Content */}
          <div className="p-8 space-y-8">
            {/* Section 1 */}
            <div className="group hover:bg-blue-50 p-6 rounded-2xl transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  1️⃣
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                    সেবার ধরন
                    <span className="text-sm bg-blue-100 text-blue-600 px-3 py-1 rounded-full">
                      গুরুত্বপূর্ণ
                    </span>
                  </h2>
                  <p className="text-gray-600 leading-relaxed">
                    এই প্ল্যাটফর্ম একটি প্রোমোশনাল সেলস ক্যাম্পেইন পরিচালনা করে
                    যেখানে গ্রাহকরা মশারি অর্ডার করার মাধ্যমে একটি ফ্রি গিফট
                    ড্র-এ অংশগ্রহণের সুযোগ পান।
                    <span className="block mt-2 font-semibold text-blue-600">
                      এটি কোনো লটারি, জুয়া বা অর্থ জয়ের প্ল্যাটফর্ম নয়।
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="group hover:bg-green-50 p-6 rounded-2xl transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  2️⃣
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">
                    টিকেট ও অর্ডার
                  </h2>
                  <div className="space-y-2">
                    <p className="text-gray-600 leading-relaxed flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      প্রতিটি ২০ টাকা পেমেন্টের বিপরীতে গ্রাহক একটি ইউনিক টিকেট
                      নাম্বার পান।
                    </p>
                    <p className="text-gray-600 leading-relaxed flex items-center gap-2">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      এই টিকেট শুধুমাত্র উক্ত ড্র-এর জন্য বৈধ।
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3 */}
            <div className="group hover:bg-purple-50 p-6 rounded-2xl transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  3️⃣
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">
                    ড্র ও বিজয়ী নির্বাচন
                  </h2>
                  <div className="grid md:grid-cols-3 gap-4 mt-4">
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                      <span className="text-3xl block mb-2">🎲</span>
                      <p className="font-semibold text-gray-800">
                        অটোমেটিক ড্র
                      </p>
                      <p className="text-sm text-gray-600">
                        সিস্টেম দ্বারা স্বয়ংক্রিয়ভাবে
                      </p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                      <span className="text-3xl block mb-2">⏰</span>
                      <p className="font-semibold text-gray-800">
                        প্রতিদিন ড্র
                      </p>
                      <p className="text-sm text-gray-600">৫০ জন বিজয়ী</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl shadow-sm">
                      <span className="text-3xl block mb-2">🎫</span>
                      <p className="font-semibold text-gray-800">
                        একাধিক টিকেট
                      </p>
                      <p className="text-sm text-gray-600">
                        প্রতিটি টিকেট আলাদা সুযোগ
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4 & 5 Combined with Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Prize Section */}
              <div className="group hover:bg-yellow-50 p-6 rounded-2xl transition-all duration-300 border border-yellow-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">4️⃣</span>
                  <h2 className="text-xl font-bold text-gray-800">পুরস্কার</h2>
                </div>
                <div className="bg-yellow-100 rounded-xl p-4 mb-3">
                  <p className="text-yellow-800 flex items-center gap-2">
                    <span className="text-2xl">🎁</span>
                    Premium Mosquito Net ফ্রি গিফট
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  পুরস্কার নগদ অর্থে রূপান্তরযোগ্য নয়।
                </p>
              </div>

              {/* Delivery Section */}
              <div className="group hover:bg-indigo-50 p-6 rounded-2xl transition-all duration-300 border border-indigo-100">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">5️⃣</span>
                  <h2 className="text-xl font-bold text-gray-800">ডেলিভারি</h2>
                </div>
                <div className="space-y-2">
                  <p className="flex items-center gap-2 text-gray-700">
                    <span className="text-green-500">✓</span>
                    ৫-১০ কার্যদিবসের মধ্যে ডেলিভারি
                  </p>
                  <p className="flex items-center gap-2 text-gray-700">
                    <span className="text-yellow-500">!</span>
                    ডেলিভারি চার্জ প্রযোজ্য হতে পারে
                  </p>
                </div>
              </div>
            </div>

            {/* Section 6,7,8,9 in Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Refund Policy */}
              <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">6️⃣</span>
                  <h3 className="font-bold text-gray-800">রিফান্ড পলিসি</h3>
                </div>
                <p className="text-red-600 text-sm">
                  ❌ পেমেন্টের পর টিকেট রিফান্ডযোগ্য নয়
                </p>
              </div>

              {/* Fake Info */}
              <div className="bg-orange-50 p-6 rounded-2xl border border-orange-100">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">7️⃣</span>
                  <h3 className="font-bold text-gray-800">ভুয়া তথ্য</h3>
                </div>
                <p className="text-orange-600 text-sm">
                  ⚠️ ভুয়া তথ্য দিলে টিকেট বাতিল
                </p>
              </div>

              {/* Campaign Change */}
              <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">8️⃣</span>
                  <h3 className="font-bold text-gray-800">
                    ক্যাম্পেইন পরিবর্তন
                  </h3>
                </div>
                <p className="text-blue-600 text-sm">
                  কর্তৃপক্ষ নিয়ম পরিবর্তনের অধিকার রাখে
                </p>
              </div>

              {/* Data Usage */}
              <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl">9️⃣</span>
                  <h3 className="font-bold text-gray-800">ডাটা ব্যবহার</h3>
                </div>
                <p className="text-green-600 text-sm">
                  🔐 শুধুমাত্র ডেলিভারি ও ড্র পরিচালনার জন্য
                </p>
              </div>
            </div>

            {/* Last Section */}
            <div className="group hover:bg-gray-50 p-6 rounded-2xl transition-all duration-300 border-2 border-gray-200">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center text-2xl">
                  🔐
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-3">
                    শেষ কথা
                  </h2>
                  <p className="text-gray-600 text-lg">
                    এই সাইট ব্যবহার করার মাধ্যমে আপনি এই শর্তাবলীতে সম্মতি
                    দিচ্ছেন।
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-sm text-gray-500">
          <p>© 2026 মশারি ড্র - সর্বস্বত্ব সংরক্ষিত</p>
          <p className="mt-2">
            কোন প্রশ্ন থাকলে যোগাযোগ করুন:{" "}
            <a
              href="mailto:support@mosharidraw.com"
              className="text-blue-600 hover:underline"
            >
              support@mosharidraw.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Trams;
