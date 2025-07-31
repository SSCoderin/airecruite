"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { Video, Settings } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";
import InterviewRecording from "../_components/InterviewRecording";
export default function Interview() {
  const [interviewData, setInterviewData] = useState({});
  const [join , setJoin] = useState(false);
  const [studentData , setStudentData] = useState({
    name : "",
    email : "",
    
  });
  const { interview_id } = useParams();
  useEffect(() => {
    interview_id && getInterviewData();
  }, [interview_id]);

  const getInterviewData = async () => {
    try {
      const response = await axios.get(
        `/api/interview?interview_id=${interview_id}`
      );
      console.log(response.data);
      setInterviewData(response.data.interviewData);
    } catch (error) {
      console.log(error);
    }
  };
  const joinInterview = () => {
    if(studentData.name === "" || studentData.email === "" ) return toast.error("Enter your name and email");
    setJoin(true);
  };

  return (
    <> {join ? (<>
    <InterviewRecording interviewData={interviewData} studentData = {studentData}/>
    </>) : (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-white text-gray-800">
      <h1 className="text-4xl text-blue-600 font-bold mb-2">AIrecruit</h1>
      <p className="text-lg text-gray-600 mb-6">
        AI-powered Interview Platform
      </p>
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-6 backdrop-blur-lg border border-gray-200">
        <div className="flex justify-center ">
          <img
            src="/ai.png"
            alt="AI Interview"
            className="h-52 object-contain"
          />
        </div>

        <h2 className="text-2xl font-semibold text-center mb-2">
          {interviewData.job_position}
        </h2>
        <p className="text-center text-sm text-gray-500 mb-6">
          Duration: {interviewData.interview_duration}
        </p>

        <div className="mb-6 gap-4 flex flex-col ">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter your full name
            </label>
            <input
              type="text"
              value={studentData.name}
              placeholder="shivkiran santosh chitkulwar"
              onChange={(e) => setStudentData({...studentData , name : e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter your Email
            </label>
            <input
              type="email"
              value={studentData.email}
              placeholder="QyM9p@example.com"
              onChange={(e) => setStudentData({...studentData , email : e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="bg-blue-100 bg-opacity-50 rounded-xl p-4 mb-6 text-sm backdrop-blur-sm">
          <h3 className="font-semibold text-blue-700 mb-2">Before you begin</h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            <li>Ensure you have a stable internet connection.</li>
            <li>Stay in a quiet and well-lit environment.</li>
            <li>Test your microphone and camera.</li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-200 transition">
            <Settings size={20} />
            Test Audio & Video
          </button>
          <button
            onClick={() => joinInterview()}
            className="flex items-center cursor-pointer justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            <Video size={20} />
            Join Interview
          </button>
        </div>
      </div>
    </div>
    )}   </>
    
  );
}
