"use client";

import React, { useState, useEffect } from "react";
import { collegeData } from "@/data/colleges";

type CollegeFilterProps = {
  onFilterChange: (filteredData: any[]) => void;
};

export default function CollegeFilter({ onFilterChange }: CollegeFilterProps) {
  const [selectedTaluka, setSelectedTaluka] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [selectedArea, setSelectedArea] = useState<string>("");

  // Extract unique values for filters
  const talukas = Array.from(
    new Set(collegeData.map((college) => college.address.taluka).filter(Boolean))
  ).sort();

  const areas = Array.from(
    new Set(collegeData.map((college) => college.address.city).filter(Boolean))
  ).sort();

  const allCourses = collegeData.flatMap((college) => 
    college.courses.map((course) => course.courseName)
  );
  const courses = Array.from(new Set(allCourses)).sort();

  // Apply filters
  useEffect(() => {
    let filteredColleges = [...collegeData];

    if (selectedTaluka) {
      filteredColleges = filteredColleges.filter(
        (college) => college.address.taluka === selectedTaluka
      );
    }

    if (selectedArea) {
      filteredColleges = filteredColleges.filter(
        (college) => college.address.city === selectedArea
      );
    }

    if (selectedCourse) {
      filteredColleges = filteredColleges.filter((college) =>
        college.courses.some((course) => course.courseName === selectedCourse)
      );
    }

    onFilterChange(filteredColleges);
  }, [selectedTaluka, selectedCourse, selectedArea, onFilterChange]);

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-6 border dark:border-gray-700">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">Filter Colleges</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label htmlFor="taluka" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Taluka
          </label>
          <select
            id="taluka"
            value={selectedTaluka}
            onChange={(e) => setSelectedTaluka(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">All Talukas</option>
            {talukas.map((taluka) => (
              <option key={taluka} value={taluka}>
                {taluka}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="course" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Course
          </label>
          <select
            id="course"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">All Courses</option>
            {courses.map((course) => (
              <option key={course} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="area" className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            Area
          </label>
          <select
            id="area"
            value={selectedArea}
            onChange={(e) => setSelectedArea(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">All Areas</option>
            {areas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="mt-4">
        <button
          onClick={() => {
            setSelectedTaluka("");
            setSelectedCourse("");
            setSelectedArea("");
          }}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
        >
          Clear Filters
        </button>
      </div>
    </div>
  );
} 