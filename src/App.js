// src/App.js

import React from 'react';
import './App.css'; // Keep your main CSS file

// Import all your components from the Components folder
import AdaptiveAssessmentQuiz from './Components/AdaptiveAssessmentQuiz';
import BreachTrustAnalyser from './Components/BreachTrustAnalyser';
import CaseStudySimulator from './Components/CaseStudySimulator';
import InteractiveDutyChecker from './Components/InteractiveDutyChecker';
import JurisdictionComparisonTool from './Components/JurisdictionComparisonTool';
import PowerAuthorisationChecker from './Components/PowerAuthorisationChecker';


function App() {
  return (
    // Tailwind CSS classes for a responsive and centered layout
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
      {/* Header and Navigation */}
      <header className="w-full max-w-4xl bg-blue-700 text-white p-4 rounded-lg shadow-md mb-8">
        <h1 className="text-3xl font-bold text-center mb-2">
          Trusts Law Educational Tools
        </h1>
        <nav className="flex flex-wrap justify-center gap-4 mt-4">
          <a href="#adaptive-assessment-quiz" className="px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 text-sm sm:text-base">
            Adaptive Quiz
          </a>
          <a href="#breach-trust-analyser" className="px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 text-sm sm:text-base">
            Breach Analyser
          </a>
          <a href="#case-study-simulator" className="px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 text-sm sm:text-base">
            Case Study Simulator
          </a>
          <a href="#interactive-duty-checker" className="px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 text-sm sm:text-base">
            Duty Checker
          </a>
          <a href="#jurisdiction-comparison-tool" className="px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 text-sm sm:text-base">
            Jurisdiction Tool
          </a>
          <a href="#power-authorisation-checker" className="px-4 py-2 rounded-md hover:bg-blue-600 transition duration-300 text-sm sm:text-base">
            Power Checker
          </a>
        </nav>
      </header>

      {/* Main Content Area for Tools */}
      <main className="w-full max-w-4xl flex flex-col gap-8">
        {/* Adaptive Assessment Quiz Section */}
        <section id="adaptive-assessment-quiz" className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Adaptive Assessment Quiz
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            An interactive quiz that adapts to your learning progress, helping you master trusts law concepts.
          </p>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <AdaptiveAssessmentQuiz />
          </div>
        </section>

        {/* Breach Trust Analyser Section (Placeholder as code was not provided) */}
        <section id="breach-trust-analyser" className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Breach of Trust Analyser
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            (Placeholder) This tool will allow you to analyse scenarios to identify potential breaches of trust and understand their implications.
          </p>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            {/* Replace this with your actual <BreachTrustAnalyser /> component when available */}
            <p className="text-gray-600 italic">BreachTrustAnalyser component will go here.</p>
          </div>
        </section>

        {/* Case Study Simulator Section */}
        <section id="case-study-simulator" className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Case Study Simulator
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Practise applying trusts law principles to case studies.
          </p>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <CaseStudySimulator />
          </div>
        </section>

        {/* Interactive Duty Checker Section */}
        <section id="interactive-duty-checker" className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Interactive Duty Checker
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Explore and understand the various duties of a trustee with this interactive tool.
          </p>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <InteractiveDutyChecker />
          </div>
        </section>

        {/* Jurisdiction Comparison Tool Section */}
        <section id="jurisdiction-comparison-tool" className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Jurisdiction Comparison Tool
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Compare trusts law across different Australian jurisdictions to highlight key differences and similarities.
          </p>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <JurisdictionComparisonTool />
          </div>
        </section>

        {/* Power Authorisation Checker Section */}
        <section id="power-authorisation-checker" className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2">
            Power and Authorisation Checker
          </h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Verify the powers and authorisations related to trusts in different contexts.
          </p>
          <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
            <PowerAuthorisationChecker />
          </div>
        </section>

      </main>

      {/* Footer (Optional) */}
      <footer className="mt-8 text-center text-gray-600 text-sm">
        <p>&copy; 2025 Trusts Law Educational Tools. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
