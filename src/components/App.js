import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./auth/Login";
import EmployeeForm from "./EmployeeForm";
import Home from "./Home";
import Index from "./Index";
import Settings from "./Settings";
import AddCities from "./settings/AddCities";
import AddContract from "./settings/AddContract";
import AddCounries from "./settings/AddCounries";
import AddGovernorates from "./settings/AddGovernorates";
import AddJopTitle from "./settings/AddJopTitle";
import ViewEmp from "./ViewEmp";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const user = localStorage.getItem("authToken");
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user]);
  return (
    <>
      <Routes>
        <Route path="login" element={<Login />} />
        {user && (
          <Route path="*" element={<Home />}>
            <Route index element={<Index />} />
            <Route path="employees" element={<ViewEmp />} />
            <Route path="add-employee" element={<EmployeeForm />} />
            <Route path="settings" element={<Settings />} />
            <Route path="add-counry" element={<AddCounries />} />
            <Route path="add-city" element={<AddCities />} />
            <Route path="add-governorate" element={<AddGovernorates />} />
            <Route path="add-contract" element={<AddContract />} />
            <Route path="add-jopTitle" element={<AddJopTitle />} />
          </Route>
        )}
      </Routes>
    </>
  );
}

export default App;
