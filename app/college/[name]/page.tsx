import type { Metadata } from "next";
import { collegeData } from "@/data/colleges";
import { notFound } from "next/navigation";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import SchemaOrg from "@/app/components/SchemaOrg";

interface PageParams {
  name: string;
}

interface PageProps {
  params: PageParams;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const decodedName = decodeURIComponent(params.name);
  const college = collegeData.find((c) => c.collegeName === decodedName);

  if (!college) {
    return {
      title: "College Not Found",
    };
  }

  return {
    title: `${college.collegeName} | Courses and Information`,
    description: `View courses, intake capacities, and contact information for ${college.collegeName}`,
  };
}

export default async function CollegePage({ params }: PageProps) {
  const decodedName = decodeURIComponent(params.name);
  const college = collegeData.find((c) => c.collegeName === decodedName);

  if (!college) {
    notFound();
  }

  return (
    <main className="min-h-screen p-4 md:p-8 max-w-6xl mx-auto">
      <SchemaOrg 
        title={`${college.collegeName} | Courses and Information`}
        description={`View courses, intake capacities, and contact information for ${college.collegeName}`}
        type="CollegeOrUniversity"
        collegeName={college.collegeName}
        address={{
          street: college.address.street,
          city: college.address.city,
          pincode: college.address.pincode,
          district: college.address.district,
        }}
      />
      
      <Link href="/" className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:underline mb-6">
        <FaArrowLeft className="mr-2 h-4 w-4" />
        Back to all colleges
      </Link>

      <h1 className="text-2xl md:text-3xl font-bold mb-6">{college.collegeName}</h1>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <div className="border rounded-lg shadow-sm p-4 bg-white dark:bg-gray-800 dark:border-gray-700">
          <h2 className="text-lg font-semibold border-b pb-2 dark:border-gray-700">College Information</h2>
          <table className="w-full mt-4 text-sm text-gray-600 dark:text-gray-300">
            <tbody>
              {college.address.street && (
                <tr>
                  <td className="font-medium">Street</td>
                  <td>{college.address.street}</td>
                </tr>
              )}
              {college.address.city && (
                <tr>
                  <td className="font-medium">City</td>
                  <td>{college.address.city}</td>
                </tr>
              )}
              {college.address.pincode && (
                <tr>
                  <td className="font-medium">Pincode</td>
                  <td>{college.address.pincode}</td>
                </tr>
              )}
              {college.address.taluka && (
                <tr>
                  <td className="font-medium">Taluka</td>
                  <td>{college.address.taluka}</td>
                </tr>
              )}
              {college.address.district && (
                <tr>
                  <td className="font-medium">District</td>
                  <td>{college.address.district}</td>
                </tr>
              )}
              {college.address.phone && (
                <tr>
                  <td className="font-medium">Phone</td>
                  <td>{college.address.phone}</td>
                </tr>
              )}
              {college.address.mobile && (
                <tr>
                  <td className="font-medium">Mobile</td>
                  <td>{college.address.mobile}</td>
                </tr>
              )}
              {college.address.email && (
                <tr>
                  <td className="font-medium">Email</td>
                  <td>{college.address.email}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border rounded-lg shadow-sm p-4 bg-white dark:bg-gray-800 dark:border-gray-700">
          <h2 className="text-lg font-semibold border-b pb-2 dark:border-gray-700">Courses and Intake</h2>
          <table className="w-full mt-4 text-sm text-gray-600 dark:text-gray-300">
            <thead>
              <tr>
                <th className="text-left">Course Name</th>
                <th className="text-right">Intake Capacity</th>
              </tr>
            </thead>
            <tbody>
              {college.courses.map((course) => (
                <tr key={course.courseName}>
                  <td>{course.courseName}</td>
                  <td className="text-right">{course.intake}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}