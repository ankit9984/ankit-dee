"use client";

import React from "react";
import Link from "next/link";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { College } from "@/app/types";

type CollegesListProps = {
  colleges: College[];
  displayStyle?: "card" | "detailed";
};

export default function CollegesList({ colleges, displayStyle = "card" }: CollegesListProps) {
  if (colleges.length === 0) {
    return (
      <div className="text-center p-10 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700">
        <p className="text-gray-600 dark:text-gray-400">No colleges match your selected filters.</p>
      </div>
    );
  }

  if (displayStyle === "detailed") {
    return (
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {colleges.map((college) => (
          <Link
            href={`/college/${encodeURIComponent(college.collegeName)}`}
            key={college.collegeName}
            className="block"
          >
            <div className="border rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 bg-white dark:bg-gray-800 dark:border-gray-700 h-full">
              <div className="pb-2 border-b dark:border-gray-700">
                <h2 className="text-lg font-semibold dark:text-white">{college.collegeName}</h2>
              </div>
              <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300 my-4">
                {college.address.street && (
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="h-4 w-4 mr-2 mt-0.5 text-gray-500 dark:text-gray-400" />
                    <span>
                      {college.address.street}, {college.address.city} {college.address.pincode}
                    </span>
                  </div>
                )}
                {college.address.phone && (
                  <div className="flex items-center">
                    <FaPhone className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                    <span>{college.address.phone}</span>
                  </div>
                )}
                {college.address.email && (
                  <div className="flex items-center">
                    <FaEnvelope className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                    <span className="truncate">{college.address.email}</span>
                  </div>
                )}
              </div>
              <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {college.courses.length} courses available
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {colleges.map((college) => (
        <div
          key={college.collegeName}
          className="border rounded-lg shadow-sm p-4 bg-white dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold mb-2 dark:text-white">{college.collegeName}</h3>
          <div className="mb-2">
            <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
              {college.address.city && (
                <span>{college.address.city}</span>
              )}
              {college.address.taluka && (
                <span> - {college.address.taluka}</span>
              )}
            </p>
          </div>
          <div className="mb-4">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {college.courses.length} courses available
            </p>
          </div>
          <Link
            href={`/college/${encodeURIComponent(college.collegeName)}`}
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
          >
            View Details
          </Link>
        </div>
      ))}
    </div>
  );
} 