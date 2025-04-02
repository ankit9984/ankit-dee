"use client";

import { useState, useCallback } from "react";
import { collegeData } from "@/data/colleges";
import CollegeFilter from "@/app/components/CollegeFilter";
import CollegesList from "@/app/components/CollegesList";
import { FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import SchemaOrg from "@/app/components/SchemaOrg";

export default function CollegesPage() {
  const [filteredCollegeData, setFilteredCollegeData] = useState(collegeData);

  const handleFilterChange = useCallback((filteredData: any[]) => {
    setFilteredCollegeData(filteredData);
  }, []);

  const title = "All Colleges - Find and Filter Colleges";
  const description = "Browse, search and filter colleges by taluka, area, and courses. Find the right college for your educational needs.";

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto">
      <SchemaOrg
        title={title}
        description={description}
      />

      <Link href="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6">
        <FaArrowLeft className="mr-2 h-4 w-4" />
        Back to home
      </Link>

      <h1 className="text-2xl md:text-3xl font-bold mb-6">All Colleges</h1>
      
      <div className="mb-8">
        <CollegeFilter onFilterChange={handleFilterChange} />
      </div>

      <div className="mb-4">
        <p className="text-gray-600 dark:text-gray-300 text-sm">
          Showing {filteredCollegeData.length} of {collegeData.length} colleges
        </p>
      </div>

      <CollegesList colleges={filteredCollegeData} displayStyle="card" />
    </main>
  );
} 