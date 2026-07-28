import { useState } from "react";
import { Sun, Moon } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);

  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

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

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);

    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  return (
    <div dir={isArabic ? "rtl" : "ltr"} className={pageStyle}>
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
          {/* main */}

          <div className="flex justify-between items-center mb-8">
            <h1
              className={`
                text-3xl
                font-bold
                ${darkMode ? "text-blue-300" : "text-blue-700"}
              `}
            >
              {t("title")}
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
              {t("language")}
            </label>

            <select
              value={i18n.language}
              onChange={(e) => changeLanguage(e.target.value)}
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
              <option value="ar">العربية</option>

              <option value="en">English</option>
            </select>
          </div>

          {/* Theme selector */}

          <div className="mb-8">
            <label className={`block mb-2 text-lg font-medium ${labelStyle}`}>
              {t("theme")}
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
              <option value="light">{t("light")}</option>

              <option value="dark">{t("dark")}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
