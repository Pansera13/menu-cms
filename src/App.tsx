import { Navigate, Route, Routes } from "react-router-dom"
import { AppLayout } from "./components/layout/app-layout"

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="categories" replace />} />
      </Route>
    </Routes>
  )
}

export default App
