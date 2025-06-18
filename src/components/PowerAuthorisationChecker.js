// src/components/PowerAuthorisationChecker.js
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
      title: 'Cryptocurrency Investment',
      description: 'Investing trust assets in Bitcoin, Ethereum, or other digital currencies',
      category: 'Investment Powers'
    },
    {
      id: 'delegate_investment',
      title: 'Delegate Investment Management',
      description: 'Appointing professional investment managers or advisers',
      category: 'Delegation Powers'
    },
    {
      id: 'property_purchase',
      title: 'Real Property Purchase',
      description: 'Acquiring residential or commercial real estate for the trust',
      category: 'Investment Powers'
    },
    {
      id: 'trustee_fees',
      title: 'Professional Trustee Remuneration',
      description: 'Charging fees for professional trustee services',
      category: 'Administrative Powers'
    },
    {
      id: 'beneficiary_loan',
      title: 'Loan to Beneficiary',
      description: 'Providing financial assistance or loans to trust beneficiaries',
      category: 'Distribution Powers'
    },
    {
      id: 'business_operation',
      title: 'Conduct Business Operations',
      description: 'Operating a business enterprise through the trust structure',
      category: 'Commercial Powers'
    },
    {
      id: 'asset_sale',
      title: 'Major Asset Disposal',
      description: 'Selling significant trust assets or investments',
      category: 'Administrative Powers'
    },
    {
      id: 'capital_distribution',
      title: 'Capital Distribution',
      description: 'Distributing capital (not income) to beneficiaries',
      category: 'Distribution Powers'
    },
    {
      id: 'insurance_purchase',
      title: 'Insurance Coverage',
      description: 'Obtaining insurance for trust assets or trustee liability',
      category: 'Administrative Powers'
    },
    {
      id: 'legal_proceedings',
      title: 'Initiate Legal Action',
      description: 'Commencing or defending legal proceedings on behalf of the trust',
      category: 'Administrative Powers'
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

    // Analyse based on jurisdiction and action type
    if (jurisdiction === 'qld2025') {
      sources.push('Queensland <em>Trusts Act 2025</em> (Qld) – 'All powers of absolute owner' (general authority)');
      
      switch (proposedAction) {
        case 'investment_crypto':
          authorisation = 'likely_authorised';
          sources.push('General investment power subject to prudent person test');
          conditions.push('Must comply with enhanced duty of care (Sections 65–67)');
          conditions.push('Must consider risk appropriateness for trust purposes');
          if (trustType === 'superannuation') {
            authorisation = 'restricted';
            risks.push('Superannuation legislation may restrict cryptocurrency investments');
          }
          risks.push('High volatility requires careful consideration of beneficiary interests');
          break;

        case 'delegate_investment':
          authorisation = 'authorised';
          sources.push('Sections 72–73: Enhanced delegation powers for investment functions');
          conditions.push('Must maintain oversight of delegate');
          conditions.push('Must ensure delegate is appropriately qualified');
          conditions.push('Review delegation arrangements regularly');
          break;

        case 'property_purchase':
          authorisation = 'authorised';
          sources.push('Comprehensive property powers under general authority');
          conditions.push('Must be for proper trust purposes');
          conditions.push('Consider impact on beneficiary interests');
          if (trustType === 'discretionary') {
            conditions.push('Must exercise discretion properly among all beneficiaries');
          }
          break;

        case 'trustee_fees':
          authorisation = 'conditional';
          sources.push('Professional charging rights (if provided in deed)');
          conditions.push('Must be reasonable and disclosed to beneficiaries');
          conditions.push('Court can review excessive charges');
          risks.push('Enhanced scrutiny under Queensland 2025 consumer protections');
          break;

        case 'beneficiary_loan':
          authorisation = 'conditional';
          sources.push('General power to advance capital to beneficiaries');
          conditions.push('Must be on commercial terms or clearly justified');
          conditions.push('Must consider impact on other beneficiaries');
          conditions.push('Proper documentation and security required');
          break;

        case 'business_operation':
          authorisation = 'likely_authorised';
          sources.push('Broad commercial powers under 'all powers' framework');
          conditions.push('Must be consistent with trust purposes');
          conditions.push('Consider liability implications for trustees');
          risks.push('Business operations may increase trustee liability exposure');
          break;

        case 'asset_sale':
          authorisation = 'authorised';
          sources.push('General power of disposition under absolute owner framework');
          conditions.push('Must obtain fair market value');
          conditions.push('Consider timing and beneficiary interests');
          break;

        case 'capital_distribution':
          authorisation = 'conditional';
          sources.push('Distribution powers subject to trust deed terms');
          conditions.push('Must be authorised by trust deed');
          conditions.push('Consider impact on future beneficiaries');
          if (trustType === 'fixed') {
            conditions.push('Must respect fixed beneficial interests');
          }
          break;

        case 'insurance_purchase':
          authorisation = 'authorised';
          sources.push('General power to protect trust assets');
          conditions.push('Must be reasonable and necessary');
          conditions.push('Premiums must be justifiable expense');
          break;

        case 'legal_proceedings':
          authorisation = 'authorised';
          sources.push('General authority to protect trust interests');
          conditions.push('Must be in best interests of trust');
          conditions.push('Consider cost-benefit of litigation');
          conditions.push('May require court approval for major proceedings');
          break;

        default:
          authorisation = 'requires_analysis';
          sources.push('Refer to specific trust deed and legislative provisions');
      }
    } else if (jurisdiction === 'qld1973') {
      sources.push('Queensland <em>Trusts Act 1973</em> (Qld) – Limited enumerated powers');
      
      switch (proposedAction) {
        case 'investment_crypto':
          authorisation = 'conditional';
          sources.push('General investment power (Section 21) subject to prudent person test');
          conditions.push('Must be 'reasonably prudent' investment standard');
          risks.push('Cryptocurrency may be considered too speculative under 1973 standards');
          break;

        case 'delegate_investment':
          authorisation = 'restricted';
          sources.push('Limited delegation powers under the 1973 Act');
          risks.push('Traditional prohibition on delegating discretionary powers');
          conditions.push('May only delegate administrative functions');
          break;

        case 'property_purchase':
          authorisation = 'likely_authorised';
          sources.push('Traditional investment powers include real estate');
          conditions.push('Must comply with prudent investment principles');
          break;

        case 'trustee_fees':
          authorisation = 'conditional';
          sources.push('Charging rights if authorised by trust deed');
          conditions.push('Must be reasonable remuneration only');
          break;

        default:
          authorisation = 'requires_analysis';
          sources.push('Refer to enumerated powers in 1973 Act and trust deed');
      }
    }

    // Trust deed considerations
    if (trustDeedProvisions.toLowerCase().includes('investment')) {
      if (trustDeedProvisions.toLowerCase().includes('conservative') || 
          trustDeedProvisions.toLowerCase().includes('low risk')) {
        if (proposedAction === 'investment_crypto') {
          authorisation = 'unauthorised';
          risks.push('Trust deed appears to require conservative investment approach');
        }
      }
    }

    if (trustDeedProvisions.toLowerCase().includes('no delegation') || 
        trustDeedProvisions.toLowerCase().includes('cannot delegate')) {
      if (proposedAction === 'delegate_investment') {
        authorisation = 'unauthorised';
        risks.push('Trust deed appears to prohibit delegation');
      }
    }

    // Trust type specific considerations
    if (trustType === 'superannuation') {
      risks.push('Must comply with superannuation regulatory requirements');
      conditions.push('SIS Act restrictions may apply');
    }

    if (trustType === 'unit') {
      conditions.push('Must consider unit holder rights and interests');
    }

    // General recommendations
    recommendations.push('Obtain professional legal advice before proceeding');
    recommendations.push('Document decision-making process thoroughly');
    recommendations.push('Consider obtaining beneficiary consent if appropriate');
    recommendations.push('Review trust deed provisions carefully');

    if (jurisdiction === 'qld2025') {
      recommendations.push('Ensure compliance with non-excludable duties (Sections 64–70)');
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
        <p className="text-gray-600">Determine whether trustees have authority for specific actions under trust deeds and legislation.</p>
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
                  {action.title} – {action.description}
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
                <div className="font-medium">Queensland <em>Trusts Act 2025</em> (Qld)</div>
                <div className="text-sm text-gray-600 mt-1">
                  'All powers of absolute owner' and enhanced duties.
                </div>
              </button>
              <button
                onClick={() => setJurisdiction('qld1973')}
                className={`p-4 border rounded-lg text-left ${
                  jurisdiction === 'qld1973' ? 'border-orange-500 bg-orange-50' : 'border-gray-300'
                }`}
              >
                <div className="font-medium">Queensland <em>Trusts Act 1973</em> (Qld)</div>
                <div className="text-sm text-gray-600 mt-1">
                  Limited enumerated powers approach.
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
                    {type === 'superannuation' && 'Subject to superannuation legislation'}
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
              placeholder="Enter any specific trust deed clauses that may be relevant (e.g., investment restrictions, specific powers granted, etc.)."
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 h-24 resize-none"
            />
            <div className="text-xs text-gray-500 mt-1">
              Include any investment restrictions, specific powers, or limitations mentioned in the trust deed.
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
                {jurisdiction === 'qld2025' ? <>Queensland <em>Trusts Act 2025</em> (Qld)</> : <>Queensland <em>Trusts Act 1973</em> (Qld)</>}
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
                  Based on available information and legal framework.
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
            <h4 className="font-medium text-green-700 mb-2">Queensland <em>Trusts Act 2025</em> (Qld)</h4>
            <ul className="space-y-1">
              <li>• 'All powers of absolute owner' general authority</li>
              <li>• Enhanced delegation powers (Sections 72–73)</li>
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
