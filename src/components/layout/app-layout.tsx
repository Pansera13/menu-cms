import { Outlet } from "react-router-dom";
import { Sidebar } from "./sidebar";

export function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden p-4 md:p-8">
        <Outlet />
      </main>
    </div>
  )
}
