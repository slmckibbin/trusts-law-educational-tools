import React, { useState } from 'react';
import { BookOpen, Scale } from 'lucide-react';

// Simple placeholder components for now
const InteractiveDutyChecker = () => (
  <div className="p-6 bg-white rounded-lg">
    <h2 className="text-2xl font-bold mb-4">Interactive Duty Checker</h2>
    <p>This tool analyzes trustee duties and potential breaches.</p>
    <div className="mt-4 p-4 bg-blue-50 rounded">
      <p>🚧 Tool is loading... This confirms your React app is working!</p>
    </div>
  </div>
);

const JurisdictionComparisonTool = () => (
  <div className="p-6 bg-white rounded-lg">
    <h2 className="text-2xl font-bold mb-4">Jurisdiction Comparison Tool</h2>
    <p>Compare trust law across Australian jurisdictions.</p>
    <div className="mt-4 p-4 bg-green-50 rounded">
      <p>🚧 Tool is loading... This confirms your React app is working!</p>
    </div>
  </div>
);

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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            <p className="text-blue-700">
              🎯 <strong>Status:</strong> Basic React app is working! We can now add the full interactive components.
            </p>
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
