export type College = {
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