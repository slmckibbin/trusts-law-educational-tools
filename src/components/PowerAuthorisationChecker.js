import { useState } from 'react';
import { Search, CheckCircle, XCircle, AlertTriangle, BookOpen, Scale, FileText } from 'lucide-react';

const PowerAuthorisationChecker = () => {
  const [proposedAction, setProposedAction] = useState('');
  const [jurisdiction, setJurisdiction] = useState('');
  const [trustType, setTrustType] = useState('');
  const [trustDeedProvisions, setTrustDeedProvisions] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const commonActions = [
    {
      id: 'investment_crypto',
      title: 'Invest in cryptocurrency',
      description: 'Investing 20% of trust fund in Bitcoin and Ethereum',
      category: 'Investment'
    },
    {
      id: 'property_purchase',
      title: 'Purchase residential property',
      description: 'Buy house for beneficiary to live in rent-free',
      category: 'Property'
    },
    {
      id: 'business_loan',
      title: 'Lend money to beneficiary business',
      description: 'Provide $100,000 loan to beneficiary\'s startup company',
      category: 'Lending'
    },
    {
      id: 'delegate_investment',
      title: 'Delegate investment management',
      description: 'Appoint professional fund manager for all investments',
      category: 'Delegation'
    },
    {
      id: 'family_company_shares',
      title: 'Purchase family company shares',
      description: 'Buy shares in company controlled by beneficiaries',
      category: 'Investment'
    },
    {
      id: 'overseas_investment',
      title: 'Invest in overseas property',
      description: 'Purchase commercial property in New Zealand',
      category: 'Investment'
    },
    {
      id: 'trustee_fees',
      title: 'Charge professional fees',
      description: 'Professional trustee charging 1.5% annual management fee',
      category: 'Remuneration'
    },
    {
      id: 'guarantee_debt',
      title: 'Guarantee beneficiary debt',
      description: 'Guarantee bank loan for beneficiary\'s home purchase',
      category: 'Guarantee'
    }
  ];

  const analyseAuthorisation = () => {
    if (!proposedAction || !jurisdiction || !trustType) return;

    const selectedAction = commonActions.find(a => a.id === proposedAction);
    
    let authorisation = 'uncertain';
    let sources = [];
    let conditions = [];
    let risks = [];
    let recommendations = [];

    // Analysis based on jurisdiction and action type
    if (jurisdiction === 'qld2025') {
      sources.push('Queensland <em>Trusts Act 2025</em> - "All powers of absolute owner" (general authority)');
      
      switch (proposedAction) {
        case 'investment_crypto':
          authorisation = 'likely_authorised';
          sources.push('General investment power subject to prudent person test');
          conditions.push('Must comply with enhanced duty of care (Sections 65-67)');
          conditions.push('Must consider risk appropriateness for trust purposes');
          if (trustType === 'superannuation') {
            authorisation = 'restricted';
            risks.push('Superannuation legislation may restrict cryptocurrency investments');
          }
          break;
          
        case 'delegate_investment':
          authorisation = 'authorised';
          sources.push('Sections 72-73: Enhanced delegation powers for investment functions');
          conditions.push('Maximum 12-month delegation terms');
          conditions.push('Must maintain oversight of delegate');
          conditions.push('Must ensure delegate is appropriately qualified');
          break;
          
        case 'property_purchase':
          authorisation = 'authorised';
          sources.push('Comprehensive property powers under general authority');
          conditions.push('Must be for proper trust purposes');
          conditions.push('Consider whether rent-free use affects other beneficiaries');
          if (trustType === 'discretionary') {
            conditions.push('Must exercise discretion properly among all beneficiaries');
          }
          break;
          
        case 'trustee_fees':
          authorisation = 'conditional';
          sources.push('Professional charging rights (if provided in deed)');
          conditions.push('Must be reasonable and disclosed');
          conditions.push('Court can review excessive charges');
          risks.push('Enhanced scrutiny under Queensland 2025 consumer protections');
          break;
      }
    } else if (jurisdiction === 'qld1973') {
      sources.push('Queensland <em>Trusts Act 1973</em> - Limited enumerated powers');
      
      switch (proposedAction) {
        case 'investment_crypto':
          authorisation = 'conditional';
          sources.push('General investment power (Section 21) subject to prudent person test');
          conditions.push('Must be "reasonably incurred" expense standard');
          risks.push('Cryptocurrency may be considered too speculative under 1973 standards');
          break;
          
        case 'delegate_investment':
          authorisation = 'restricted';
          sources.push('Limited delegation powers under 1973 Act');
          risks.push('Traditional prohibition on delegating discretionary powers');
          conditions.push('May only delegate administrative functions');
          break;
      }
    }

    // Trust deed considerations
    if (trustDeedProvisions.toLowerCase().includes('investment')) {
      if (trustDeedProvisions.toLowerCase().includes('conservative') || trustDeedProvisions.toLowerCase().includes('low risk')) {
        if (proposedAction === 'investment_crypto') {
          authorisation = 'unauthorised';
          risks.push('Trust deed appears to require conservative investment approach');
        }
      }
    }

    // General recommendations
    recommendations.push('Obtain professional legal advice before proceeding');
    recommendations.push('Document decision-making process thoroughly');
    recommendations.push('Consider obtaining beneficiary consent if appropriate');
    
    if (jurisdiction === 'qld2025') {
      recommendations.push('Ensure compliance with non-excludable duties (Sections 64-70)');
    }

    setAnalysis({
      action: selectedAction,
      authorisation,
      sources,
      conditions,
      risks,
      recommendations
    });
  };

  const reset = () => {
    setProposedAction('');
    setJurisdiction('');
    setTrustType('');
    setTrustDeedProvisions('');
    setAnalysis(null);
  };

  const getAuthorisationColor = (auth) => {
    switch (auth) {
      case 'authorised': return 'text-green-600';
      case 'likely_authorised': return 'text-blue-600';
      case 'conditional': return 'text-yellow-600';
      case 'restricted': return 'text-orange-600';
      case 'unauthorised': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getAuthorisationIcon = (auth) => {
    switch (auth) {
      case 'authorised': return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'likely_authorised': return <CheckCircle className="w-6 h-6 text-blue-600" />;
      case 'conditional': return <AlertTriangle className="w-6 h-6 text-yellow-600" />;
      case 'restricted': return <AlertTriangle className="w-6 h-6 text-orange-600" />;
      case 'unauthorised': return <XCircle className="w-6 h-6 text-red-600" />;
      default: return <Search className="w-6 h-6 text-gray-600" />;
    }
  };

  const getAuthorisationText = (auth) => {
    switch (auth) {
      case 'authorised': return 'Authorised';
      case 'likely_authorised': return 'Likely authorised';
      case 'conditional': return 'Conditionally authorised';
      case 'restricted': return 'Restricted/limited authority';
      case 'unauthorised': return 'Not authorised';
      default: return 'Requires analysis';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <Search className="w-8 h-8 mr-3 text-blue-600" />
          Trustee Power Authorisation Checker
        </h1>
        <p className="text-gray-600">Determine whether trustees have authority for specific actions under trust deeds and legislation</p>
      </div>

      {!analysis ? (
        <div className="space-y-6">
          {/* Proposed Action */}
          <div>
            <label className="block text-sm font-medium mb-2">Proposed action:</label>
            <select 
              value={proposedAction} 
              onChange={(e) => setProposedAction(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select an action to analyse...</option>
              {commonActions.map(action => (
                <option key={action.id} value={action.id}>
                  {action.title} - {action.description}
                </option>
              ))}
            </select>
            {proposedAction && (
              <div className="mt-2 p-3 bg-gray-50 rounded border-l-4 border-blue-500">
                <div className="font-medium">{commonActions.find(a => a.id === proposedAction)?.title}</div>
                <div className="text-sm text-gray-600 mt-1">
                  Category: {commonActions.find(a => a.id === proposedAction)?.category}
                </div>
                <div className="text-sm text-gray-700 mt-1">
                  {commonActions.find(a => a.id === proposedAction)?.description}
                </div>
              </div>
            )}
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
                <div className="font-medium">Queensland <em>Trusts Act 2025</em></div>
                <div className="text-sm text-gray-600 mt-1">
                  "All powers of absolute owner" + enhanced duties
                </div>
              </button>
              <button
                onClick={() => setJurisdiction('qld1973')}
                className={`p-4 border rounded-lg text-left ${
                  jurisdiction === 'qld1973' ? 'border-orange-500 bg-orange-50' : 'border-gray-300'
                }`}
              >
                <div className="font-medium">Queensland <em>Trusts Act 1973</em></div>
                <div className="text-sm text-gray-600 mt-1">
                  Limited enumerated powers approach
                </div>
              </button>
            </div>
          </div>

          {/* Trust Type */}
          <div>
            <label className="block text-sm font-medium mb-2">Trust type:</label>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {['discretionary', 'unit', 'fixed', 'superannuation'].map(type => (
                <button
                  key={type}
                  onClick={() => setTrustType(type)}
                  className={`p-3 border rounded-lg text-center ${
                    trustType === type ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  <div className="font-medium capitalize">{type}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {type === 'discretionary' && 'Trustee discretion over distributions'}
                    {type === 'unit' && 'Fixed units with proportional rights'}
                    {type === 'fixed' && 'Fixed beneficial interests'}
                    {type === 'superannuation' && 'Subject to super legislation'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Trust Deed Provisions */}
          <div>
            <label className="block text-sm font-medium mb-2">Relevant trust deed provisions (optional):</label>
            <textarea
              value={trustDeedProvisions}
              onChange={(e) => setTrustDeedProvisions(e.target.value)}
              placeholder="Enter any specific trust deed clauses that may be relevant (e.g., investment restrictions, specific powers granted, etc.)"
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 h-24 resize-none"
            />
            <div className="text-xs text-gray-500 mt-1">
              Include any investment restrictions, specific powers, or limitations mentioned in the trust deed
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={analyseAuthorisation}
              disabled={!proposedAction || !jurisdiction || !trustType}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Analyse authorisation
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Analysis Header */}
          <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
            <h2 className="text-xl font-bold mb-2">Authorisation analysis: {analysis.action.title}</h2>
            <p className="text-gray-700 mb-4">{analysis.action.description}</p>
            <div className="flex items-center space-x-4 text-sm">
              <span className="bg-blue-100 px-3 py-1 rounded-full">
                Category: {analysis.action.category}
              </span>
              <span className="bg-green-100 px-3 py-1 rounded-full">
                {jurisdiction === 'qld2025' ? <>Queensland <em>Trusts Act 2025</em></> : <>Queensland <em>Trusts Act 1973</em></>}
              </span>
              <span className="bg-purple-100 px-3 py-1 rounded-full">
                {trustType.charAt(0).toUpperCase() + trustType.slice(1)} trust
              </span>
            </div>
          </div>

          {/* Authorisation Result */}
          <div className={`p-6 rounded-lg border-2 ${
            analysis.authorisation === 'authorised' || analysis.authorisation === 'likely_authorised' ? 'border-green-300 bg-green-50' :
            analysis.authorisation === 'conditional' ? 'border-yellow-300 bg-yellow-50' :
            analysis.authorisation === 'restricted' ? 'border-orange-300 bg-orange-50' :
            'border-red-300 bg-red-50'
          }`}>
            <div className="flex items-center mb-4">
              {getAuthorisationIcon(analysis.authorisation)}
              <div className="ml-3">
                <div className={`text-xl font-bold ${getAuthorisationColor(analysis.authorisation)}`}>
                  {getAuthorisationText(analysis.authorisation)}
                </div>
                <div className="text-sm text-gray-600">
                  Based on available information and legal framework
                </div>
              </div>
            </div>
          </div>

          {/* Legal Sources */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
              Legal sources of authority
            </h3>
            <div className="space-y-2">
              {analysis.sources.map((source, index) => (
                <div key={index} className="flex items-start p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                  <Scale className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm" dangerouslySetInnerHTML={{ __html: source }}></span>
                </div>
              ))}
            </div>
          </div>

          {/* Conditions */}
          {analysis.conditions.length > 0 && (
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-yellow-600" />
                Conditions and requirements
              </h3>
              <div className="space-y-2">
                {analysis.conditions.map((condition, index) => (
                  <div key={index} className="flex items-start p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
                    <AlertTriangle className="w-4 h-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{condition}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Risks */}
          {analysis.risks.length > 0 && (
            <div className="bg-white border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <XCircle className="w-5 h-5 mr-2 text-red-600" />
                Risks and limitations
              </h3>
              <div className="space-y-2">
                {analysis.risks.map((risk, index) => (
                  <div key={index} className="flex items-start p-3 bg-red-50 rounded border-l-4 border-red-400">
                    <XCircle className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{risk}</span>
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
              Analyse another action
            </button>
          </div>
        </div>
      )}

      {/* Reference Information */}
      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Key authorisation principles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-medium text-green-700 mb-2">Queensland <em>Trusts Act 2025</em></h4>
            <ul className="space-y-1">
              <li>• "All powers of absolute owner" general authority</li>
              <li>• Enhanced delegation powers (Sections 72-73)</li>
              <li>• Subject to non-excludable duties</li>
              <li>• Professional standards for corporate trustees</li>
              <li>• Broad investment and administrative powers</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-orange-700 mb-2">General principles</h4>
            <ul className="space-y-1">
              <li>• Trust deed provisions override general law</li>
              <li>• Powers must be exercised for proper purposes</li>
              <li>• Prudent person test applies to investments</li>
              <li>• Beneficiary interests must be considered</li>
              <li>• Professional advice recommended for complex actions</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-blue-100 border border-blue-200 rounded">
          <div className="flex items-start">
            <FileText className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-blue-800">
              <strong>Important:</strong> This tool provides general guidance only. Always obtain specific legal advice before taking significant trustee actions, especially for complex transactions or where substantial assets are involved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PowerAuthorisationChecker;
