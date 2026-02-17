import { useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    trx: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [purchasedTicket, setPurchasedTicket] = useState(null);
  const [selectedImage, setSelectedImage] = useState(
    "https://res.cloudinary.com/doyhiacif/image/upload/v1771337762/inaymqzucwu913k9zfla.jpg",
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (message.text) setMessage({ text: "", type: "" });
  };

  const validateForm = () => {
    if (!formData.name || !formData.phone || !formData.trx) {
      setMessage({
        text: "সব ঘর পূরণ করুন",
        type: "error",
      });
      return false;
    }
    if (formData.phone.length < 11) {
      setMessage({
        text: "সঠিক ফোন নম্বর দিন",
        type: "error",
      });
      return false;
    }
    return true;
  };

  const buyTicket = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        transectionId: formData.trx,
        amount: 20,
        tickets: [
          {
            buyDate: new Date(Date.now() + 6 * 60 * 60 * 1000),
            drawDate: new Date(Date.now() + 6 * 60 * 60 * 1000),
            isExpired: false,
            status: "active",
          },
        ],
      };

      const response = await fetch(`${import.meta.env.VITE_BASE_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        // Backend থেকে আসা error message দেখাও
        setMessage({
          text: data.message || "কিছু একটা ভুল হয়েছে",
          type: "error",
        });
        setLoading(false);
        return;
      }

      // Success হলে
      setPurchasedTicket(data.order.tickets[0].ticketNumber);
      setMessage({
        text: "🎉 অভিনন্দন! আপনার টিকেট কেনা সম্পন্ন হয়েছে!",
        type: "success",
      });

      setFormData({ name: "", phone: "", address: "", trx: "" });
    } catch (error) {
      setMessage({
        text: "টিকেট কেনা ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  // Sample images - replace with your actual images
  const productImages = [
    {
      id: 1,
      src: "https://res.cloudinary.com/doyhiacif/image/upload/v1771337762/inaymqzucwu913k9zfla.jpg",
      alt: "Mosquito Net Front View",
    },
    {
      id: 2,
      src: "https://res.cloudinary.com/doyhiacif/image/upload/v1771337763/efvat0xlnxqlchvcb2vi.jpg",
      alt: "Mosquito Net Side View",
    },
    {
      id: 3,
      src: "https://res.cloudinary.com/doyhiacif/image/upload/v1771338384/b9cjhvovbcexjruh2zv5.jpg",
      alt: "Mosquito Net Open View",
    },
    {
      id: 4,
      src: "https://res.cloudinary.com/doyhiacif/image/upload/v1771338384/vu6h3zjxyzu13urdbctj.jpg",
      alt: "Mosquito Net Packed",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4 font-kalpurush ">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-6 p-4">
          <p className="text-center text-gray-600 px-4">
            পুরো রমজান ম্যাস জুড়ে প্রতিদিন ৫০ জন পাবেন প্রিমিয়াম মশারি জেতার
            সুযোগ!
          </p>
          <h2 className="text-2xl font-bold text-center py-4 text-gray-800">
            মাত্র ২০ টাকায় প্রিমিয়াম মশারি জেতার সুযোগ!
          </h2>
          <p className="text-center text-gray-600 px-4">
            যে সকল গ্রাহকগন পুরুষ্কার জিততে পারবেন না তারা পাবেন প্রতিটি মশারী
            তে ২০০ টাকা ডিস্কাউন্ট।
          </p>
        </div>
        {/* Main Product Card */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-6">
          {/* Image Gallery */}
          <div className="p-6 bg-gray-50">
            {/* Main Image */}
            <div className="mb-4 rounded-2xl overflow-hidden border-4 border-white shadow-lg relative">
              <img
                src={selectedImage}
                alt="Main Product"
                className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
              />
              {/* Product Badge */}
              <div className="absolute top-8 right-8 bg-gradient-to-r from-red-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                🔥 হট ডিল
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-3">
              {productImages.map((image) => (
                <button
                  key={image.id}
                  onClick={() => setSelectedImage(image.src)}
                  className={`rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                    selectedImage === image.src
                      ? "border-blue-500 shadow-lg scale-105"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">
                  প্রিমিয়াম মশারি{" "}
                  <div className="text-center lg:hidden bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs lg:text-sm font-semibold">
                    ⭐ ৪.৮ (৫০০+ রিভিউ)
                  </div>
                </h1>
                <p className="text-gray-600">
                  🦟 ডেঙ্গু প্রতিরোধ | ৩ লেয়ার প্রটেকশন | এয়ার ফ্লো ডিজাইন
                </p>
              </div>
              <div className="hidden lg:block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs lg:text-sm font-semibold">
                ⭐ ৪.৮ (৫০০+ রিভিউ)
              </div>
            </div>

            {/* Price and Prize Section */}
            <div className="bg-gradient-to-r from-green-600 to-gray-600 rounded-2xl p-5 text-white mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm opacity-90 mb-1">টিকেট মূল্য</p>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">৳২০</span>
                  </div>
                </div>
                <div className="h-12 w-px bg-white opacity-30"></div>
                <div className="text-right">
                  <p className="text-sm opacity-90 mb-1">
                    প্রতিদিন মোট পুরস্কার
                  </p>
                  <div className="flex items-baseline">
                    <span className="text-3xl font-bold">৫০ টি মশারী</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {[
                {
                  icon: "📅",
                  text: "প্রতিদিন রাত ১০ঃ৩০ ঘটিকায় ড্র অনুষ্ঠিত হবে",
                },
                {
                  icon: "✓",
                  text: "বিজয়ীদের পরবর্তি ৭ কর্মদিবসের মধ্যে পুরস্কার বুঝিয়ে দেওয়া হবে",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-xl p-3 text-center"
                >
                  <span className="text-2xl mb-1 block">{feature.icon}</span>
                  <span className="text-xs text-gray-600">{feature.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Purchase Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-6 mb-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              🎟️ আপনার লাকি টিকেট কিনুন
            </h2>
            <p className="text-gray-600">নিচের ফর্ম পূরণ করে ড্রতে অংশ নিন</p>
          </div>

          {/* Form Fields */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                আপনার নাম <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="আপনার পূর্ণ নাম লিখুন"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ফোন নম্বর <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="০১XXXXXXXXX"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ঠিকানা (ঐচ্ছিক)
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="আপনার ঠিকানা"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                এই নাম্বারে ০১৭৬৫১১৮৯১৫ এ সেন্ড মানি করে ট্রানজেকশন আইডি দিন{" "}
                <span className="text-red-500">*</span>
              </label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                বিকাশ/নগদ ট্রানজেকশন আইডি{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="trx"
                value={formData.trx}
                onChange={handleChange}
                placeholder="ট্রানজেকশন আইডি দিন"
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                disabled={loading}
              />
              <Link
                to="/terms"
                className="text-sm text-green-700 mt-2 flex items-center gap-2"
              >
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full "></span>
                টিকেট কেনার জন্য নিয়মাবলি দেখাতে এখানে ক্লিক করুন
              </Link>
            </div>

            {/* Payment Summary */}
            <div className="bg-gray-50 rounded-xl p-4 mt-4">
              <div className="flex justify-between text-gray-600 py-2">
                <span>টিকেট মূল্য:</span>
                <span className="font-semibold">৳ ২০ </span>
              </div>
              <div className="border-t-2 border-dashed border-gray-200 my-2"></div>
              <div className="flex justify-between font-bold text-gray-800 pt-2">
                <span>মোট মূল্য:</span>
                <span className="text-blue-600">৳ ২০</span>
              </div>
            </div>

            {/* Buy Button */}
            <button
              onClick={buyTicket}
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 cursor-pointer"
            >
              {loading ? (
                <>
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                  প্রসেসিং...
                </>
              ) : (
                "টিকেট কিনুন"
              )}
            </button>

            {/* Message */}
            {message.text && (
              <div
                className={`p-4 rounded-xl text-center animate-slideIn ${
                  message.type === "success"
                    ? "bg-green-100 text-green-700 border border-green-200"
                    : "bg-red-100 text-red-700 border border-red-200"
                }`}
              >
                {message.type === "success" ? "✅" : "⚠️"} {message.text}
              </div>
            )}

            {/* Ticket Display */}
            {purchasedTicket && (
              <div className="bg-gradient-to-r from-yellow-400 to-orange-400 p-6 rounded-xl text-white text-center animate-scaleIn">
                <h4 className="text-lg mb-3">🎫 আপনার টিকেট নম্বর</h4>
                <div className="bg-white/20 backdrop-blur rounded-lg p-4 mb-3">
                  <p className="text-3xl font-mono font-bold tracking-widest">
                    {purchasedTicket}
                  </p>
                </div>
                <p className="text-sm opacity-90">
                  এই নম্বর সংরক্ষণ করুন - ড্র এর ফলাফলের জন্য প্রয়োজন হবে
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: "🔒", text: "সুরক্ষিত পেমেন্ট" },
            { icon: "⚡", text: "ইনস্ট্যান্ট টিকেট" },
            { icon: "🎯", text: "গ্যারান্টিড ড্র" },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 text-center shadow-md hover:shadow-lg transition-all"
            >
              <span className="text-3xl mb-2 block">{item.icon}</span>
              <span className="text-xs text-gray-600">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
