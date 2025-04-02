import Link from "next/link";
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";

type College = {
  collegeName: string;
  address: {
    street: string;
    city: string;
    pincode: string;
    taluka: string;
    district: string;
    phone: string;
    mobile: string;
    email: string;
  };
  courses: {
    courseName: string;
    intake: number;
  }[];
};

export default function CollegeList({ colleges }: { colleges: College[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {colleges.map((college) => (
        <Link
          href={`/college/${encodeURIComponent(college.collegeName)}`}
          key={college.collegeName}
          className="block"
        >
          <div className="border rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 bg-white h-full">
            <div className="pb-2 border-b">
              <h2 className="text-lg font-semibold">{college.collegeName}</h2>
            </div>
            <div className="space-y-2 text-sm text-gray-600 my-4">
              {college.address.street && (
                <div className="flex items-start">
                  <FaMapMarkerAlt className="h-4 w-4 mr-2 mt-0.5 text-gray-500" />
                  <span>
                    {college.address.street}, {college.address.city} {college.address.pincode}
                  </span>
                </div>
              )}
              {college.address.phone && (
                <div className="flex items-center">
                  <FaPhone className="h-4 w-4 mr-2 text-gray-500" />
                  <span>{college.address.phone}</span>
                </div>
              )}
              {college.address.email && (
                <div className="flex items-center">
                  <FaEnvelope className="h-4 w-4 mr-2 text-gray-500" />
                  <span className="truncate">{college.address.email}</span>
                </div>
              )}
            </div>
            <div className="text-sm font-medium text-gray-700">
              {college.courses.length} courses available
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
