"use client";
import { Check, Copy } from "lucide-react";
import { useState, useEffect } from "react";

export default function InterviewLink({ interviewId, FormData, QuestionData ,Newinterview}) {
  const [interviewUrl, setInterviewUrl] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (interviewId) getInterviewURL();
  }, [interviewId]);

  const getInterviewURL = () => {
    const URL = process.env.NEXT_PUBLIC_HOST_URL + "/" + interviewId;
    setInterviewUrl(URL);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(interviewUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-white  text-gray-800 w-full">
      <div className="bg-green-500 p-4 rounded-full shadow-md">
        <Check size={32} className="text-white" />
      </div>

      <h1 className="text-2xl font-semibold mt-4">
        Your AI Interview is Ready!
      </h1>
      <p className="text-sm text-gray-600 mb-6 text-center">
        Share this link with the candidate to start the interview process.
      </p>

    
      <div className="w-full max-w-4xl mt-10   bg-white/60 backdrop-blur-sm border border-gray-200 p-6 rounded-2xl shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">Interview Link</h2>
          <span className="text-blue-600 bg-blue-100 px-3 py-1 text-sm rounded-full">
            Valid for 30 days
          </span>
        </div>

        <div className="flex items-center justify-between bg-gray-100 rounded-lg px-4 py-3 mb-4">
          <p className="text-sm break-all">{interviewUrl}</p>
          <button
            onClick={handleCopy}
            className="ml-4 text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <Copy size={18} />
            {copied ? "Copied" : "Copy URL"}
          </button>
        </div>

        <div className="flex justify-between text-sm text-gray-700">
          <p>Duration: {FormData?.interview_duration || "--"}</p>
          <p>Questions: {QuestionData?.length || 0}</p>
          <p>
            Expires:{" "}
            {new Date(
              Date.now() + 30 * 24 * 60 * 60 * 1000
            ).toLocaleDateString()}
          </p>
        </div>
      </div>

      

      <div className="flex  flex-row gap-4 justify-evenly items-center  w-full">
        <button onClick={() => window.location.href = "/dashboard"} className="mt-4 px-6 py-2 bg-white border-2 border-blue-300 text-blue-600 rounded-2xl transition hover:bg-blue-600 hover:text-white cursor-pointer">
          Back to Dashboard
        </button>
        <button onClick={() => Newinterview()} className="mt-4 px-6 py-2 bg-white border-2 border-blue-300 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white cursor-pointer  transition">
          + Create New Interview
        </button>
      </div>
    </div>
  );
}
