import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function POST(request) {
  try {
    const { job_position, job_descripton, interview_duration, interview_type } =
      await request.json();

    const responseText = await generatequestion(
      job_position,
      job_descripton,
      interview_duration,
      interview_type
    );

    return NextResponse.json({ success: true, questiondata: responseText });
  } catch (error) {
    console.error("Error generating question:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function generatequestion(jobTitle, jobDescription, duration, type) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
You are an expert technical interviewer.  
Based on the following inputs, generate a well-structured list of high-quality interview questions:  
Job Title: ${jobTitle}  
Job Description: ${jobDescription}  
Interview Duration: ${duration}  
Interview Type: ${type}  
  
🧠 Your task:  
Analyze the job description to identify key responsibilities, required skills, and expected experience.  
Generate a list of interview questions based on interview duration.  
Adjust the number and depth of questions to match the interview duration.  
Ensure the questions match the tone and structure of a real-life ${type} interview.  
  
🛠️ Format your response in JSON format with array list of questions.  
format: interviewQuestions = [  
{  
  question:"",  
  type:"Technical/Behavioral/Experience/Problem Solving/Leadership"  
},  
...  
]  
  
🎯 The goal is to create a structured, relevant, and time-optimized interview plan for a ${jobTitle} role.
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();
//   const parsedJson = JSON.parse(text);
//   return parsedJson;}
return text;
}