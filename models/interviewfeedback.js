import mongoose from "mongoose";



const InterviewFeedbackSchema = new mongoose.Schema({
    user_name : {
        type : String,
        required : true
    },
    user_email : {
        type : String,
        required : true
    },
    interview_id: {
        type : String,
        required : true
    },
    feedback: {
        type : Object,
        required : true
        
    }
});



const InterviewFeedback = mongoose.models.InterviewFeedback || mongoose.model("InterviewFeedback", InterviewFeedbackSchema);
export default InterviewFeedback;