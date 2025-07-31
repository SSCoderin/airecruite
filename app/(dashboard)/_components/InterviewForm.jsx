"use client";

import { ChevronDown, PlusCircle } from "lucide-react"; // Importing icons for dropdown and button
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import GenrateQuestion from "../_components/GenrateQuestion ";
import InterviewLink from "../_components/InterviewLink";
import { toast } from "sonner";
export default function InterviewForm() {
  const [question, setQuestion] = useState(false);
  const [displaylink, setDisplayLink] = useState(false);
  const [interviewId, setInterviewId] = useState(null);
  const [FormData, setFormData  ] = useState(null);
  const [QuestionData, setQuestionData] = useState(null); 
  const [form, setForm] = useState({
    job_position: "",
    job_descripton: "",
    interview_duration: "",
    interview_type: [],
  });
  const router = useRouter();

  const HandleFormSubmit = () => {
    if (
      form.job_position &&
      form.job_descripton &&
      form.interview_duration &&
      form.interview_type.length > 0
    ) {
      setQuestion(true);
    } else {
      toast.error("Please fill all the fields");
    }
  };

  const onCreateLink = (interview_id, formdata, QuestionData) => {
    setInterviewId(interview_id);
    setFormData(formdata);
    setQuestionData(QuestionData);
    setDisplayLink(true);
  };
  const HandleNewInterview = () => {
    setQuestion(false);
    setDisplayLink(false);
    setInterviewId(null);
    setFormData(null);
    setQuestionData(null);
  };

  return (
    <>
      {question ? (
        <>
          {displaylink ? (
            <div className="mb-20">
            <InterviewLink interviewId={interviewId} FormData={FormData} QuestionData={QuestionData}  Newinterview = {() => HandleNewInterview()}
/>
             
            </div>
          ) : (
            <div className="mb-20">
              <button
                className="bg-white cursor-pointer text-indigo-600 hover:bg-indigo-100 font-semibold  py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 "
                onClick={() => setQuestion(false)}
              >
                back to Form
              </button>
              <GenrateQuestion
                formdata={form}
                onCreateLink={(interview_id , formdata , QuestionData) => onCreateLink(interview_id , formdata , QuestionData)}
              />
            </div>
          )}
        </>
      ) : (
        <>
          <button
            onClick={() => router.back()}
            className="bg-white cursor-pointer text-indigo-600 hover:bg-indigo-100 font-semibold py-2 px-4 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 flex items-center justify-center"
          >
            back to Dashboard
          </button>
          <div className=" bg-white px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-3xl w-full bg-white p-8 rounded-xl shadow-lg border border-gray-200">
              <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-8">
                Create New Interview
              </h1>

              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="jobPosition"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Job Position
                  </label>
                  <input
                    type="text"
                    value={form.job_position}
                    onChange={(e) =>
                      setForm({ ...form, job_position: e.target.value })
                    }
                    placeholder="e.g., Software Engineer, Marketing Manager"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="jobDescription"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Job Description
                  </label>
                  <textarea
                    rows={4}
                    value={form.job_descripton}
                    onChange={(e) =>
                      setForm({ ...form, job_descripton: e.target.value })
                    }
                    placeholder="Provide a detailed description of the job role and responsibilities."
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm resize-y"
                  ></textarea>
                </div>

                <div>
                  <label
                    htmlFor="interviewDuration"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Interview Duration
                  </label>
                  <div className="relative">
                    <select
                      value={form.interview_duration}
                      onChange={(e) =>
                        setForm({ ...form, interview_duration: e.target.value })
                      }
                      name="interviewDuration"
                      className="mt-1 block w-full pl-4 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none"
                    >
                      <option value="">Select Duration</option>
                      <option value="15min">15 Minutes</option>
                      <option value="30min">30 Minutes</option>
                      <option value="45min">45 Minutes</option>
                      <option value="60min">60 Minutes</option>
                      <option value="90min">90 Minutes</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <ChevronDown
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interview Type
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {[
                      "Technical",
                      "Behavioral",
                      "Experience",
                      "Problem Solving",
                      "Leadership",
                    ].map((type) => (
                      <div key={type} className="flex items-center">
                        <input
                          id={`type-${type.toLowerCase().replace(/\s/g, "-")}`}
                          name="interviewType"
                          type="checkbox"
                          value={type}
                          checked={form.interview_type.includes(type)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setForm({
                                ...form,
                                interview_type: [...form.interview_type, type],
                              });
                            } else {
                              setForm({
                                ...form,
                                interview_type: form.interview_type.filter(
                                  (t) => t !== type
                                ),
                              });
                            }
                          }}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor={`type-${type
                            .toLowerCase()
                            .replace(/\s/g, "-")}`}
                          className="ml-2 block text-sm text-gray-900"
                        >
                          {type}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      HandleFormSubmit();
                    }}
                    className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out transform hover:-translate-y-0.5"
                  >
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Generate Question
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
}
