"use client";
import { Timer, Mic, Phone } from "lucide-react";
import Vapi from "@vapi-ai/web";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
export default function InterviewRecording({ interviewData, studentData }) {
  const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY);
  const [activeuser, setActiveuser] = useState(false);
  const [conversation, setConversation] = useState();
  const router = useRouter();

  useEffect(() => {
    if (interviewData) {
      startcall();
    }
    
  }, [interviewData]);

  const startcall = () => {
    let questionlist = "";

    interviewData?.questiondata?.forEach((items) => {
      questionlist += items?.question + ",";
    });

    // Remove the trailing comma
    questionlist = questionlist.slice(0, -1);

    const assistantOptions = {
      name: "AI Recruiter",
      firstMessage:
        "Hi " +
        studentData?.name +
        ", how are you? Ready for your interview on " +
        interviewData?.job_position +
        "?",
      transcriber: {
        provider: "deepgram",
        model: "nova-2",
        language: "en-US",
      },
      voice: {
        provider: "playht",
        voiceId: "jennifer",
      },
      model: {
        provider: "openai",
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `
            You are an AI voice assistant conducting interviews.
            Your job is to ask candidates provided interview questions, assess their responses.
            Begin the conversation with a friendly introduction, setting a relaxed yet professional tone. Example:
            "Hey there! Welcome to your ${interviewData?.job_position} interview. Let’s get started with a few questions!"
            Ask one question at a time and wait for the candidate’s response before proceeding. Keep the questions clear and concise. Below Are the questions ask one by one:
            Questions: ${questionlist}

            If the candidate struggles, offer hints or rephrase the question without giving away the answer. Example:
            "Need a hint? Think about how React tracks component updates!"

            Provide brief, encouraging feedback after each answer. Example:
            "Nice! That’s a solid answer."
            "Hmm, not quite? Want to try again?"

            Keep the conversation natural and engaging—use casual phrases like "Alright, next up..." or "Let’s tackle a tricky one!"
            After 5–7 questions, wrap the interview smoothly by summarizing their performance. Example:
            "That was great! You handled some tough questions well. Keep sharpening your skills!"
            "Thanks for chatting! Hope to see you crushing projects soon!"

            Key Guidelines:
            ✅ Be friendly, engaging, and witty
            ✅ Keep responses short and natural, like a real conversation
            ✅ Adapt based on the candidate’s confidence level
            ✅ Ensure the interview remains focused on React
          `.trim(),
          },
        ],
      },
    };

    vapi.start(assistantOptions);
  };

  vapi.on("call-started", () => {
    toast.success("Call started");
  });

  vapi.on("speech-started", () => {
    setActiveuser(true);
  });

  vapi.on("speech-ended", () => {
    setActiveuser(false);
  });

  vapi.on("call-ended", () => {
    toast.success("Call ended");
    generatefeedback();
  });

  vapi.on("message", (message) => {
    setConversation(message?.conversation);
  });

  const generatefeedback = async () => {
    try {
      const response = await axios.post("/api/generatefeedback", {
        conversation: conversation,
        user_name: studentData?.name,
        user_mail: studentData?.email,
        interview_id: interviewData?.interviewid,
      });

      if (response?.data?.success === true) {
        toast.success("Feedback generated");
        router.push(`/interview/${interviewData?.interviewid}/completed`);
      }
    } catch (error) {
      toast.error("Error generating feedback");
    }
  };

  const handleCallEnd = () => {
    const isConfirmed = window.confirm(
      "Once you end the call, you will not be able to join the interview again. Are you sure you want to end the call?"
    );
    if (isConfirmed) {
      vapi.stop();
      generatefeedback();
      router.push(`/interview/${interviewData?.interviewid}/completed`);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center">
      <header className="text-center my-20">
        <h1 className="text-4xl font-semibold text-blue-700 tracking-tight">
          AIrecruit
        </h1>
        <p className="text-xl text-gray-400 mt-1">Live AI Interview Session</p>
      </header>

      <div className="w-full max-w-6xl px-6 flex flex-col items-center gap-6">
        <div className="flex justify-between w-full text-lg text-gray-500">
          <p>AI Interview Session</p>
          <div className="flex items-center gap-2">
            <Timer size={16} />
            <span>{interviewData?.interview_duration}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full mt-8">
          <div className="bg-white/50 backdrop-blur-sm shadow rounded-2xl h-100 border border-gray-200 p-4">
            <h3 className="text-gray-500 text-sm font-medium mb-2">
              AI Interview Panel
            </h3>
            <div className="h-full flex flex-col items-center justify-center text-black text-lg ">
              <div
                className={`${
                  !activeuser && "animate-pulse"
                } w-24 h-24 rounded-full overflow-hidden border-2 border-white shadow-md bg-white/40 backdrop-blur-sm flex items-center justify-center`}
              >
                <img
                  src="/aiprofile.jpg"
                  alt="AI Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              AI
            </div>
          </div>

          <div className="bg-white/50 backdrop-blur-sm shadow rounded-2xl h-100 border border-gray-200 p-4">
            <h3 className="text-gray-500 text-sm font-medium mb-2">
              Your Panel
            </h3>
            <div className="h-full flex flex-col items-center justify-center text-black text-lg ">
              <div
                className={` ${
                  activeuser && "animate-pulse"
                } w-20 h-20 text-3xl rounded-full text-white font-bold text-center flex items-center justify-center bg-blue-600`}
              >
                {studentData?.name ? studentData.name[0].toUpperCase() : ""}
              </div>
              <span>{studentData?.name ? studentData.name.toUpperCase() : ""}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-center items-center gap-6 mt-10">
        <div className="bg-white/50 backdrop-blur-sm shadow rounded-full border border-gray-200 p-4">
          <Mic size={32} className="text-blue-600" />
        </div>
        <button
          onClick={handleCallEnd}
          className="cursor-pointer bg-red-500 backdrop-blur-sm shadow rounded-full border border-gray-200 p-4"
        >
          <Phone size={32} className="text-white " />
        </button>
      </div>
    </div>
  );
}