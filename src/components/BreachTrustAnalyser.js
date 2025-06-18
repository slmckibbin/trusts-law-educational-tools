// src/components/BreachTrustAnalyser.js
import { useState, useEffect } from 'react';
import { AlertTriangle, Shield, Scale, Target, CheckCircle, XCircle, Info, Gavel } from 'lucide-react';

const BreachTrustAnalyser = () => {
  const = useState('');
  const [jurisdiction, setJurisdiction] = useState('');
  const = useState(''); // Corrected: Added variable names
  const [circumstances, setCircumstances] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const breachTypes =;

  const analyseBreach = () => {
    if (!selectedBreach ||!jurisdiction ||!trusteeType) return;

    const breach = breachTypes.find(b => b.id === selectedBreach);
    let severity = breach.severity;
    let consequences =;
    let defences =;
    let remedies =;
    let liability = 'potential';

    // Base analysis for breach type
    switch (selectedBreach) {
      case 'self_dealing':
        consequences.push('Transaction potentially voidable at beneficiary election.');
        consequences.push('Personal liability for any loss to trust.');
        consequences.push('Potential profit disgorgement.');
        defences.push('Full disclosure and beneficiary consent obtained.');
        defences.push('Independent valuation showing fair price.');
        defences.push('Transaction clearly for trust benefit.');
        remedies.push('Rescission of transaction.');
        remedies.push('Account for profits made.');
        remedies.push('Compensation for loss.');
        liability = 'high';
        break;

      case 'investment_loss':
        consequences.push('Personal liability if investment was imprudent.');
        consequences.push('Breach of duty of care.');
        defences.push('Investment was within trustee\'s powers.');
        defences.push('Proper professional advice obtained.');
        defences.push('Investment reasonable at time made (not hindsight).');
        defences.push('Part of properly diversified portfolio.');
        remedies.push('Compensation for losses caused by breach.');
        remedies.push('Court may excuse if honest and reasonable.');
        liability = 'medium';
        break;

      case 'unauthorised_distribution':
        consequences.push('Personal liability to replace trust funds.');
        consequences.push('Potential breach of fiduciary duties.');
        defences.push('Distribution authorised by trust deed.');
        defences.push('Proper exercise of discretion.');
        defences.push('Beneficiary was entitled to receive distribution.');
        remedies.push('Recovery of distributed funds.');
        remedies.push('Personal reimbursement to trust.');
        liability = 'high';
        break;

      case 'information_refusal':
        if (jurisdiction === 'qld2025') {
          consequences.push('Breach of statutory non-excludable duty (Section 70).');
          consequences.push('Potential court order to provide information.');
          severity = 'medium'; // Higher in QLD 2025
        } else {
          consequences.push('Breach of equitable duty to account.');
        }
        defences.push('Information genuinely confidential.');
        defences.push('Disclosure would harm trust interests.');
        defences.push('Beneficiary has no legitimate interest in information.');
        remedies.push('Court order for disclosure.');
        remedies.push('Potential cost orders.');
        liability = 'low';
        break;
    }

    // Jurisdiction-specific analysis
    if (jurisdiction === 'qld2025') {
      if (['self_dealing', 'investment_loss', 'record_keeping', 'information_refusal'].includes(selectedBreach)) {
        consequences.push('Potential breach of non-excludable statutory duties.');
        defences.push('Section 160 court relief if acted honestly and reasonably.');
      }

      if (trusteeType === 'professional') {
        consequences.push('Higher professional standard applies (Section 65).');
        severity = severity === 'low'? 'medium' : severity === 'medium'? 'high' : severity;
      }
    }

    // Trustee type considerations
    if (trusteeType === 'professional') {
      consequences.push('Enhanced professional liability standards.');
      consequences.push('Potential regulatory action.');
      defences.push('Acted in accordance with professional standards.');
    }

    if (trusteeType === 'corporate') {
      consequences.push('Potential director liability under s 197 *Corporations Act 2001* (Cth).');
      defences.push('Directors acted with proper corporate authority.');
    }

    // Circumstance considerations
    if (circumstances.toLowerCase().includes('honest mistake')) {
      defences.push('Honest and reasonable mistake.');
      remedies.push('Court discretion to excuse under relief provisions.');
    }

    if (circumstances.toLowerCase().includes('beneficiary consent')) {
      defences.push('Beneficiary knowledge and consent.');
      liability = liability === 'high'? 'medium' : liability === 'medium'? 'low' : liability;
    }

    setAnalysis({
      breach,
      severity,
      consequences,
      defences,
      remedies,
      liability
    });
  };

  const reset = () => {
    setSelectedBreach('');
    setJurisdiction('');
    setTrusteeType('');
    setCircumstances('');
    setAnalysis(null);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLiabilityColor = (liability) => {
    switch (liability) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getLiabilityIcon = (liability) => {
    switch (liability) {
      case 'high': return <XCircle className="w-6 h-6 text-red-600" />;
      case 'medium': return <AlertTriangle className="w-6 h-6 text-yellow-600" />;
      case 'low': return <CheckCircle className="w-6 h-6 text-green-600" />;
      default: return <Scale className="w-6 h-6 text-gray-600" />;
    }
  };

  const getLiabilityText = (liability) => {
    switch (liability) {
      case 'high': return 'High liability risk';
      case 'medium': return 'Moderate liability risk';
      case 'low': return 'Low liability risk';
      default: return 'Liability uncertain';
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <AlertTriangle className="w-8 h-8 mr-3 text-red-600" />
          Breach of Trust Analyser
        </h1>
        <p className="text-gray-600">Identify and analyse potential trustee breaches with legal consequences and defences.</p>
      </div>

      {!analysis? (
        <div className="space-y-6">
          {/* Breach Type Selection */}
          <div>
            <label className="block text-sm font-medium mb-2">Type of potential breach:</label>
            <select
              value={selectedBreach}
              onChange={(e) => setSelectedBreach(e.target.value)}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a breach type...</option>
              {breachTypes.map(breach => (
                <option key={breach.id} value={breach.id}>
                  {breach.title} – {breach.description}
                </option>
              ))}
            </select>
            {selectedBreach && (
              <div className="mt-2 p-3 bg-gray-50 rounded border-l-4 border-red-500">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">{breachTypes.find(b => b.id === selectedBreach)?.title}</div>
                    <div className="text-sm text-gray-600 mt-1">
                      Category: {breachTypes.find(b => b.id === selectedBreach)?.category}
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full border text-sm ${getSeverityColor(breachTypes.find(b => b.id === selectedBreach)?.severity)}`}>
                    {breachTypes.find(b => b.id === selectedBreach)?.severity.charAt(0).toUpperCase() + breachTypes.find(b => b.id === selectedBreach)?.severity.slice(1)} severity
                  </span>
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
                  jurisdiction === 'qld2025'? 'border-green-500 bg-green-50' : 'border-gray-300'
                }`}
              >
                <div className="font-medium">Queensland <em dangerouslySetInnerHTML={{ __html: 'Trusts Act 2025' }}></em> (Qld)</div>
                <div className="text-sm text-gray-600 mt-1">
                  Non-excludable duties and enhanced protections.
                </div>
              </button>
              <button
                onClick={() => setJurisdiction('qld1973')}
                className={`p-4 border rounded-lg text-left ${
                  jurisdiction === 'qld1973'? 'border-orange-500 bg-orange-50' : 'border-gray-300'
                }`}
              >
                <div className="font-medium">Queensland <em dangerouslySetInnerHTML={{ __html: 'Trusts Act 1973' }}></em> (Qld)</div>
                <div className="text-sm text-gray-600 mt-1">
                  Traditional equitable principles.
                </div>
              </button>
            </div>
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
                    trusteeType === type? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                  }`}
                >
                  <div className="font-medium capitalize">{type} trustee</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {type === 'individual' && 'Natural person, basic care standard.'}
                    {type === 'professional' && 'Licensed entity, enhanced standards.'}
                    {type === 'corporate' && 'Company trustee, director liability.'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Circumstances */}
          <div>
            <label className="block text-sm font-medium mb-2">Additional circumstances (optional):</label>
            <textarea
              value={circumstances}
              onChange={(e) => setCircumstances(e.target.value)}
              placeholder="Describe any relevant circumstances (e.g., honest mistake, beneficiary consent, professional advice obtained, emergency situation, etc.)."
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 h-24 resize-none"
            />
            <div className="text-xs text-gray-500 mt-1">
              Include factors that might affect liability or available defences.
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={analyseBreach}
              disabled={!selectedBreach ||!jurisdiction ||!trusteeType}
              className="px-8 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Analyse breach.
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Analysis Header */}
          <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-red-500">
            <h2 className="text-xl font-bold mb-2">Breach analysis: {analysis.breach.title}</h2>
            <p className="text-gray-700 mb-4">{analysis.breach.description}</p>
            <div className="flex items-center space-x-4 text-sm">
              <span className="bg-red-100 px-3 py-1 rounded-full">
                Category: {analysis.breach.category}
              </span>
              <span className={`px-3 py-1 rounded-full border ${getSeverityColor(analysis.severity)}`}>
                {analysis.severity.charAt(0).toUpperCase() + analysis.severity.slice(1)} severity
              </span>
              <span className="bg-blue-100 px-3 py-1 rounded-full">
                {jurisdiction === 'qld2025'? <>Queensland <em dangerouslySetInnerHTML={{ __html: 'Trusts Act 2025' }}></em> (Qld)</> : <>Queensland <em dangerouslySetInnerHTML={{ __html: 'Trusts Act 1973' }}></em> (Qld)</>}
              </span>
            </div>
          </div>

          {/* Liability Assessment */}
          <div className={`p-6 rounded-lg border-2 ${
            analysis.liability === 'high'? 'border-red-300 bg-red-50' :
            analysis.liability === 'medium'? 'border-yellow-300 bg-yellow-50' :
            'border-green-300 bg-green-50'
          }`}>
            <div className="flex items-center mb-4">
              {getLiabilityIcon(analysis.liability)}
              <div className="ml-3">
                <div className={`text-xl font-bold ${getLiabilityColor(analysis.liability)}`}>
                  {getLiabilityText(analysis.liability)}
                </div>
                <div className="text-sm text-gray-600">
                  Based on breach type, jurisdiction, and circumstances.
                </div>
              </div>
            </div>
          </div>

          {/* Consequences */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <XCircle className="w-5 h-5 mr-2 text-red-600" />
              Potential consequences
            </h3>
            <div className="space-y-2">
              {analysis.consequences.map((consequence, index) => (
                <div key={index} className="flex items-start p-3 bg-red-50 rounded border-l-4 border-red-400">
                  <AlertTriangle className="w-4 h-4 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{consequence}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Available Defences */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Shield className="w-5 h-5 mr-2 text-blue-600" />
              Potential defences
            </h3>
            <div className="space-y-2">
              {analysis.defences.map((defence, index) => (
                <div key={index} className="flex items-start p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                  <Shield className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{defence}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Available Remedies */}
          <div className="bg-white border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Gavel className="w-5 h-5 mr-2 text-purple-600" />
              Available remedies
            </h3>
            <div className="space-y-2">
              {analysis.remedies.map((remedy, index) => (
                <div key={index} className="flex items-start p-3 bg-purple-50 rounded border-l-4 border-purple-400">
                  <Gavel className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{remedy}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Immediate Actions */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-yellow-600" />
              Immediate recommended actions
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-start">
                <span className="w-6 h-6 bg-yellow-600 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">1</span>
                <span>Cease any ongoing breach immediately.</span>
              </div>
              <div className="flex items-start">
                <span className="w-6 h-6 bg-yellow-600 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">2</span>
                <span>Obtain urgent legal advice from a specialist trust lawyer.</span>
              </div>
              <div className="flex items-start">
                <span className="w-6 h-6 bg-yellow-600 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">3</span>
                <span>Document all relevant facts and circumstances.</span>
              </div>
              <div className="flex items-start">
                <span className="w-6 h-6 bg-yellow-600 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">4</span>
                <span>Consider disclosure to beneficiaries if appropriate.</span>
              </div>
              <div className="flex items-start">
                <span className="w-6 h-6 bg-yellow-600 text-white rounded-full flex items-center justify-center text-xs mr-3 mt-0.5">5</span>
                <span>Review insurance coverage and notify insurers if required.</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={reset}
              className="px-8 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Analyse another breach.
            </button>
          </div>
        </div>
      )}

      {/* Reference Information */}
      <div className="mt-8 bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Key breach principles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div>
            <h4 className="font-medium text-red-700 mb-2">Types of breach</h4>
            <ul className="space-y-1">
              <li>• Breach of fiduciary duties (loyalty, no conflict).</li>
              <li>• Breach of duty of care (prudent person standard).</li>
              <li>• Unauthorised acts (exceeding powers).</li>
              <li>• Administrative failures (records, accounts).</li>
              <li>• Distributive breaches (wrong payments).</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-blue-700 mb-2">Relief and protection</h4>
            <ul className="space-y-1">
              <li>• Court discretion to excuse honest, reasonable trustees.</li>
              <li>• Beneficiary consent and acquiescence.</li>
              <li>• Professional advice defence.</li>
              <li>• Insurance coverage where available.</li>
              <li>• Limitation periods for claims.</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 p-4 bg-red-100 border border-red-200 rounded">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-red-600 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-red-800">
              <strong>Disclaimer:</strong> This tool provides general educational guidance only. Actual breach consequences depend on specific facts, applicable law, and judicial discretion. Always seek immediate professional legal advice for potential breach situations.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BreachTrustAnalyser;
