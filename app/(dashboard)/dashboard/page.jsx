"use client";

import React from "react";
import { Video, Phone } from "lucide-react";
import { useEffect,useState } from "react";
import Interviewform from "../_components/InterviewForm";
export default function Dashboard() {
    const [form , setForm] = useState(false);
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {form}
        {form ? (
            <div>
          
            <Interviewform/>
            </div>
        ):(<>
        <h1 className="text-4xl font-extrabold text-gray-900  mb-12">
          Your AIrecruit Dashboard
        </h1>

        <div onClick={() => setForm(true)} className="flex flex-col md:flex-row justify-center items-center gap-8 cursor-pointer">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 flex flex-col items-center text-center w-full md:w-1/2 lg:w-1/3 border border-gray-200">
            <div className="bg-indigo-100 p-4 rounded-full mb-4">
              <Video size={30} className="text-indigo-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Create New Interview
            </h2>
            <p className="text-gray-600 text-sm">
              Design AI-powered interviews and schedule them with candidates seamlessly.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 flex flex-col items-center text-center w-full md:w-1/2 lg:w-1/3 border border-gray-200">
            <div className="bg-purple-100 p-4 rounded-full mb-4">
              <Phone size={30} className="text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">
              Create Phone Screening Call
            </h2>
            <p className="text-gray-600 text-sm">
              Efficiently schedule and manage phone screening calls with prospective hires.
            </p>
          </div>
        </div>
        </>
        )}
        
      </div>
      
    </div>
  );
}
