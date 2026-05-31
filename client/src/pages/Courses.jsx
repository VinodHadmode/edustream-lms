import React from "react";
import CourseCard from "../components/CourseCard";

export const courses = [
  {
    id: 1,
    title: "Complete MERN Stack Development",
    description:
      "Learn MongoDB, Express, React, and Node.js by building real-world applications.",
    image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
  },
  {
    id: 2,
    title: "Advanced React.js",
    description:
      "Master hooks, context API, performance optimization, and scalable React architecture.",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee",
  },
  {
    id: 3,
    title: "Node.js & Express Backend",
    description:
      "Build secure REST APIs, authentication systems, and backend services using Node.js.",
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613",
  },
  {
    id: 4,
    title: "UI Design with Tailwind CSS",
    description:
      "Design modern, responsive, and clean user interfaces using Tailwind CSS.",
    image: "https://images.unsplash.com/photo-1545235617-9465d2a55698",
  },
  {
    id: 5,
    title: "JavaScript Data Structures & Algorithms",
    description:
      "Improve problem-solving skills and prepare for coding interviews using JavaScript.",
    image: "https://images.unsplash.com/photo-1517430816045-df4b7de01c0d",
  },
  {
    id: 6,
    title: "Full-Stack Web Development Bootcamp",
    description:
      "A complete hands-on bootcamp covering frontend, backend, and deployment.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  },
];

const Courses = () => {
  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-7xl mx-auto">
        {/* Header  */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold mb-3">Explore Our Courses!</h1>
          <p className="text-gray-400 max-w-xl mx-auto text-base">
            Browse our library of expert-led courses and start building
            real-world skills today.
          </p>
        </div>

        {/* course card */}
        {courses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {courses.map((course) => {
              return <CourseCard key={course.id} course={course} />;
            })}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-20 text-lg">
            No courses found for "<span className="text-white">{search}</span>"
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;
