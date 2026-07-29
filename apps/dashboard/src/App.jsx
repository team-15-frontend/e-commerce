import { BrowserRouter, Routes, Route } from "react-router-dom";
import SettingsPage from "./pages/Settingpages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}