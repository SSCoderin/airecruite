import { NextResponse } from "next/server";
import connect from "@/database/connect";
import Interview from "@/models/interviewmodel";




export async function POST(request) {
    try {
        await connect();
        const { userid,interviewid, job_position, job_descripton, interview_duration, interview_type, questiondata } = await request.json();
        const newInterview = new Interview({ userid,interviewid, job_position, job_descripton, interview_duration, interview_type, questiondata });
        await newInterview.save();
        return NextResponse.json({ success: true, interview: newInterview });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}


export async function GET(request) {
    try {
        await connect();
       const interview_id = request.nextUrl.searchParams.get("interview_id");
        const interviewdata = await Interview.findOne({ interviewid: interview_id });
        return NextResponse.json({ success: true, interviewData: interviewdata});
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}