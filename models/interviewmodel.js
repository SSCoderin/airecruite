import mongoose from "mongoose";


const InterviewSchema = new mongoose.Schema({
    userid : {
        type : String,
        required : true
    },
    interviewid : {
        type : String,
        required : true
    },
    job_position : {
        type : String,
        required : true
    },
    job_descripton : {
        type : String,
        required : true
    },
    interview_duration : {
        type : String,
        required : true
    },
    interview_type : {
        type : Array,
        required : true
    },
    questiondata : {
        type : Object,
        required : true
    }   
});


const Interview = mongoose.models.Interview || mongoose.model("Interview", InterviewSchema);
export default Interview;