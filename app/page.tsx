"use client"

import { useState } from "react"
import Link from "next/link"
import { FaSearch } from "react-icons/fa"
import { collegeData } from "@/data/colleges"
import CollegeList from "@/components/CollegeList"
// import { collegeData } from "@/data/colleges"

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredColleges = collegeData
    .filter((college) => college.collegeName.toLowerCase().includes(searchQuery.toLowerCase()))
    .slice(0, 5)

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">College Directory</h1>

      <div className="relative mb-8 max-w-xl mx-auto">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <FaSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search for colleges..."
          className="w-full pl-10 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {searchQuery ? (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Search Results</h2>
          {filteredColleges.length > 0 ? (
            <div className="grid gap-4">
              {filteredColleges.map((college) => (
                <Link href={`/college/${encodeURIComponent(college.collegeName)}`} key={college.collegeName}>
                  <div className="p-4 border border-gray-200 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                    <h3 className="font-medium">{college.collegeName}</h3>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No colleges found matching your search.</p>
          )}
        </div>
      ) : (
        <CollegeList colleges={collegeData}/>
      )}
    </main>
  )
}
