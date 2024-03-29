import ReactDOM from "react-dom/client";
import "./styles/main.scss";
import App from "./App.jsx";
import global_en from "../src/translations/en/global.json";
import global_ar from "../src/translations/ar/global.json";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
i18next.init({
  interpolation: { escapeValue: true },
  lng: "en",
  resources: {
    en: { global: global_en },
    ar: { global: global_ar },
  },
});
ReactDOM.createRoot(document.getElementById("root")).render(
  <I18nextProvider i18n={i18next}>
    <App />
  </I18nextProvider>
);
