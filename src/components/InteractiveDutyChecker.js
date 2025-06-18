// src/Components/InteractiveDutyChecker.js
import { useState } from 'react';
import { AlertTriangle, CheckCircle, XCircle, Info, BookOpen, Scale } from 'lucide-react';

const InteractiveDutyChecker = () => {
  const [scenario, setScenario] = useState('');
  const [trusteeType, setTrusteeType] = useState('');
  const [jurisdiction, setJurisdiction] = useState('');
  const [trustType, setTrustType] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const duties = {
    core_non_excludable: [
      { name: 'Act honestly and in good faith', qld2025: 'Section 64', qld1973: 'General law only', description: 'Fundamental fiduciary duty - now statutory in Queensland (<i>Trusts Act 2025</i>)' },
      { name: 'Exercise appropriate duty of care', qld2025: 'Sections 65-67 (tiered)', qld1973: 'General law only', description: 'Professional vs non-professional standards' },
      { name: 'Keep accurate records', qld2025: 'Section 69 (3 years minimum)', qld1973: 'Section 77 (basic)', description: 'Enhanced record-keeping requirements' },
      { name: 'Provide information to beneficiaries', qld2025: 'Section 70', qld1973: 'General law only', description: 'Statutory disclosure obligations' }
    ],
    traditional_duties: [
      { name: 'Follow trust terms', source: 'General law + statute', description: 'Carry out settlor\'s wishes as expressed in trust deed' },
      { name: 'Act impartially among beneficiaries', source: 'General law', description: 'Fair treatment (meaningless for discretionary trusts)' },
      { name: 'Not delegate inappropriately', source: 'General law + <i>Trusts Act 2025</i> (Qld) ss 72-3', description: 'Enhanced delegation powers in Queensland 2025' },
      { name: 'Invest prudently', source: 'General law + statute', description: 'Prudent person standard with modern flexibility' },
      { name: 'Not profit from position', source: 'General law', description: 'Avoid conflicts of interest and personal benefit' },
      { name: 'Get in trust property', source: 'General law', description: 'Obtain legal title to trust assets' }
    ]
  };

  const scenarios = [
    {
      id: 'investment_loss',
      title: 'Major investment loss',
      description: 'Trustee invested 80% of trust fund in cryptocurrency without consulting beneficiaries, resulting in 60% loss',
      triggers: ['investment', 'prudence', 'care']
    },
    {
      id: 'self_dealing',
      title: 'Self-dealing transaction',
      description: 'Corporate trustee purchased trust property for its parent company at below market value',
      triggers: ['conflict', 'honesty', 'profit']
    },
    {
      id: 'information_refusal',
      title: 'Refusing information request',
      description: 'Trustee refused to provide trust accounts to discretionary beneficiary citing confidentiality',
      triggers: ['information', 'records']
    },
    {
      id: 'excessive_fees',
      title: 'Excessive professional fees',
      description: 'Professional trustee charged $50,000 annual fee for simple family trust with $200,000 assets',
      triggers: ['profit', 'care', 'honesty']
    },
    {
      id: 'delegation_failure',
      title: 'Improper delegation',
      description: 'Trustee delegated all investment decisions to unqualified family member indefinitely without oversight',
      triggers: ['delegation', 'care', 'prudence']
    }
  ];

  const analyzeScenario = () => {
    if (!scenario || !trusteeType || !jurisdiction || !trustType) return;

    const selectedScenario = scenarios.find(s => s.id === scenario);
    const applicableDuties = [];
    const breaches = [];
    const protections = [];
    const recommendations = [];

    // Analyze based on scenario triggers
    if (selectedScenario.triggers.includes('investment') || selectedScenario.triggers.includes('prudence')) {
      applicableDuties.push('Duty to invest prudently');
      if (jurisdiction === 'qld2025') {
        applicableDuties.push('Enhanced duty of care (ss 65-67)');
        if (trusteeType === 'professional') {
          breaches.push('Professional trustee standard - must exercise care equivalent to prudent person in trustee profession');
        }
      }
      breaches.push('Failure to diversify investments appropriately');
      breaches.push('Investing in excessively risky assets without proper consideration');
    }

    if (selectedScenario.triggers.includes('conflict') || selectedScenario.triggers.includes('profit')) {
      applicableDuties.push('Duty not to profit from trust position');
      applicableDuties.push('Duty to act honestly and in good faith');
      if (jurisdiction === 'qld2025') {
        breaches.push('Breach of non-excludable statutory duty (Section 64)');
      }
      breaches.push('Self-dealing transaction potentially voidable');
      recommendations.push('Obtain independent valuation and beneficiary consent');
    }

    if (selectedScenario.triggers.includes('information') || selectedScenario.triggers.includes('records')) {
      if (jurisdiction === 'qld2025') {
        applicableDuties.push('Statutory duty to provide information (s 70)');
        applicableDuties.push('Duty to keep accurate records (s 69)');
        breaches.push('Breach of non-excludable information disclosure duty');
        protections.push('Limited protection - courts may excuse minor breaches if trustee acted reasonably');
      } else {
        applicableDuties.push('General law duty to provide trust accounts');
        protections.push('Some discretion to withhold confidential documents');
      }
    }

    if (selectedScenario.triggers.includes('delegation')) {
      applicableDuties.push('Duty not to delegate inappropriately');
      if (jurisdiction === 'qld2025') {
        protections.push('Enhanced delegation powers (ss 72-3) but must supervise delegates');
        breaches.push('Improper delegation without adequate oversight or qualification assessment');
      } else {
        breaches.push('General law prohibition on delegating discretionary powers');
      }
    }

    // Add care duty based on trustee type
    if (trusteeType === 'professional') {
      applicableDuties.push('Enhanced professional standard of care');
      if (jurisdiction === 'qld2025') {
        breaches.push('Failed to meet professional trustee standard under s 65');
      }
    } else if (trusteeType === 'individual') {
      applicableDuties.push('Ordinary prudent person standard');
      if (jurisdiction === 'qld2025') {
        applicableDuties.push('Basic duty of care (s 67)');
      }
    }

    // Add general recommendations
    recommendations.push('Seek professional legal advice immediately');
    recommendations.push('Document all decision-making processes');
    recommendations.push('Consider obtaining beneficiary consent if appropriate');

    if (jurisdiction === 'qld2025') {
      recommendations.push('Review compliance with non-excludable statutory duties');
      protections.push('Court discretion to relieve liability (s 160)');
    }

    setAnalysis({
      scenario: selectedScenario,
      applicableDuties,
      breaches,
      protections,
      recommendations,
      severity: breaches.length > 3 ? 'high' : breaches.length > 1 ? 'medium' : 'low'
    });
  };

  const reset = () => {
    setScenario('');
    setTrusteeType('');
    setJurisdiction('');
    setTrustType('');
    setAnalysis(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <Scale className="w-8 h-8 mr-3 text-blue-600" />
          Interactive Trustee Duty Checker
        </h1>
        <p className="text-gray-600">Analyse trustee scenarios to identify applicable duties and potential breaches</p>
      </div>

      {!analysis ? (
        <div className="space-y-6">
          {/* Scenario Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Select scenario:</label>
            <select
              value={scenario}
              onChange={(e) => setScenario(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Choose a scenario...</option>
              {scenarios.map(s => (
                <option key={s.id} value={s.id}>{s.title}</option>
              ))}
            </select>
            {scenario && (
              <div className="mt-2 p-3 bg-gray-50 rounded border-l-4 border-blue-500">
                <p className="text-sm">{scenarios.find(s => s.id === scenario)?.description}</p>
              </div>
            )}
          </div>

          {/* Trustee Type */}
          <div>
            <label className="block text-sm font-medium mb-2">Trustee type:</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['individual', 'professional', 'corporate'].map(type => (
                <button
                  key={type}
                  onClick={() => setTrusteeType(type)}
                  className={`p-4 border rounded-lg text-left ${
                    trusteeType === type ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  <div className="font-medium capitalize">{type} trustee</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {type === 'individual' && 'Natural person, ordinary care standard'}
                    {type === 'professional' && 'Licensed/professional entity, enhanced standards'}
                    {type === 'corporate' && 'Company trustee, professional standards'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Jurisdiction */}
          <div>
            <label className="block text-sm font-medium mb-2">Applicable law:</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setJurisdiction('qld2025')}
                className={`p-4 border rounded-lg text-left ${
                  jurisdiction === 'qld2025' ? 'border-green-500 bg-green-50' : 'border-gray-300'
                }`}
              >
                <div className="font-medium">Queensland <em dangerouslySetInnerHTML={{ __html: 'Trusts Act 2025' }}></em></div>
                <div className="text-sm text-gray-600 mt-1">
                  Modernised legislation with non-excludable duties and enhanced powers
                </div>
              </button>
              <button
                onClick={() => setJurisdiction('qld1973')}
                className={`p-4 border rounded-lg text-left ${
                  jurisdiction === 'qld1973' ? 'border-orange-500 bg-orange-50' : 'border-gray-300'
                }`}
              >
                <div className="font-medium">Queensland <em dangerouslySetInnerHTML={{ __html: 'Trusts Act 1973' }}></em></div>
                <div className="text-sm text-gray-600 mt-1">
                  Previous legislation with limited statutory duties (pre-modernisation)
                </div>
              </button>
            </div>
          </div>

          {/* Trust Type */}
          <div>
            <label className="block text-sm font-medium mb-2">Trust type:</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {['discretionary', 'fixed', 'unit'].map(type => (
                <button
                  key={type}
                  onClick={() => setTrustType(type)}
                  className={`p-3 border rounded-lg text-center ${
                    trustType === type ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  <div className="font-medium capitalize">{type} trust</div>
                </button>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={analyzeScenario}
              disabled={!scenario || !trusteeType || !jurisdiction || !trustType}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Analyse duties & breaches
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Analysis Header */}
          <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
            <h2 className="text-xl font-bold mb-2">Analysis: {analysis.scenario.title}</h2>
            <p className="text-gray-700 mb-4">{analysis.scenario.description}</p>
            <div className="flex items-center space-x-4 text-sm">
              <span className="bg-blue-100 px-3 py-1 rounded-full">
                {trusteeType.charAt(0).toUpperCase() + trusteeType.slice(1)} trustee
              </span>
              <span className="bg-green-100 px-3 py-1 rounded-full">
                {jurisdiction === 'qld2025' ? <>Queensland <em dangerouslySetInnerHTML={{ __html: 'Trusts Act 2025' }}></em></> : <>Queensland <em dangerouslySetInnerHTML={{ __html: 'Trusts Act 1973' }}></em></>}
              </span>
              <span className="bg-purple-100 px-3 py-1 rounded-full">
                {trustType.charAt(0).toUpperCase() + trustType.slice(1)} trust
              </span>
            </div>
          </div>

          {/* Severity Indicator */}
          <div className={`p-4 rounded-lg flex items-center ${
            analysis.severity === 'high' ? 'bg-red-100 border border-red-300' :
            analysis.severity === 'medium' ? 'bg-yellow-100 border border-yellow-300' :
            'bg-green-100 border border-green-300'
          }`}>
            {analysis.severity === 'high' ?
              <XCircle className="w-6 h-6 text-red-600 mr-3" /> :
              analysis.severity === 'medium' ?
              <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3" /> :
              <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
            }
            <div>
              <div className="font-semibold">
                {analysis.severity === 'high' ? 'High risk breach' :
                  analysis.severity === 'medium' ? 'Moderate breach risk' :
                  'Low risk / technical issues'}
              </div>
              <div className="text-sm">
                {analysis.severity === 'high' ? 'Serious breaches with potential personal liability' :
                  analysis.severity === 'medium' ? 'Potential breaches requiring immediate attention' :
                  'Minor issues that should be addressed'}
              </div>
            </div>
          </div>

          {/* Applicable Duties */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
              Applicable trustee duties
            </h3>
            <div className="space-y-2">
              {analysis.applicableDuties.map((duty, index) => (
                <div key={index} className="flex items-start p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                  <Info className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{duty}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Potential Breaches */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
              Potential breaches identified
            </h3>
            <div className="space-y-2">
              {analysis.breaches.map((breach, index) => (
                <div key={index} className="flex items-start p-3 bg-red-50 rounded border-l-4 border-red-400">
                  <XCircle className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{breach}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Available Protections */}
          {analysis.protections.length > 0 && (
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                Available protections & defences
              </h3>
              <div className="space-y-2">
                {analysis.protections.map((protection, index) => (
                  <div key={index} className="flex items-start p-3 bg-green-50 rounded border-l-4 border-green-400">
                    <CheckCircle className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{protection}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommendations */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Recommended actions</h3>
            <div className="space-y-2">
              {analysis.recommendations.map((rec, index) => (
                <div key={index} className="flex items-start p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                  <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5 flex-shrink-0">
                    {index + 1}
                  </div>
                  <span className="text-sm">{rec}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={reset}
              className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Analyse another scenario
            </button>
          </div>
        </div>
      )}

      {/* Reference Material */}
      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Key Queensland 2025 vs 1973 differences</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-green-700 mb-2">Queensland <em dangerouslySetInnerHTML={{ __html: 'Trusts Act 2025' }}></em></h4>
            <ul className="text-sm space-y-1">
              <li>• Non-excludable core duties (Sections 64-70)</li>
              <li>• Tiered professional standards</li>
              <li>• Enhanced delegation powers</li>
              <li>• Statutory information disclosure rights</li>
              <li>• Mandatory 3-year record keeping</li>
              <li>• "All powers of absolute owner" framework</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-orange-700 mb-2">Queensland <em dangerouslySetInnerHTML={{ __html: 'Trusts Act 1973' }}></em></h4>
            <ul className="text-sm space-y-1">
              <li>• General law duties predominantly</li>
              <li>• Limited statutory powers</li>
              <li>• Basic record keeping requirements</li>
              <li>• Restrictive enumerated powers approach</li>
              <li>• Excludable statutory provisions</li>
              <li>• Limited beneficiary information rights</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveDutyChecker;
