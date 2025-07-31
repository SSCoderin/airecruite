import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import InterviewFeedback from "../../../models/interviewfeedback";
import connect from "@/database/connect";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    await connect();
    const { user_name, user_mail, interview_id, conversation } =
      await request.json();

    const reponseData = await generatefeedback(conversation);
    let cleanedText = reponseData.trim();
    if (cleanedText.startsWith("```json")) {
      cleanedText = cleanedText
        .replace(/```json\s*/, "")
        .replace(/```$/, "")
        .trim();
    }
    const parsedFeedback = JSON.parse(cleanedText);

    const newInterviewFeedback = new InterviewFeedback({
      user_name,
      user_mail,
      interview_id,
      feedback: parsedFeedback,
    });
    await newInterviewFeedback.save();

    return NextResponse.json({ success: true, reponseData: reponseData });
  } catch (error) {
    console.error("Error generating reponseData:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function generatefeedback(conversation) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
${conversation}
Depends on this Interview Conversation between assistant and user,
Give me feedback for user interview. Give me rating out of 10 for technical Skills, 
Communication, Problem Solving, Experince. Also give me summery in 3 lines 
about the interview and one line to let me know whether is recommanded 
for hire or not with msg. Give me response in JSON format

{
  feedback:{
    rating:{
      techicalSkills:5,
      communication:6,
      problemSolving:4,
      experince:7
    },
    summery:<in 3 Line>,
    Recommendation:"",
    RecommendationMsg:""
  }
}

`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();
  //   const parsedJson = JSON.parse(text);
  //   return parsedJson;}
  return text;
}
