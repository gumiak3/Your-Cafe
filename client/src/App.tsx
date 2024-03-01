import React from "react";
import { Navbar } from "./components/Navbar/Navbar";

const App: React.FC = () => {
  return (
    <main className="min-h-screen text-white m-auto max-w-7xl">
      <header className="flex mt-7 justify-start">
        <h1>
          <a href="/">CoffeeShop</a>
        </h1>
        <Navbar />
      </header>
    </main>
  );
};

export default App;
