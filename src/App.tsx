import { Outlet } from "react-router";
import Navbar from "./components/Navbar";
import { useCurrentNavItem } from "./hooks/useCurrentNavItem";

const App = () => {
  const currentItem = useCurrentNavItem();  
  return (
    <div className="font-Afacad bg-Primary-25 h-dvh w-screen">
      <Navbar />
      <div className="px-6 py-4 space-y-4 h-[calc(100dvh-3.875rem)] w-full">
        {currentItem ? (
          <h1 className="font-bold text-2xl text-Primary-400">
            {currentItem.label}
          </h1>
        ) : null}
        <Outlet />
      </div>
    </div>
  );
};

export default App;
