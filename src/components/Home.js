import React from "react";
import { Routes, Route } from "react-router-dom";
import ViewEmp from "./ViewEmp";
import EmployeeForm from "./EmployeeForm";
import Header from "./Header";
import Index from "./Index";
import Settings from "./Settings";
import AddCounries from "./settings/AddCounries";
import AddCities from "./settings/AddCities";
import AddGovernorates from "./settings/AddGovernorates";
import AddContract from "./settings/AddContract";
import AddJopTitle from "./settings/AddJopTitle";

const Home = () => {
  return (
    <>
      <Header />
      <div>
        <Routes>
          <Route index element={<Index />} />
          <Route path="employees" element={<ViewEmp />} />
          <Route path="add-employee" element={<EmployeeForm />} />
          <Route path="settings" element={<Settings />} />
          <Route path="add-counry" element={<AddCounries />} />
          <Route path="add-city" element={<AddCities />} />
          <Route path="add-governorate" element={<AddGovernorates />} />
          <Route path="add-contract" element={<AddContract />} />
          <Route path="add-jopTitle" element={<AddJopTitle />} />
        </Routes>
      </div>
    </>
  );
};

export default Home;
