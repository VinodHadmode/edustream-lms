import { CheckCircle, ChevronLeft, Circle, PlayCircle } from "lucide-react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

const CourseProgress = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [progress, setProgress] = useState(null);
  const [currentLecture, setCurrentLecture] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourseProgress();
  }, [courseId]);

  console.log("course", course);
  console.log("progress", progress);

  const isLectureCompleted = (lectureId) => {
    return progress?.completedLectures?.some(
      (id) => id.toString() === lectureId.toString(),
    );
  };

  const completionPercentage = () => {
    if (!course || !progress) return 0;
    if (course.lectures.length === 0) return 0;
    return Math.round(
      (progress.completedLectures.length / course.lectures.length) * 100,
    );
  };

  const handleToggleComplete = async (lectureId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/progress/${courseId}/lectures/${lectureId}`,
        {
          method: "POST",
          credentials: "include",
        },
      );
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to update progress");
        return;
      }

      setProgress(data.progress);
    } catch (error) {
      toast.error("Failed to update progress");
    }
  };

  const fetchCourseProgress = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/progress/${courseId}`,
        {
          credentials: "include",
        },
      );

      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message || "Failed to fetch course");
        return;
      }
      setCourse(data.course);
      setProgress(data.progress);

      //Auto-select first lecture
      if (data.course.lectures.length > 0) {
        setCurrentLecture(data.course.lectures[0]);
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to load course");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">Loading course...</p>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-400">Course not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Header  */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => navigate(-1)}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-white">{course?.title}</h1>
          <p className="text-gray-400 text-sm mt-0.5">
            {progress?.completedLectures?.length || 0} of{" "}
            {course.lectures.length} lectures completed
          </p>
        </div>

        {/* progress bar */}
        <div className="hidden md:flex items-center gap-3">
          <div className="w-40 bg-gray-700 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage()}%` }}
            />
          </div>
          <span className="text-gray-400 text-sm font-medium">
            {completionPercentage()}%
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* left - video player */}
        <div className="flex-1 space-y-4">
          {currentLecture ? (
            <>
              {/* video  */}
              <div className="bg-black rounded-2xl overflow-hidden aspect-video">
                <video
                  key={currentLecture._id}
                  src={currentLecture.videoUrl}
                  controls
                  controlsList="nodownload"
                  crossOrigin="anonymous"
                  onError={(e) => {
                    console.log("Video error:", e);
                    toast.error("Failed to load video");
                  }}
                  className="w-full h-full"
                >
                  Your browser does not support the video tag
                </video>
              </div>

              {/* Current lecture info  */}
              <div className="bg-gray-900 rounded-2xl p-5 flex items-center justify-between">
                <div>
                  <p className="text-white font-semibold">
                    {currentLecture?.title}
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    Lecture{" "}
                    {course?.lectures.findIndex(
                      (l) =>
                        l._id?.toString() === currentLecture._id?.toString(),
                    ) + 1}{" "}
                    of {course.lectures.length}
                  </p>
                </div>
                <button
                  onClick={() => handleToggleComplete(currentLecture._id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${isLectureCompleted(currentLecture._id) ? "bg-green-500/10 text-green-400 hover:bg-green-500/20" : "bg-blue-500 hover:bg-blue-600 text-white"}`}
                >
                  {isLectureCompleted(currentLecture._id) ? (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Completed
                    </>
                  ) : (
                    <>
                      <Circle className="w-4 h-4" />
                      Mark Complete
                    </>
                  )}
                </button>
              </div>
            </>
          ) : (
            <div className="bg-gray-900 rounded-2xl aspect-video flex items-center justify-center">
              <p className="text-gray-500">No lectures available</p>
            </div>
          )}
        </div>

        {/* Right - lecture list  */}
        <div className="lg:w-80 shrink-0">
          <div className="bg-gray-900 rounded-2xl overflow-hidden">
            {/* List Header  */}
            <div className="px-5 py-4 border-b border-gray-700">
              <h2 className="text-white font-bold">Course Content</h2>
              <p className="text-gray-400 text-xs mt-1">
                {course?.lectures.length} lectures
              </p>
            </div>

            {/* Lectures  */}
            <div>
              {course?.lectures.map((lecture, index) => {
                const isCompleted = isLectureCompleted(lecture._id);
                const isActive =
                  currentLecture?._id?.toString() === lecture._id?.toString();

                return (
                  <div
                    key={lecture._id}
                    onClick={() => setCurrentLecture(lecture)}
                    className={`flex items-center gap-3 px-5 py-4 cursor-pointer transition-colors duration-150 ${isActive ? "bg-blue-500/10 border-l-2 border-blue-500" : "hover:bg-gray-800"}`}
                  >
                    {/* Complete indicator  */}
                    <div>
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-gray-400" />
                      ) : isActive ? (
                        <PlayCircle className="w-5 h-5 text-blue-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-600" />
                      )}
                    </div>

                    {/* Lecture info  */}
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-sm font-medium truncate ${isActive ? "text-white" : "text-gray-300"}`}
                      >
                        {index + 1}. {lecture.title}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Course completed message  */}
          {progress?.completed && (
            <div className="mt-4 bg-green-500/10 border border-green-500/30 rounded-2xl p-4 text-center">
              <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
              <p className="text-green-400 font-semibold">Course Completed</p>
              <p className="text-gray-400 text-xs mt-1">
                You've completed all lectures
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
