// src/Components/CaseStudySimulator.js
import { useState } from 'react';
import { Play, RotateCcw, User, DollarSign, FileText, AlertTriangle, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const CaseStudySimulator = () => {
  const [currentCase, setCurrentCase] = useState(null);
  const = useState(0);
  const = useState();
  const = useState(0);
  const = useState(false);

  const caseStudies = {
    family_trust: {
      title: "Family Discretionary Trust Crisis",
      description: "You are the trustee of the Smith Family Trust ($2 million assets). The family is in conflict over distributions.",
      jurisdiction: "qld2025",
      trusteeType: "professional",
      scenario: {
        background: "The Smith Family Trust has $2 million in assets. John Smith (settlor, deceased) established the trust for his three adult children: Sarah (doctor), Mark (unemployed), and Lisa (student). Sarah demands equal distributions, Mark needs financial help for gambling debts, and Lisa wants education funding.",
        characters:
      },
      steps:
        },
        {
          id: 2,
          situation: "Sarah discovers you did not give Mark $100,000 and demands an explanation. She argues all beneficiaries should receive equal annual distributions of $50,000 each as 'that's only fair'.",
          question: "How do you handle Sarah's demand for equal distributions?",
          options:
        },
        {
          id: 3,
          situation: "Lisa needs $30,000 for medical school fees next month. This is clearly for education (trust purpose) but Sarah objects, saying Lisa already had her 'turn' with previous education distributions.",
          question: "How do you decide on Lisa's education funding request?",
          options:
        },
        {
          id: 4,
          situation: "The trust assets have grown significantly. You are considering investing $500,000 in a high-growth tech fund that your financial adviser recommends, but it is higher risk than current conservative investments.",
          question: "How do you approach this investment decision?",
          options:
        }
      ]
    },
    commercial_trust: {
      title: "Commercial Unit Trust Dilemma",
      description: "You manage a commercial property unit trust. Major repairs are needed, but will significantly impact distributions.",
      jurisdiction: "qld2025",
      trusteeType: "corporate",
      scenario: {
        background: "You are the corporate trustee of Riverside Commercial Trust, which owns a $10 million office building. The building needs $800,000 in structural repairs. There are 20 unit holders expecting quarterly distributions.",
        characters:
      },
      steps:
        },
        {
          id: 2,
          situation: "Major Investor Group threatens to call an extraordinary meeting to remove you as trustee if distributions are suspended. They claim you are being overly cautious about repairs.",
          question: "How do you respond to this pressure from major unit holders?",
          options:
        },
        {
          id: 3,
          situation: "During repairs, you discover additional structural issues requiring another $300,000. The original engineers missed this. Some unit holders are questioning your due diligence.",
          question: "How do you handle the additional unexpected costs?",
          options: [
            {
              id: 'a',
              text: "Proceed with additional repairs without consultation",
              impact: { score: 1, consequences: "May be necessary, but poor communication.", legal: "Within trustee powers, but risks unit holder relations." }
            },
            {
              id: 'b',
              text: "Investigate engineer negligence and pursue compensation",
              impact: { score: 2, consequences: "Good accountability, but may delay essential repairs.", legal: "Appropriate to recover losses for the trust." }
            },
            {
              id: 'c',
              text: "Fully inform unit holders and explain necessity of additional work",
              impact: { score: 3, consequences: "Excellent transparency and education.", legal: "Meets information disclosure obligations." }
            },
            {
              id: 'd',
              text: "Complete only essential safety repairs to minimise costs",
              impact: { score: 1, consequences: "Cost-conscious, but may not fully address issues.", legal: "Acceptable if it genuinely prioritises safety essentials." }
            }
          ]
        },
        {
          id: 4,
          situation: "With repairs complete, the building's value has increased by $1.2 million, but some unit holders want to sell to realise gains while others prefer to hold for income. You receive a $12 million purchase offer.",
          question: "How do you approach the sale versus hold decision?",
          options:
        }
      ]
    }
  };

  const startCase = (caseKey) => {
    setCurrentCase(caseKey);
    setCurrentStep(0);
    setDecisions();
    setScore(0);
    setShowResults(false);
  };

  const makeDecision = (optionId) => {
    const currentCaseData = caseStudies[currentCase];
    const currentStepData = currentCaseData.steps;
    const selectedOption = currentStepData.options.find(opt => opt.id === optionId);

    const newDecision = {
      step: currentStep + 1,
      question: currentStepData.question,
      choice: selectedOption.text,
      impact: selectedOption.impact
    };

    setDecisions();
    setScore(score + selectedOption.impact.score);

    if (currentStep < currentCaseData.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetSimulator = () => {
    setCurrentCase(null);
    setCurrentStep(0);
    setDecisions();
    setScore(0);
    setShowResults(false);
  };

  const getScoreColor = (score) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 5) return 'text-blue-600';
    if (score >= 2) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreDescription = (score) => {
    if (score >= 8) return 'Excellent Trustee Performance';
    if (score >= 5) return 'Good Trustee Decisions';
    if (score >= 2) return 'Average Performance – Room for Improvement'; // Australian English: en dash [1]
    return 'Poor Decisions – Significant Legal Risk'; // Australian English: en dash [1]
  };

  if (!currentCase) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 flex items-center">
            <Play className="w-8 h-8 mr-3 text-green-600" />
            Trustee Decision Case Study Simulator.
          </h1>
          <p className="text-gray-600">Experience realistic trustee scenarios and see the consequences of your decisions.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(caseStudies).map(() => (
            <div key={key} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-3">{caseStudy.title}</h3>
              <p className="text-gray-600 mb-4">{caseStudy.description}</p>

              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm">
                  <FileText className="w-4 h-4 mr-2 text-blue-600" />
                  <span dangerouslySetInnerHTML={{ __html: `Jurisdiction: ${caseStudy.jurisdiction === 'qld2025'? 'Queensland <em>Trusts Act 2025</em> (Qld)' : 'Queensland <em>Trusts Act 1973</em> (Qld)'}` }}></span>
                </div>
                <div className="flex items-center text-sm">
                  <User className="w-4 h-4 mr-2 text-purple-600" />
                  <span>Trustee Type: {caseStudy.trusteeType.charAt(0).toUpperCase() + caseStudy.trusteeType.slice(1)}.</span>
                </div>
                <div className="flex items-center text-sm">
                  <DollarSign className="w-4 h-4 mr-2 text-green-600" />
                  <span>Difficulty: {caseStudy.steps.length} decision points.</span>
                </div>
              </div>

              <button
                onClick={() => startCase(key)}
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Start case study.
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">How it works.</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-700">
            <div className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">1</span>
              <div>
                <div className="font-medium">Choose scenario.</div>
                <div>Select from different trust types and situations.</div>
              </div>
            </div>
            <div className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">2</span>
              <div>
                <div className="font-medium">Make decisions.</div>
                <div>Navigate through realistic trustee dilemmas.</div>
              </div>
            </div>
            <div className="flex items-start">
              <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-3 mt-0.5">3</span>
              <div>
                <div className="font-medium">See consequences.</div>
                <div>Learn from outcomes and legal implications.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentCaseData = caseStudies[currentCase];

  if (showResults) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">Case study complete: {currentCaseData.title}.</h1>
          <div className={`text-xl font-semibold ${getScoreColor(score)}`}>
            Final score: {score}/12 – {getScoreDescription(score)}.
          </div>
        </div>

        <div className="space-y-6">
          {decisions.map((decision, index) => (
            <div key={index} className="border rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-semibold">Step {decision.step}: Decision analysis.</h3>
                <div className={`flex items-center px-3 py-1 rounded-full text-sm ${
                  decision.impact.score >= 2? 'bg-green-100 text-green-800' :
                  decision.impact.score >= 0? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {decision.impact.score >= 0?
                    <CheckCircle className="w-4 h-4 mr-1" /> :
                    <XCircle className="w-4 h-4 mr-1" />
                  }
                  Score: {decision.impact.score > 0? '+' : ''}{decision.impact.score}.
                </div>
              </div>

              <div className="mb-3">
                <div className="text-sm text-gray-600 mb-1">Question:</div>
                <div className="text-sm">{decision.question}</div>
              </div>

              <div className="mb-3">
                <div className="text-sm text-gray-600 mb-1">Your choice:</div>
                <div className="text-sm font-medium">{decision.choice}.</div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600 mb-1">Consequences:</div>
                  <div className="text-sm bg-gray-50 p-3 rounded">{decision.impact.consequences}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600 mb-1">Legal analysis:</div>
                  <div className="text-sm bg-blue-50 p-3 rounded">{decision.impact.legal}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Key learning points.</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-green-700 mb-2">Best practices demonstrated.</h4>
              <ul className="text-sm space-y-1">
                {decisions.filter(d => d.impact.score >= 2).map((d, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Step {d.step}: {d.impact.consequences}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-red-700 mb-2">Areas for improvement.</h4>
              <ul className="text-sm space-y-1">
                {decisions.filter(d => d.impact.score < 2).map((d, i) => (
                  <li key={i} className="flex items-start">
                    <AlertTriangle className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Step {d.step}: {d.impact.consequences}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-6 text-center space-x-4">
          <button
            onClick={resetSimulator}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Try another case.
          </button>
          <button
            onClick={() => startCase(currentCase)}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            Retry this case.
          </button>
        </div>
      </div>
    );
  }

  const currentStepData = currentCaseData.steps;

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">{currentCaseData.title}.</h1>
          <button
            onClick={resetSimulator}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset.
          </button>
        </div>

        <div className="flex items-center space-x-4 text-sm mb-4">
          <span className="bg-blue-100 px-3 py-1 rounded-full">
            Step {currentStep + 1} of {currentCaseData.steps.length}.
          </span>
          <span className="bg-green-100 px-3 py-1 rounded-full">
            Current score: {score}.
          </span>
          <span className="bg-purple-100 px-3 py-1 rounded-full" dangerouslySetInnerHTML={{ __html: currentCaseData.jurisdiction === 'qld2025'? 'Queensland <em>Trusts Act 2025</em> (Qld)' : 'Queensland <em>Trusts Act 1973</em> (Qld)' }}>
          </span>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / currentCaseData.steps.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {currentStep === 0 && (
        <div className="mb-6 bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Background.</h3>
          <p className="text-gray-700 mb-4">{currentCaseData.scenario.background}</p>

          <h4 className="font-medium mb-3">Key players:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentCaseData.scenario.characters.map((character, index) => (
              <div key={index} className="bg-white p-3 rounded border">
                <div className="font-medium">{character.name}</div>
                <div className="text-sm text-gray-600">{character.role}.</div>
                <div className="text-sm text-blue-600">{character.interest}.</div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Current situation.</h3>
        <p className="text-gray-700 mb-6">{currentStepData.situation}</p>

        <h4 className="font-medium mb-4 flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2 text-orange-600" />
          {currentStepData.question}
        </h4>

        <div className="space-y-3">
          {currentStepData.options.map((option) => (
            <button
              key={option.id}
              onClick={() => makeDecision(option.id)}
              className="w-full p-4 text-left border rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{option.text}</span>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {decisions.length > 0 && (
        <div className="mt-6 bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium mb-3">Previous decisions:</h4>
          <div className="space-y-2">
            {decisions.map((decision, index) => (
              <div key={index} className="flex items-center justify-between text-sm">
                <span>Step {decision.step}: {decision.choice}.</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  decision.impact.score >= 2? 'bg-green-100 text-green-800' :
                  decision.impact.score >= 0? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {decision.impact.score > 0? '+' : ''}{decision.impact.score}.
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseStudySimulator;
