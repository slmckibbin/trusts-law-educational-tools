import React, { useState } from 'react';
import { BookOpen, Scale, Play, Brain, Search, AlertTriangle } from 'lucide-react';
import InteractiveDutyChecker from './components/InteractiveDutyChecker';
import JurisdictionComparisonTool from './components/JurisdictionComparisonTool';
import CaseStudySimulator from './components/CaseStudySimulator';
import AdaptiveAssessmentQuiz from './components/AdaptiveAssessmentQuiz';
import PowerAuthorisationChecker from './components/PowerAuthorisationChecker';
import BreachTrustAnalyser from './components/BreachTrustAnalyser';
import './App.css';

function App() {
  const [currentTool, setCurrentTool] = useState('home');

  const tools = [
    {
      id: 'duty-checker',
      title: 'Interactive Duty Checker',
      description: 'Analyse trustee scenarios to identify applicable duties and potential breaches',
      icon: <Scale className="w-8 h-8" />,
      component: <InteractiveDutyChecker />
    },
    {
      id: 'jurisdiction-comparison',
      title: 'Jurisdiction Comparison Tool',
      description: 'Compare trustee powers and duties across Australian states and territories',
      icon: <BookOpen className="w-8 h-8" />,
      component: <JurisdictionComparisonTool />
    },
    {
      id: 'case-study',
      title: 'Case Study Simulator',
      description: 'Experience realistic trustee scenarios and see consequences of decisions',
      icon: <Play className="w-8 h-8" />,
      component: <CaseStudySimulator />
    },
    {
      id: 'assessment-quiz',
      title: 'Adaptive Assessment Quiz',
      description: 'Self-assessment quiz that adapts difficulty based on performance',
      icon: <Brain className="w-8 h-8" />,
      component: <AdaptiveAssessmentQuiz />
    },
    {
      id: 'power-checker',
      title: 'Power Authorisation Checker',
      description: 'Determine if trustees have authority for specific actions',
      icon: <Search className="w-8 h-8" />,
      component: <PowerAuthorisationChecker />
    },
    {
      id: 'breach-analyser',
      title: 'Breach of Trust Analyser',
      description: 'Identify and analyse potential trustee breaches',
      icon: <AlertTriangle className="w-8 h-8" />,
      component: <BreachTrustAnalyser />
    }
  ];

  if (currentTool === 'home') {
    return (
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Trust Law Educational Tools
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Interactive learning resources for Australian trust law
            </p>
            <p className="text-lg text-gray-500">
              Featuring Queensland <em>Trusts Act 2025</em> modernisation
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <div
                key={tool.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 cursor-pointer"
                onClick={() => setCurrentTool(tool.id)}
              >
                <div className="flex items-center mb-4">
                  <div className="text-blue-600 mr-3">
                    {tool.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{tool.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{tool.description}</p>
                <div className="mt-4">
                  <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    Interactive Tool
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-blue-50 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-blue-800 mb-4">About These Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-blue-700">
              <div>
                <h3 className="font-semibold mb-2">Queensland Law Modernisation</h3>
                <ul className="space-y-1">
                  <li>• Compare Queensland <em>Trusts Act 2025</em> vs <em>Trusts Act 1973</em></li>
                  <li>• Understand non-excludable statutory duties</li>
                  <li>• Learn about enhanced delegation powers</li>
                  <li>• Explore "all powers of absolute owner" framework</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Interactive Learning</h3>
                <ul className="space-y-1">
                  <li>• Scenario-based decision making</li>
                  <li>• Adaptive difficulty assessment</li>
                  <li>• Cross-jurisdictional comparisons</li>
                  <li>• Real-world case study simulations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const selectedTool = tools.find(tool => tool.id === currentTool);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <button
            onClick={() => setCurrentTool('home')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Tools
          </button>
          <h1 className="text-xl font-semibold">{selectedTool?.title}</h1>
          <div></div>
        </div>
      </div>
      <div className="p-6">
        {selectedTool?.component}
      </div>
    </div>
  );
}

export default App;
