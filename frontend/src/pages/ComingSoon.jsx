import React, { useState, useEffect } from "react";

const ComingSoon = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Set launch date (7 days from now)
  useEffect(() => {
    const launchDate = new Date();
    launchDate.setDate(launchDate.getDate() + 1);
    launchDate.setHours(10, 0, 0, 0); // Launch at 10:00 AM

    const timer = setInterval(() => {
      const now = new Date();
      const difference = launchDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      // Simulate subscription - replace with actual API call
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  // Add leading zero to numbers
  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Mosquito Nets */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute text-white opacity-5 text-6xl animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
              transform: `rotate(${Math.random() * 360}deg)`,
            }}
          >
            🦟
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12 sm:px-6 lg:px-8">
        {/* Logo or Icon */}
        <div className="mb-8 animate-bounce">
          <div className="w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center shadow-2xl">
            <span className="text-5xl">🎯</span>
          </div>
        </div>

        {/* Coming Soon Text */}
        <h1 className="text-5xl md:text-7xl font-bold text-white text-center mb-4 animate-pulse">
          Coming Soon
        </h1>

        <div className="text-2xl md:text-3xl text-purple-200 text-center mb-8">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-400">
            মশারি ড্র
          </span>
        </div>

        {/* Description */}
        <p className="text-xl text-gray-300 text-center max-w-2xl mb-12">
          🎉 আমরা খুব শীঘ্রই আসছি! আমাদের প্রথম ড্র শুরু হতে আর মাত্র কিছুদিন
          বাকি। থাকুন সাথে, জিতে নিন প্রিমিয়াম মশারি!
        </p>

        {/* Countdown Timer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white border-opacity-20 transform hover:scale-105 transition-transform">
            <div className="text-4xl md:text-5xl font-bold text-gray-600 mb-2">
              {formatNumber(timeLeft.days)}
            </div>
            <div className="text-sm md:text-base text-purple-600">দিন</div>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white border-opacity-20 transform hover:scale-105 transition-transform">
            <div className="text-4xl md:text-5xl font-bold mb-2 text-gray-600">
              {formatNumber(timeLeft.hours)}
            </div>
            <div className="text-sm md:text-base text-purple-600">ঘন্টা</div>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white border-opacity-20 transform hover:scale-105 transition-transform">
            <div className="text-4xl md:text-5xl font-bold text-gray-600 mb-2">
              {formatNumber(timeLeft.minutes)}
            </div>
            <div className="text-sm md:text-base text-purple-600">মিনিট</div>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6 text-center border border-white border-opacity-20 transform hover:scale-105 transition-transform">
            <div className="text-4xl md:text-5xl font-bold text-gray-600 mb-2">
              {formatNumber(timeLeft.seconds)}
            </div>
            <div className="text-sm md:text-base text-purple-600">সেকেন্ড</div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl">
          <div className="bg-white bg-opacity-5 backdrop-blur-lg rounded-xl p-6 text-center border border-white border-opacity-10">
            <span className="text-4xl mb-3 block">🎫</span>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              লাকি ড্র
            </h3>
            <p className="text-sm text-gray-600">প্রতি দিন ড্র ও পুরস্কার</p>
          </div>

          <div className="bg-white bg-opacity-5 backdrop-blur-lg rounded-xl p-6 text-center border border-white border-opacity-10">
            <span className="text-4xl mb-3 block">🦟</span>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              প্রিমিয়াম মশারি
            </h3>
            <p className="text-sm text-gray-600">৩ লেয়ার ডেঙ্গু প্রোটেকশন</p>
          </div>

          <div className="bg-white bg-opacity-5 backdrop-blur-lg rounded-xl p-6 text-center border border-white border-opacity-10">
            <span className="text-4xl mb-3 block">🏆</span>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              বড় পুরস্কার
            </h3>
            <p className="text-sm text-gray-600">৫০টি মশারী প্রতিদিন গিফট</p>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex gap-6">
          <a
            href="#"
            className="text-white hover:text-purple-300 transition-colors transform hover:scale-110"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </a>
          <a
            href="#"
            className="text-white hover:text-purple-300 transition-colors transform hover:scale-110"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.22 1.802h-.51c-2.403 0-2.741.01-3.735.054-.979.042-1.51.206-1.864.342a3.112 3.112 0 00-1.157.747 3.112 3.112 0 00-.747 1.157c-.136.354-.3.885-.342 1.864-.044.997-.054 1.332-.054 3.735v.63c0 2.402.01 2.74.054 3.734.042.98.206 1.51.342 1.864.164.428.36.79.747 1.157.367.367.73.563 1.157.747.354.136.885.3 1.864.342.997.044 1.332.054 3.735.054h.63c2.403 0 2.741-.01 3.735-.054.98-.042 1.51-.206 1.864-.342a3.112 3.112 0 001.157-.747c.367-.367.563-.73.747-1.157.136-.354.3-.885.342-1.864.044-.997.054-1.332.054-3.735v-.63c0-2.403-.01-2.741-.054-3.735-.042-.98-.206-1.51-.342-1.864a3.112 3.112 0 00-.747-1.157 3.112 3.112 0 00-1.157-.747c-.354-.136-.885-.3-1.864-.342-.997-.044-1.332-.054-3.735-.054z" />
              <path d="M16.222 6.618a1.23 1.23 0 102.184.818 1.23 1.23 0 00-2.184-.818zm-5.564 3.93a3.152 3.152 0 110 6.304 3.152 3.152 0 010-6.304zm0 1.802a1.35 1.35 0 100 2.7 1.35 1.35 0 000-2.7z" />
            </svg>
          </a>
          <a
            href="#"
            className="text-white hover:text-purple-300 transition-colors transform hover:scale-110"
          >
            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>🚀 প্রথম ড্র শুরু হবে ১৯ ফেব্রুয়ারী, ২০২৬ রাত ১০:৩০ টায়</p>
          <p className="mt-2">© ২০২৬ প্রিমিয়াম মশারী - সর্বস্বত্ব সংরক্ষিত</p>
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-slideUp {
          animation: slideUp 0.5s ease-out;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
};

export default ComingSoon;
