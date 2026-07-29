import { BrowserRouter, Routes, Route } from "react-router-dom";
import SettingPages from "./pages/SettingPages";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/settings" element={<SettingPages />} />
      </Routes>
    </BrowserRouter>
  );
}