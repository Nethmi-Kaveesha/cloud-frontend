import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto container max-w-7xl pt-4">
        <Outlet />
      </main>
    </div>
  );
}
