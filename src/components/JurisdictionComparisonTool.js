import { useState } from 'react';
import { Map, BookOpen, Scale, Users, DollarSign, Clock, Shield, AlertTriangle } from 'lucide-react';

const JurisdictionComparisonTool = () => {
  const [selectedJurisdictions, setSelectedJurisdictions] = useState(['qld2025', 'nsw']);
  const [comparisonCategory, setComparisonCategory] = useState('powers');
  const [showDetails, setShowDetails] = useState(null);

  const jurisdictions = {
    qld2025: {
      name: 'Queensland 2025',
      fullName: 'Trusts Act 2025 (Qld)',
      color: 'green',
      status: 'Most progressive',
      description: 'Comprehensive modernisation with non-excludable duties'
    },
    qld1973: {
      name: 'Queensland 1973',
      fullName: 'Trusts Act 1973 (Qld)',
      color: 'orange',
      status: 'Superseded',
      description: 'Previous Queensland legislation (for comparison)'
    },
    nsw: {
      name: 'New South Wales',
      fullName: 'Trustee Act 1925 (NSW)',
      color: 'blue',
      status: 'Traditional',
      description: 'Long-established framework with recent amendments'
    },
    vic: {
      name: 'Victoria',
      fullName: 'Trustee Act 1958 (Vic)',
      color: 'purple',
      status: 'Moderate reform',
      description: 'Some modernisation but limited scope'
    },
    wa: {
      name: 'Western Australia',
      fullName: 'Trustees Act 1962 (WA)',
      color: 'red',
      status: 'Traditional',
      description: 'Conservative approach with basic provisions'
    },
    sa: {
      name: 'South Australia',
      fullName: 'Trustee Act 1936 (SA)',
      color: 'indigo',
      status: 'Mixed',
      description: 'Traditional powers with some innovations'
    }
  };

  const comparisonData = {
    powers: {
      title: 'Trustee Powers',
      icon: <Shield className="w-5 h-5" />,
      categories: [
        {
          name: 'General Powers',
          qld2025: { status: 'excellent', text: 'All powers of absolute owner', detail: 'Revolutionary approach - trustees have all powers of absolute ownership subject to duties' },
          qld1973: { status: 'poor', text: 'Limited enumerated powers', detail: 'Restrictive list of specific powers only' },
          nsw: { status: 'good', text: 'Broad statutory powers', detail: 'Comprehensive but still enumerated approach' },
          vic: { status: 'good', text: 'Wide powers with limitations', detail: 'Good range but some restrictions remain' },
          wa: { status: 'fair', text: 'General sale powers', detail: 'More limited than other jurisdictions' },
          sa: { status: 'fair', text: 'Limited statutory powers', detail: 'Basic enumerated powers only' }
        },
        {
          name: 'Investment Powers',
          qld2025: { status: 'excellent', text: 'Unrestricted + delegation', detail: 'Any investment + power to delegate to professionals (12-month max terms)' },
          qld1973: { status: 'good', text: 'General investment power', detail: 'Prudent person test, reasonably incurred expenses' },
          nsw: { status: 'good', text: 'General investment power', detail: 'Prudent person test, can exclude some requirements' },
          vic: { status: 'good', text: 'General investment power', detail: 'Similar to NSW with some variations' },
          wa: { status: 'good', text: 'General investment power', detail: 'Prudent person test, reasonably incurred standard' },
          sa: { status: 'good', text: 'General investment power', detail: 'Basic prudent person requirements' }
        },
        {
          name: 'Delegation Powers',
          qld2025: { status: 'excellent', text: 'Enhanced delegation rights', detail: 'Sections 72-73: Can delegate investment and admin functions with oversight' },
          qld1973: { status: 'poor', text: 'Limited delegation', detail: 'Traditional restrictions on delegation of powers' },
          nsw: { status: 'fair', text: 'Basic delegation powers', detail: 'Some delegation allowed but restricted' },
          vic: { status: 'fair', text: 'Limited delegation', detail: 'Conservative approach to delegation' },
          wa: { status: 'fair', text: 'Basic delegation', detail: 'Traditional limitations apply' },
          sa: { status: 'poor', text: 'Minimal delegation', detail: 'Very limited delegation provisions' }
        },
        {
          name: 'Administrative Powers',
          qld2025: { status: 'excellent', text: 'Comprehensive admin powers', detail: 'All necessary powers for modern trust administration' },
          qld1973: { status: 'fair', text: 'Basic admin powers', detail: 'Limited to specific enumerated functions' },
          nsw: { status: 'good', text: 'Wide admin powers', detail: 'Good range of administrative functions' },
          vic: { status: 'good', text: 'Broad admin powers', detail: 'Reasonable administrative flexibility' },
          wa: { status: 'fair', text: 'Standard admin powers', detail: 'Basic administrative functions only' },
          sa: { status: 'fair', text: 'Limited admin powers', detail: 'Conservative administrative scope' }
        }
      ]
    },
    duties: {
      title: 'Trustee Duties',
      icon: <Scale className="w-5 h-5" />,
      categories: [
        {
          name: 'Core Duties (Non-excludable)',
          qld2025: { status: 'excellent', text: 'Statutory non-excludable duties', detail: 'Sections 64-70: Honesty, care, records, information - cannot be excluded' },
          qld1973: { status: 'poor', text: 'General law only', detail: 'No statutory non-excludable duties' },
          nsw: { status: 'poor', text: 'General law only', detail: 'Traditional equitable duties, mostly excludable' },
          vic: { status: 'poor', text: 'General law only', detail: 'No comprehensive statutory duty framework' },
          wa: { status: 'poor', text: 'General law only', detail: 'Relies primarily on equitable duties' },
          sa: { status: 'poor', text: 'General law only', detail: 'Traditional equitable duty approach' }
        },
        {
          name: 'Duty of Care Standards',
          qld2025: { status: 'excellent', text: 'Tiered professional standards', detail: 'Sections 65-67: Different standards for professional, knowledgeable, and ordinary trustees' },
          qld1973: { status: 'fair', text: 'General prudent person', detail: 'Single standard for all trustees' },
          nsw: { status: 'fair', text: 'Prudent person standard', detail: 'Objective standard for all trustees' },
          vic: { status: 'fair', text: 'Prudent person standard', detail: 'Traditional single standard approach' },
          wa: { status: 'fair', text: 'Prudent person standard', detail: 'Basic prudent person test' },
          sa: { status: 'fair', text: 'Prudent person standard', detail: 'Standard objective test' }
        },
        {
          name: 'Record Keeping',
          qld2025: { status: 'excellent', text: '3-year minimum statutory', detail: 'Section 69: Detailed record-keeping requirements, cannot be excluded' },
          qld1973: { status: 'fair', text: 'Basic record keeping', detail: 'Section 77: General obligation to keep accounts' },
          nsw: { status: 'good', text: 'Account keeping duties', detail: 'Good accounting and reporting requirements' },
          vic: { status: 'fair', text: 'Basic account duties', detail: 'Standard accounting obligations' },
          wa: { status: 'fair', text: 'General accounting', detail: 'Basic record-keeping requirements' },
          sa: { status: 'good', text: 'Prescribed records', detail: 'Specific record-keeping obligations' }
        },
        {
          name: 'Information Disclosure',
          qld2025: { status: 'excellent', text: 'Statutory disclosure rights', detail: 'Section 70: Beneficiaries have statutory rights to information' },
          qld1973: { status: 'poor', text: 'General law only', detail: 'Limited to equitable rights to accounts' },
          nsw: { status: 'fair', text: 'General law disclosure', detail: 'Traditional equitable information rights' },
          vic: { status: 'fair', text: 'Limited disclosure', detail: 'Basic equitable disclosure principles' },
          wa: { status: 'fair', text: 'General law only', detail: 'Traditional approach to information' },
          sa: { status: 'fair', text: 'Basic disclosure', detail: 'Some statutory inspection rights' }
        }
      ]
    },
    protections: {
      title: 'Trustee Protections',
      icon: <Shield className="w-5 h-5" />,
      categories: [
        {
          name: 'Indemnification Rights',
          qld2025: { status: 'excellent', text: 'Enhanced indemnification', detail: 'Sections 154-155: Broader reimbursement rights with stronger protections' },
          qld1973: { status: 'good', text: 'Standard indemnification', detail: 'Traditional right to reimbursement for reasonably incurred expenses' },
          nsw: { status: 'good', text: 'Broad reimbursement', detail: 'All expenses incurred in or about trust administration' },
          vic: { status: 'good', text: 'Standard indemnity', detail: 'General reimbursement for proper expenses' },
          wa: { status: 'fair', text: 'Reasonable expenses only', detail: 'Limited to reasonably incurred expenses' },
          sa: { status: 'good', text: 'General indemnity', detail: 'Standard reimbursement provisions' }
        },
        {
          name: 'Court Relief Powers',
          qld2025: { status: 'excellent', text: 'Discretionary relief', detail: 'Section 160: Court may relieve trustees from liability in appropriate cases' },
          qld1973: { status: 'fair', text: 'Limited court relief', detail: 'Basic court discretion to excuse breaches' },
          nsw: { status: 'good', text: 'Court relief available', detail: 'Section 85: Court may excuse honest and reasonable trustees' },
          vic: { status: 'good', text: 'Relief provisions', detail: 'Court discretion for honest and reasonable conduct' },
          wa: { status: 'fair', text: 'Basic relief', detail: 'Limited court relief provisions' },
          sa: { status: 'fair', text: 'Court discretion', detail: 'Basic court relief for honest trustees' }
        },
        {
          name: 'Professional Advice Protection',
          qld2025: { status: 'excellent', text: 'Statutory advice protection', detail: 'Section 153: Enhanced protection when acting on professional advice' },
          qld1973: { status: 'poor', text: 'General law only', detail: 'No specific statutory protection for professional advice' },
          nsw: { status: 'fair', text: 'Limited advice protection', detail: 'Some protection for following proper advice' },
          vic: { status: 'fair', text: 'Basic advice protection', detail: 'General protection for reasonable reliance' },
          wa: { status: 'fair', text: 'Limited protection', detail: 'Basic advice reliance protection' },
          sa: { status: 'poor', text: 'Minimal protection', detail: 'Very limited statutory advice protection' }
        }
      ]
    },
    beneficiary: {
      title: 'Beneficiary Rights',
      icon: <Users className="w-5 h-5" />,
      categories: [
        {
          name: 'Information Access',
          qld2025: { status: 'excellent', text: 'Comprehensive statutory rights', detail: 'Section 70: Clear entitlement to trust information and documents' },
          qld1973: { status: 'poor', text: 'Limited equitable rights', detail: 'Traditional rights to accounts only' },
          nsw: { status: 'fair', text: 'General law rights', detail: 'Equitable rights to trust accounts and some information' },
          vic: { status: 'fair', text: 'Traditional rights', detail: 'Limited to traditional equitable principles' },
          wa: { status: 'fair', text: 'Basic information rights', detail: 'Traditional equitable information access' },
          sa: { status: 'good', text: 'Some statutory rights', detail: 'Inspection rights for records in certain circumstances' }
        },
        {
          name: 'Enforcement Mechanisms',
          qld2025: { status: 'excellent', text: 'Enhanced enforcement', detail: 'District Court jurisdiction, streamlined procedures' },
          qld1973: { status: 'fair', text: 'Traditional enforcement', detail: 'Supreme Court jurisdiction only' },
          nsw: { status: 'good', text: 'Court enforcement', detail: 'Good range of enforcement mechanisms' },
          vic: { status: 'fair', text: 'Standard enforcement', detail: 'Traditional court-based enforcement' },
          wa: { status: 'fair', text: 'Basic enforcement', detail: 'Limited enforcement mechanisms' },
          sa: { status: 'fair', text: 'Court enforcement', detail: 'Standard judicial enforcement' }
        },
        {
          name: 'Protection from Unsuitable Trustees',
          qld2025: { status: 'excellent', text: 'Comprehensive disqualification', detail: 'Broad grounds for disqualifying unsuitable trustees' },
          qld1973: { status: 'poor', text: 'Limited protections', detail: 'Basic disqualification provisions only' },
          nsw: { status: 'fair', text: 'Standard protections', detail: 'Traditional disqualification grounds' },
          vic: { status: 'fair', text: 'Basic protections', detail: 'Limited unsuitable trustee provisions' },
          wa: { status: 'fair', text: 'Standard provisions', detail: 'Basic trustee qualification requirements' },
          sa: { status: 'fair', text: 'Limited protections', detail: 'Minimal unsuitable trustee protections' }
        }
      ]
    }
  };

  const toggleJurisdiction = (jurisdiction) => {
    if (selectedJurisdictions.includes(jurisdiction)) {
      if (selectedJurisdictions.length > 1) {
        setSelectedJurisdictions(selectedJurisdictions.filter(j => j !== jurisdiction));
      }
    } else {
      setSelectedJurisdictions([...selectedJurisdictions, jurisdiction]);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent': return 'bg-green-100 text-green-800 border-green-200';
      case 'good': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'fair': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'poor': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent': return '🌟';
      case 'good': return '✅';
      case 'fair': return '⚠️';
      case 'poor': return '❌';
      default: return '❓';
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <Map className="w-8 h-8 mr-3 text-blue-600" />
          Australian Trust Law Jurisdiction Comparison
        </h1>
        <p className="text-gray-600">Compare trustee powers, duties, and protections across Australian jurisdictions</p>
      </div>

      {/* Jurisdiction Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Select jurisdictions to compare (minimum 2):</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {Object.entries(jurisdictions).map(([key, jurisdiction]) => (
            <button
              key={key}
              onClick={() => toggleJurisdiction(key)}
              className={`p-3 rounded-lg border-2 text-center transition-all ${
                selectedJurisdictions.includes(key)
                  ? `border-${jurisdiction.color}-500 bg-${jurisdiction.color}-50`
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <div className="font-medium text-sm">{jurisdiction.name}</div>
              <div className={`text-xs mt-1 px-2 py-1 rounded ${
                jurisdiction.status === 'Most progressive' ? 'bg-green-100 text-green-700' :
                jurisdiction.status === 'Superseded' ? 'bg-red-100 text-red-700' :
                jurisdiction.status === 'Traditional' ? 'bg-blue-100 text-blue-700' :
                jurisdiction.status === 'Moderate reform' ? 'bg-purple-100 text-purple-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                {jurisdiction.status}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Category Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Comparison category:</h3>
        <div className="flex flex-wrap gap-3">
          {Object.entries(comparisonData).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setComparisonCategory(key)}
              className={`flex items-center px-4 py-2 rounded-lg border ${
                comparisonCategory === key
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              {category.icon}
              <span className="ml-2 font-medium">{category.title}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="bg-gray-50 p-4 border-b">
          <h3 className="text-xl font-semibold flex items-center">
            {comparisonData[comparisonCategory].icon}
            <span className="ml-2">{comparisonData[comparisonCategory].title} comparison</span>
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4 font-semibold border-r">Aspect</th>
                {selectedJurisdictions.map(jurisdictionKey => (
                  <th key={jurisdictionKey} className="text-center p-4 font-semibold border-r min-w-40">
                    <div>{jurisdictions[jurisdictionKey].name}</div>
                    <div className="text-xs text-gray-600 font-normal">
                      <em>{jurisdictions[jurisdictionKey].fullName}</em>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisonData[comparisonCategory].categories.map((category, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-4 font-medium border-r bg-gray-50">
                    {category.name}
                  </td>
                  {selectedJurisdictions.map(jurisdictionKey => {
                    const data = category[jurisdictionKey];
                    return (
                      <td key={jurisdictionKey} className="p-4 border-r text-center">
                        <div className={`inline-flex items-center px-3 py-1 rounded-full border text-sm ${getStatusColor(data.status)}`}>
                          <span className="mr-2">{getStatusIcon(data.status)}</span>
                          {data.text}
                        </div>
                        <button
                          onClick={() => setShowDetails(showDetails === `${index}-${jurisdictionKey}` ? null : `${index}-${jurisdictionKey}`)}
                          className="block mt-2 text-xs text-blue-600 hover:text-blue-800 mx-auto"
                        >
                          {showDetails === `${index}-${jurisdictionKey}` ? 'Hide details' : 'Show details'}
                        </button>
                        {showDetails === `${index}-${jurisdictionKey}` && (
                          <div className="mt-2 p-3 bg-blue-50 rounded border text-xs text-left">
                            {data.detail}
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Insights */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            Queensland 2025 advantages
          </h3>
          <ul className="text-sm text-green-700 space-y-2">
            <li>• First non-excludable statutory duties in Australia</li>
            <li>• "All powers of absolute owner" revolutionary approach</li>
            <li>• Tiered professional standards for different trustee types</li>
            <li>• Enhanced delegation powers for modern portfolio management</li>
            <li>• Statutory beneficiary information rights</li>
            <li>• Comprehensive court relief provisions</li>
          </ul>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
            <BookOpen className="w-5 h-5 mr-2" />
            Practical implications
          </h3>
          <ul className="text-sm text-blue-700 space-y-2">
            <li>• Queensland trusts gain competitive advantage in flexibility</li>
            <li>• Higher compliance burden but better beneficiary protection</li>
            <li>• Professional trustees face enhanced liability standards</li>
            <li>• Other jurisdictions may need to consider reforms</li>
            <li>• Trust shopping may favour Queensland for new structures</li>
            <li>• Existing trusts may consider restructuring</li>
          </ul>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-3">Status legend:</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="flex items-center">
            <span className="mr-2">🌟</span>
            <span className={`px-2 py-1 rounded ${getStatusColor('excellent')}`}>Excellent</span>
            <span className="ml-2 text-gray-600">Leading practice</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">✅</span>
            <span className={`px-2 py-1 rounded ${getStatusColor('good')}`}>Good</span>
            <span className="ml-2 text-gray-600">Solid provisions</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">⚠️</span>
            <span className={`px-2 py-1 rounded ${getStatusColor('fair')}`}>Fair</span>
            <span className="ml-2 text-gray-600">Basic coverage</span>
          </div>
          <div className="flex items-center">
            <span className="mr-2">❌</span>
            <span className={`px-2 py-1 rounded ${getStatusColor('poor')}`}>Poor</span>
            <span className="ml-2 text-gray-600">Limited/outdated</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JurisdictionComparisonTool;
