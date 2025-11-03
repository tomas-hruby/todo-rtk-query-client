import React, { useEffect } from "react";
import "./index.css";
import { Header } from "./components/Header";
import { ErrorBanner } from "./components/ErrorBanner";
import { TaskCreationSection } from "./components/TaskCreationSection";
import { TaskManager } from "./components/TaskManager";
import { Footer } from "./components/Footer";
import { useAppSelector } from "./store/hooks";
import { selectTheme } from "./store/selectors";

function App() {
  // Redux state - pouze theme pro celou aplikaci
  const theme = useAppSelector(selectTheme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className="min-h-screen bg-custom-background text-custom-primary-text flex flex-col">
      <Header />

      <ErrorBanner />

      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-8 space-y-4 sm:space-y-8">
        <TaskCreationSection />

        <TaskManager />
      </main>

      <Footer />
    </div>
  );
}

export default App;
