import React from "react";
import DocumentStacksSection from "../components/DocumentStacksSection";
import RecentDocuments from "../components/RecentDocuments";
import FloatingMenu from "../components/FloatingMenu";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#F4F7FA]">
      <DocumentStacksSection userId={user?.id} />
      <div className="mt-10">
        <RecentDocuments />
      </div>
      <FloatingMenu />
    </div>
  );
};

export default Dashboard;