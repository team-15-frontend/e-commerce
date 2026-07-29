import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    window.gtranslateSettings = {
      default_language: "ar",
      native_language_names: true,
      languages: ["ar", "en", "fr", "de", "ko"],
      wrapper_selector: ".gtranslate_wrapper",
    };

    const script = document.createElement("script");

    script.src = "https://cdn.gtranslate.net/widgets/latest/dropdown.js";

    script.defer = true;

    document.body.appendChild(script);

    const waitForSelector = setInterval(() => {
      const selector = document.querySelector(".gt_selector");

      if (!selector) return;

      clearInterval(waitForSelector);

      const updateDirection = () => {
        const isArabic = selector.value === "ar|ar";

        document.documentElement.dir = isArabic ? "rtl" : "ltr";
      };

      updateDirection();

      selector.addEventListener("change", updateDirection);
    }, 300);

    return () => {
      clearInterval(waitForSelector);
      document.body.removeChild(script);
    };
  }, []);
  const pageStyle = darkMode
    ? "min-h-screen bg-gradient-to-br from-slate-900 via-[#1e293b] to-blue-950 text-white transition-all duration-500"
    : "min-h-screen bg-gradient-to-br from-white via-blue-50 to-sky-100 text-slate-900 transition-all duration-500";

  const cardStyle = darkMode
    ? "bg-slate-800/90 border-slate-700"
    : "bg-white/90 border-blue-100";

  const inputStyle = darkMode
    ? "bg-slate-700 border-slate-600 text-white"
    : "bg-white border-blue-200 text-slate-800";

  const labelStyle = darkMode ? "text-blue-100" : "text-blue-700";

  return (
    <div className={pageStyle}>
      <div className="min-h-screen flex items-center justify-center p-4">
        <div
          className={`
            w-full
            max-w-2xl
            p-6 md:p-8
            rounded-3xl
            border
            backdrop-blur-sm
            shadow-[0_20px_60px_rgba(30,41,59,.20)]
            transition-all
            duration-500
            ${cardStyle}
          `}
        >
          <div className="flex justify-between items-center mb-8">
            <h1
              className={` text-3xl font-bold ${
                darkMode ? "text-blue-300" : "text-blue-700"
              }`}
            >
              الإعدادات
            </h1>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className="
                w-12
                h-12
                rounded-xl
                bg-[#1e293b]
                text-white
                flex
                items-center
                justify-center
                hover:scale-110
                transition-all
              "
            >
              {darkMode ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </div>

          {/* Language */}
          <div className="mb-6">
            <label className={`block mb-2 text-lg font-medium ${labelStyle}`}>
              اللغة
            </label>

            <div
              className={`
                w-full

                p-3

                border

                rounded-xl

                flex

                items-center
              ${inputStyle}
              `}
            >
              <div className="gtranslate_wrapper flex-1 w-full"></div>
            </div>
          </div>

          {/* Theme */}
          <div className="mb-8">
            <label className={`block mb-2 text-lg font-medium ${labelStyle}`}>
              المظهر
            </label>

            <select
              value={darkMode ? "dark" : "light"}
              onChange={(e) => setDarkMode(e.target.value === "dark")}
              className={`
                w-full
                p-3
                border
                rounded-xl
                outline-none
                transition-all
                ${inputStyle}
              `}
            >
              <option value="light">فاتح</option>
              <option value="dark">داكن</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
