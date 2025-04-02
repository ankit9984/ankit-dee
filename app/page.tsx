"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import { FaSearch, FaFilter } from "react-icons/fa"
import { collegeData } from "@/data/colleges"
import CollegesList from "@/app/components/CollegesList"
import CollegeFilter from "@/app/components/CollegeFilter"
import Header from "@/components/Header"
import SchemaOrg from "@/app/components/SchemaOrg"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filteredCollegeData, setFilteredCollegeData] = useState(collegeData)

  const searchFilteredColleges = filteredCollegeData
    .filter((college) => college.collegeName.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(0, 5)

  const handleFilterChange = useCallback((filteredData: any[]) => {
    setFilteredCollegeData(filteredData);
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto">
        <SchemaOrg
          title="College Directory - Find Colleges and Courses"
          description="Find colleges, compare courses, and discover intake capacities across various educational institutions"
        />
        <div className="py-6 sm:py-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-8">Find Your College</h1>

          <div className="relative mb-8 max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <FaSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for colleges..."
              className="w-full pl-10 p-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 dark:text-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Basic Filters</h2>
            <Link href="/colleges" className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm">
              <FaFilter className="mr-2 h-4 w-4" />
              Advanced Filters
            </Link>
          </div>

          <CollegeFilter onFilterChange={handleFilterChange} />

          {searchQuery ? (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Search Results</h2>
              {searchFilteredColleges.length > 0 ? (
                <div className="grid gap-4">
                  {searchFilteredColleges.map((college) => (
                    <Link href={`/college/${encodeURIComponent(college.collegeName)}`} key={college.collegeName}>
                      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer bg-white dark:bg-gray-800">
                        <h3 className="font-medium dark:text-white">{college.collegeName}</h3>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No colleges found matching your search.</p>
              )}
            </div>
          ) : (
            <CollegesList colleges={filteredCollegeData} displayStyle="detailed" />
          )}
        </div>
      </main>
    </>
  )
}