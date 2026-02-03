// src/App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Index from "./pages/Index";
import ScrapBook from "./pages/ScrapBook";
import Audio from "./pages/Audio";
import Memory from "./pages/Memory";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* MainLayout က Tab Bar ကို ထိန်းချုပ်ထားတယ် */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Index />} />
          <Route path="/scrapbook" element={<ScrapBook />} />
          <Route path="/audio" element={<Audio />} />
          <Route path="/memory" element={<Memory />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
