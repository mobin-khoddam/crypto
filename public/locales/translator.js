import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpApi from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
    .use(HttpApi) // برای بارگذاری فایل‌های ترجمه
    .use(LanguageDetector) // تشخیص زبان مرورگر
    .use(initReactI18next) // ادغام با React
    .init({
        supportedLngs: ["en", "fa"], // زبان‌های پشتیبانی‌شده
        fallbackLng: "en", // زبان پیش‌فرض
        debug: true, // برای دیباگ در حالت توسعه
        interpolation: {
            escapeValue: false, // برای جلوگیری از مشکلات XSS
        },
        backend: {
            loadPath: "/locales/{{lng}}/translation.json", // مسیر فایل‌های ترجمه
        },
    });

export default i18n;
