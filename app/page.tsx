"use client";

import {
  Timer,
  BarChart2,
  Scale,
  Pencil,
  Share2,
  ClipboardCheck,
  PlayCircle,
  PlusCircle,
} from "lucide-react";
import Link from "next/link";


export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 antialiased">
     
      <section className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white py-20 px-4 sm:py-24 md:py-32 rounded-b-3xl shadow-lg">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
            AI-Powered Interview Assistant for Modern Recruiters
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            Revolutionize Your Hiring: AIrecruit Finds Your Perfect Match. Let
            our AI voice agent conduct candidate interviews while you focus on
            finding the perfect match. Save time, reduce bias, and improve your
            hiring process.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/dashboard"
              className="bg-white text-indigo-700 hover:bg-indigo-100 font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 flex items-center justify-center"
            >
              <PlusCircle className="mr-2" size={20} /> Create Interview
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Streamline Your Hiring Process
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            AIrecruit helps you save time and find better candidates with our
            advanced AI interview technology.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2 border border-gray-100">
              <div className="flex justify-center mb-6">
                <div className="bg-indigo-100 p-4 rounded-full inline-flex items-center justify-center">
                  <Timer className="text-indigo-600" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Save Time
              </h3>
              <p className="text-gray-600">
                Automate initial screening interviews and focus on final
                candidates.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2 border border-gray-100">
              <div className="flex justify-center mb-6">
                <div className="bg-purple-100 p-4 rounded-full inline-flex items-center justify-center">
                  <BarChart2 className="text-purple-600" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Data-Driven Insights
              </h3>
              <p className="text-gray-600">
                Get detailed analytics and candidate comparisons based on
                interview responses.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-2 border border-gray-100">
              <div className="flex justify-center mb-6">
                <div className="bg-green-100 p-4 rounded-full inline-flex items-center justify-center">
                  <Scale className="text-green-600" size={32} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Reduce Bias
              </h3>
              <p className="text-gray-600">
                Standardized interviews help eliminate unconscious bias in the
                hiring process.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-20 px-4 rounded-t-3xl shadow-inner">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How AIrecruit Works
          </h2>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Three simple steps to transform your recruitment process
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
              <div className="relative mb-6">
                <div className="bg-indigo-500 text-white w-12 h-12 flex items-center justify-center rounded-full text-2xl font-bold shadow-md">
                  1
                </div>
                <div className="absolute -bottom-2 -right-2 bg-indigo-100 p-2 rounded-full">
                  <Pencil className="text-indigo-600" size={20} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Create Interview
              </h3>
              <p className="text-gray-600">
                Set up your job requirements and customize interview questions.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
              <div className="relative mb-6">
                <div className="bg-purple-500 text-white w-12 h-12 flex items-center justify-center rounded-full text-2xl font-bold shadow-md">
                  2
                </div>
                <div className="absolute -bottom-2 -right-2 bg-purple-100 p-2 rounded-full">
                  <Share2 className="text-purple-600" size={20} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Share with Candidates
              </h3>
              <p className="text-gray-600">
                Send interview links to candidates to complete at their
                convenience.
              </p>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-md border border-gray-100">
              <div className="relative mb-6">
                <div className="bg-green-500 text-white w-12 h-12 flex items-center justify-center rounded-full text-2xl font-bold shadow-md">
                  3
                </div>
                <div className="absolute -bottom-2 -right-2 bg-green-100 p-2 rounded-full">
                  <ClipboardCheck className="text-green-600" size={20} />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Review Results
              </h3>
              <p className="text-gray-600">
                Get AI-analyzed results, transcripts, and candidate comparisons.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-purple-700 to-indigo-600 text-white py-20 px-4 rounded-b-3xl shadow-lg">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Transform Your Hiring Process?
          </h2>
          <p className="text-lg sm:text-xl mb-10 max-w-2xl mx-auto">
            Join hundreds of companies already using AIrecruit to find the best
            talent.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              href="/dashboard"
              className="bg-white text-purple-700 hover:bg-purple-100 font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1"
            >
              Get Started for Free
            </Link>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 text-white py-8 px-4 text-center">
        <div className="container mx-auto">
          <p>
            &copy; {new Date().getFullYear()} AIrecruit. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
