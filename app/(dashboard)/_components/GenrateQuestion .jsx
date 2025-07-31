"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Loader } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import uuidv4 from 'uuid4';
export default function GenrateQuestion({ formdata ,onCreateLink }) {
  const [QuestionData, setQuestionData] = useState();
  const [loading, setLoading] = useState(true);
  const calledOnce = useRef(false);
  const { user } = useUser();
  const interview_id  = uuidv4();

  useEffect(() => {
    if (!calledOnce.current) {
      calledOnce.current = true;
      Generatequestion();
    }
  }, [formdata]);

  const Generatequestion = async () => {
    try {
      const response = await axios.post("/api/generatequestion", {
        ...formdata,
      });
      console.log("this is the response", response.data);
      setQuestionData(
        JSON.parse(
          response.data.questiondata
            .replace(/```json\n/, "")
            .replace(/\n```/, "")
        )
      );
    } catch (error) {
      console.error("Error generating question:", error);
    } finally {
      setLoading(false);
    }
  };
  const Handlefinish = ()=>{
    try {
      const response = axios.post("/api/interview", {
        userid : user?.id ,interviewid : interview_id , ...formdata, questiondata : QuestionData
      })
      if (response) {
        onCreateLink(interview_id , formdata , QuestionData); 
        return toast.success("Interview created successfully");
      }
      
    } catch (error) {
      console.error("Error generating question:", error);
    }

  }

  if (loading) {
    return (
      <div className=" flex flex-row items-center justify-center self-center mx-auto">
        <Loader className="animate-spin" />
        generating question
      </div>
    );
  }
return (
    <div>
  <div className="m-6 p-6 bg-white rounded-2xl shadow-lg border border-blue-300">
    <h2 className="text-2xl font-semibold text-blue-600 mb-4">
      Interview Questions
    </h2>
    <div className="space-y-6">
      {QuestionData.map((item, index) => (
        <div
          key={index}
          className="p-4 bg-blue-50 rounded-xl border border-blue-200 hover:shadow-md transition-shadow duration-200"
        >
          <p className="text-lg font-medium text-gray-800 mb-2">
            <span className="text-blue-500 font-semibold">
              Question {index + 1}:
            </span>{" "}
            {item.question}
          </p>
          <p className="text-sm text-gray-500 italic">Type: {item.type}</p>
        </div>
      ))}
    </div>
  </div>
  <div>
    <button className="flex m-4 ml-auto bg-blue-500 py-2 px-6 text-white font-bold cursor-pointer hover: shadow-2xl hover:bg-blue-600 rounded-2xl text-xl " onClick={() => Handlefinish()}>
        Finish
    </button>
  </div>
  </div>

);

}
