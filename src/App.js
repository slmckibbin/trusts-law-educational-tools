import React, { useState } from 'react';
import './App.css';
import AdaptiveAssessmentQuiz from './components/AdaptiveAssessmentQuiz';
import BreachTrustAnalyser from './components/BreachTrustAnalyser';
import InteractiveDutyChecker from './components/InteractiveDutyChecker';
import PowerAuthorisationChecker from './components/PowerAuthorisationChecker';
import CaseStudySimulator from './components/CaseStudySimulator';
import JurisdictionComparisonTool from './components/JurisdictionComparisonTool';
import { BookOpen, Brain, Shield, CheckCircle, Gavel, MapPin } from 'lucide-react';

function App() {
  const [activeComponent, setActiveComponent] = useState('quiz');

  const tools = [
    {
      id: 'quiz',
      name: 'Adaptive Assessment Quiz',
      description: 'Test your knowledge with adaptive difficulty',
      icon: <Brain className="w-6 h-6" />,
      component: AdaptiveAssessmentQuiz
    },
    {
      id: 'breach',
      name: 'Breach Trust Analyser',
      description: 'Analyse potential trust breaches',
      icon: <Shield className="w-6 h-6" />,
      component: BreachTrustAnalyser
    },
    {
      id: 'duty',
      name: 'Interactive Duty Checker',
      description: 'Check trustee duties and obligations',
      icon: <CheckCircle className="w-6 h-6" />,
      component: InteractiveDutyChecker
    },
    {
      id: 'power',
      name: 'Power Authorisation Checker',
      description: 'Verify trustee powers and authorities',
      icon: <Gavel className="w-6 h-6" />,
      component: PowerAuthorisationChecker
    },
    {
      id: 'case',
      name: 'Case Study Simulator',
      description: 'Interactive case study scenarios',
      icon: <BookOpen className="w-6 h-6" />,
      component: CaseStudySimulator
    },
    {
      id: 'jurisdiction',
      name: 'Jurisdiction Comparison Tool',
      description: 'Compare trust laws across jurisdictions',
      icon: <MapPin className="w-6 h-6" />,
      component: JurisdictionComparisonTool
    }
  ];

  const ActiveComponent = tools.find(tool => tool.id === activeComponent)?.component;

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-blue-600 mr-3" />
              <h1 className="text-xl font-bold text-gray-900">
                Queensland Trust Law Educational Tools
              </h1>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Educational Tools</h2>
              <nav className="space-y-2">
                {tools.map((tool) => (
                  <button
                    key={tool.id}
                    onClick={() => setActiveComponent(tool.id)}
                    className={`w-full text-left p-3 rounded-lg transition-colors ${
                      activeComponent === tool.id
                        ? 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <div className="flex items-center">
                      {tool.icon}
                      <div className="ml-3">
                        <div className="font-medium">{tool.name}</div>
                        <div className="text-sm text-gray-500">{tool.description}</div>
                      </div>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {ActiveComponent && <ActiveComponent />}
          </div>
        </div>
      </div>

      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 text-sm">
            Queensland Trust Law Educational Tools - For educational purposes only
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
