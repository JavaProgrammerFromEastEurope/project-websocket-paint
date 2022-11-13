import React from "react";
import { SettingBar, Canvas, Toolbar } from "./components/SettingBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/app.scss";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/:id">
            <Toolbar />
            <SettingBar />
            <Canvas />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
