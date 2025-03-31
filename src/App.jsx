import React from "react";
import News from "./Components/News";
import { Spotlight } from "./Components/Spotlight";

const App = () => {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden flex items-center justify-center">
      {/* 🎯 Spotlight (가장 앞에 위치, z-50 정도) */}
      <Spotlight className="z-50" fill="white" />

      {/* 뉴스 콘텐츠 (중간) */}
      <div className="relative z-10 w-full max-w-7xl px-4">
        <News />
      </div>
    </div>
  );
};

export default App;
