// src/components/JurisdictionComparisonTool.js
import { useState } from 'react';
import { Map, BookOpen, Scale, Users, DollarSign, Clock, Shield, AlertTriangle } from 'lucide-react';

const JurisdictionComparisonTool = () => {
  const [selectedJurisdictions, setSelectedJurisdictions] = useState(['qld2025', 'nsw']);
  const [comparisonCategory, setComparisonCategory] = useState('duties');
  const [showDetails, setShowDetails] = useState(null);

  const jurisdictions = {
    qld2025: {
      name: 'Queensland 2025',
      fullName: 'Trusts Act 2025 (Qld)',
      description: 'Modernised trust legislation with non-excludable duties'
    },
    qld1973: {
      name: 'Queensland 1973',
      fullName: 'Trusts Act 1973 (Qld)',
      description: 'Previous Queensland legislation (pre-modernisation)'
    },
    nsw: {
      name: 'New South Wales',
      fullName: 'Trustee Act 1925 (NSW)',
      description: 'Traditional trustee legislation'
    },
    vic: {
      name: 'Victoria',
      fullName: 'Trustee Act 1958 (Vic)',
      description: 'Victorian trustee framework'
    },
    wa: {
      name: 'Western Australia',
      fullName: 'Trustees Act 1962 (WA)',
      description: 'Western Australian provisions'
    },
    sa: {
      name: 'South Australia',
      fullName: 'Trustee Act 1936 (SA)',
      description: 'South Australian framework'
    },
    tas: {
      name: 'Tasmania',
      fullName: 'Trustee Act 1898 (Tas)',
      description: 'Tasmanian trustee law'
    },
    act: {
      name: 'Australian Capital Territory',
      fullName: 'Trustee Act 1957 (ACT)',
      description: 'ACT trustee provisions'
    },
    nt: {
      name: 'Northern Territory',
      fullName: 'Trustee Act 1893 (NT)',
      description: 'Northern Territory framework'
    }
  };

  const comparisonData = {
    duties: {
      title: 'Core Trustee Duties',
      categories: [
        {
          name: 'Non-excludable duties',
          qld2025: {
            status: 'excellent',
            text: 'Comprehensive statutory framework',
            detail: 'Sections 64-70 establish non-excludable core duties including honesty, good faith, reasonable care, and information disclosure. Revolutionary approach in Australian trust law.'
          },
          qld1973: {
            status: 'poor',
            text: 'No non-excludable duties',
            detail: 'Traditional approach with most duties excludable by trust deed. Limited statutory protection for beneficiaries.'
          },
          nsw: {
            status: 'poor',
            text: 'No non-excludable duties',
            detail: 'Relies on general law principles. Trust deeds can exclude most trustee duties following *Armitage v Nurse* principles.'
          },
          vic: {
            status: 'poor',
            text: 'No non-excludable duties',
            detail: 'Traditional legislative framework. Most duties can be excluded or modified by trust deed provisions.'
          },
          wa: {
            status: 'poor',
            text: 'No non-excludable duties',
            detail: 'Conventional approach allowing broad exclusion clauses in trust deeds.'
          },
          sa: {
            status: 'poor',
            text: 'No non-excludable duties',
            detail: 'Traditional framework with extensive scope for duty exclusion.'
          },
          tas: {
            status: 'poor',
            text: 'No non-excludable duties',
            detail: 'Oldest trustee legislation in Australia. Very limited statutory duties.'
          },
          act: {
            status: 'poor',
            text: 'No non-excludable duties',
            detail: 'Standard approach allowing trust deeds to exclude or limit trustee duties.'
          },
          nt: {
            status: 'poor',
            text: 'No non-excludable duties',
            detail: 'Traditional legislative framework based on 19th century English law.'
          }
        },
        {
          name: 'Professional trustee standards',
          qld2025: {
            status: 'excellent',
            text: 'Tiered professional standards',
            detail: 'Section 65 establishes enhanced standard for professional trustees - "care, diligence and skill that a prudent person engaged in the profession of trustee would exercise".'
          },
          qld1973: {
            status: 'fair',
            text: 'Basic prudent person test',
            detail: 'Standard prudent person test applies to all trustees regardless of professional status.'
          },
          nsw: {
            status: 'fair',
            text: 'General prudent person standard',
            detail: 'Section 14C requires trustees to exercise reasonable care and skill, but no enhanced professional standard.'
          },
          vic: {
            status: 'fair',
            text: 'Basic care standard',
            detail: 'General duty of care but limited recognition of enhanced professional obligations.'
          },
          wa: {
            status: 'fair',
            text: 'Standard care duty',
            detail: 'Prudent person standard without specific professional trustee provisions.'
          },
          sa: {
            status: 'fair',
            text: 'Basic prudent person test',
            detail: 'Traditional approach without enhanced standards for professional trustees.'
          },
          tas: {
            status: 'poor',
            text: 'Limited care provisions',
            detail: 'Minimal statutory guidance on trustee care standards.'
          },
          act: {
            status: 'fair',
            text: 'General care standard',
            detail: 'Basic prudent person approach without professional enhancement.'
          },
          nt: {
            status: 'poor',
            text: 'Minimal care standards',
            detail: 'Limited statutory framework for trustee care obligations.'
          }
        },
        {
          name: 'Information disclosure',
          qld2025: {
            status: 'excellent',
            text: 'Statutory disclosure rights',
            detail: 'Section 70 provides non-excludable right for beneficiaries to obtain trust information and accounts. Comprehensive statutory framework.'
          },
          qld1973: {
            status: 'fair',
            text: 'Limited disclosure rights',
            detail: 'Basic equitable principles for beneficiary information rights. Can be modified by trust deed.'
          },
          nsw: {
            status: 'good',
            text: 'Beneficiary information provisions',
            detail: 'Sections 80-87 provide beneficiary rights to information, but can be excluded or modified.'
          },
          vic: {
            status: 'fair',
            text: 'Basic disclosure framework',
            detail: 'Limited statutory provisions. Relies mainly on equitable principles.'
          },
          wa: {
            status: 'fair',
            text: 'Traditional approach',
            detail: 'Equitable principles govern disclosure. Limited statutory guidance.'
          },
          sa: {
            status: 'fair',
            text: 'Basic information rights',
            detail: 'Traditional framework with limited beneficiary information rights.'
          },
          tas: {
            status: 'poor',
            text: 'Minimal provisions',
            detail: 'Very limited statutory framework for beneficiary information rights.'
          },
          act: {
            status: 'fair',
            text: 'Standard disclosure rules',
            detail: 'Basic beneficiary information rights under general principles.'
          },
          nt: {
            status: 'poor',
            text: 'Limited framework',
            detail: 'Minimal statutory provisions for beneficiary information access.'
          }
        }
      ]
    },
    powers: {
      title: 'Trustee Powers',
      categories: [
        {
          name: 'Investment powers',
          qld2025: {
            status: 'excellent',
            text: '"All powers of absolute owner"',
            detail: 'Section 71 provides revolutionary "all powers of absolute owner" framework, replacing restrictive enumerated powers approach.'
          },
          qld1973: {
            status: 'fair',
            text: 'Enumerated powers approach',
            detail: 'Traditional list of specific powers. More restrictive than modern approaches.'
          },
          nsw: {
            status: 'good',
            text: 'Broad investment powers',
            detail: 'Section 14A provides general power to invest as if absolutely entitled, subject to trust terms.'
          },
          vic: {
            status: 'good',
            text: 'General investment authority',
            detail: 'Broad investment powers under statutory framework.'
          },
          wa: {
            status: 'fair',
            text: 'Standard investment powers',
            detail: 'Traditional investment framework with some modern updates.'
          },
          sa: {
            status: 'fair',
            text: 'Basic investment authority',
            detail: 'Standard legislative approach to trustee investment powers.'
          },
          tas: {
            status: 'poor',
            text: 'Limited investment powers',
            detail: 'Restrictive approach reflecting older legislative framework.'
          },
          act: {
            status: 'fair',
            text: 'Standard powers',
            detail: 'Basic investment authority under traditional framework.'
          },
          nt: {
            status: 'poor',
            text: 'Restrictive powers',
            detail: 'Limited investment authority under dated legislation.'
          }
        },
        {
          name: 'Delegation powers',
          qld2025: {
            status: 'excellent',
            text: 'Enhanced delegation framework',
            detail: 'Sections 72-73 provide comprehensive delegation powers with supervision requirements. Modern approach to portfolio management.'
          },
          qld1973: {
            status: 'fair',
            text: 'Limited delegation',
            detail: 'Restrictive approach to delegation reflecting traditional concerns.'
          },
          nsw: {
            status: 'good',
            text: 'Delegation provisions',
            detail: 'Statutory delegation powers with appropriate safeguards and supervision requirements.'
          },
          vic: {
            status: 'fair',
            text: 'Basic delegation rules',
            detail: 'Standard delegation framework with traditional restrictions.'
          },
          wa: {
            status: 'fair',
            text: 'Limited delegation',
            detail: 'Traditional approach with restrictive delegation provisions.'
          },
          sa: {
            status: 'fair',
            text: 'Standard delegation',
            detail: 'Basic delegation powers under conventional framework.'
          },
          tas: {
            status: 'poor',
            text: 'Minimal delegation',
            detail: 'Very limited delegation authority reflecting older legislative approach.'
          },
          act: {
            status: 'fair',
            text: 'Basic delegation',
            detail: 'Standard delegation provisions without modern enhancements.'
          },
          nt: {
            status: 'poor',
            text: 'Restrictive delegation',
            detail: 'Limited delegation powers under dated legislative framework.'
          }
        },
        {
          name: 'Administrative powers',
          qld2025: {
            status: 'excellent',
            text: 'Comprehensive framework',
            detail: 'Modern administrative powers covering all aspects of trust management and operation.'
          },
          qld1973: {
            status: 'fair',
            text: 'Standard powers',
            detail: 'Traditional administrative framework with basic powers.'
          },
          nsw: {
            status: 'good',
            text: 'Broad administrative authority',
            detail: 'Comprehensive administrative powers for effective trust management.'
          },
          vic: {
            status: 'fair',
            text: 'Standard administrative powers',
            detail: 'Basic framework for trust administration and management.'
          },
          wa: {
            status: 'fair',
            text: 'Traditional approach',
            detail: 'Standard administrative powers under conventional framework.'
          },
          sa: {
            status: 'fair',
            text: 'Basic administrative framework',
            detail: 'Traditional approach to trustee administrative authority.'
          },
          tas: {
            status: 'poor',
            text: 'Limited administrative powers',
            detail: 'Restrictive framework reflecting older legislative approach.'
          },
          act: {
            status: 'fair',
            text: 'Standard framework',
            detail: 'Basic administrative powers under traditional approach.'
          },
          nt: {
            status: 'poor',
            text: 'Minimal administrative authority',
            detail: 'Limited powers under dated legislative framework.'
          }
        }
      ]
    },
    protections: {
      title: 'Trustee Protections',
      categories: [
        {
          name: 'Judicial relief',
          qld2025: {
            status: 'excellent',
            text: 'Comprehensive relief provisions',
            detail: 'Section 160 provides court discretion to relieve trustees who acted "honestly and reasonably". Modernised relief framework.'
          },
          qld1973: {
            status: 'fair',
            text: 'Basic relief provisions',
            detail: 'Limited statutory relief. Relies mainly on general principles.'
          },
          nsw: {
            status: 'good',
            text: 'Judicial relief available',
            detail: 'Section 85 provides court discretion to relieve trustees in appropriate circumstances.'
          },
          vic: {
            status: 'fair',
            text: 'Standard relief framework',
            detail: 'Basic judicial relief provisions under traditional approach.'
          },
          wa: {
            status: 'fair',
            text: 'Limited relief provisions',
            detail: 'Traditional framework with basic court discretion.'
          },
          sa: {
            status: 'fair',
            text: 'Basic relief available',
            detail: 'Standard judicial relief under conventional framework.'
          },
          tas: {
            status: 'poor',
            text: 'Minimal relief provisions',
            detail: 'Limited statutory framework for trustee relief.'
          },
          act: {
            status: 'fair',
            text: 'Standard relief',
            detail: 'Basic judicial relief provisions under traditional approach.'
          },
          nt: {
            status: 'poor',
            text: 'Limited relief framework',
            detail: 'Minimal provisions for judicial relief of trustees.'
          }
        },
        {
          name: 'Insurance and indemnity',
          qld2025: {
            status: 'good',
            text: 'Modern indemnity framework',
            detail: 'Comprehensive provisions for trustee insurance and indemnification from trust assets.'
          },
          qld1973: {
            status: 'fair',
            text: 'Basic indemnity rights',
            detail: 'Traditional indemnity provisions without modern enhancements.'
          },
          nsw: {
            status: 'fair',
            text: 'Standard indemnity',
            detail: 'Basic trustee indemnity rights under conventional framework.'
          },
          vic: {
            status: 'fair',
            text: 'Traditional indemnity',
            detail: 'Standard indemnity provisions for trustees.'
          },
          wa: {
            status: 'fair',
            text: 'Basic indemnity framework',
            detail: 'Traditional approach to trustee indemnification.'
          },
          sa: {
            status: 'fair',
            text: 'Standard indemnity',
            detail: 'Conventional indemnity provisions for trustees.'
          },
          tas: {
            status: 'poor',
            text: 'Limited indemnity',
            detail: 'Minimal indemnity framework under older legislation.'
          },
          act: {
            status: 'fair',
            text: 'Basic indemnity',
            detail: 'Standard indemnity provisions under traditional framework.'
          },
          nt: {
            status: 'poor',
            text: 'Minimal indemnity',
            detail: 'Limited indemnity provisions under dated legislation.'
          }
        },
        {
          name: 'Limitation periods',
          qld2025: {
            status: 'good',
            text: 'Clear limitation framework',
            detail: 'Defined limitation periods for different types of breaches with appropriate exceptions.'
          },
          qld1973: {
            status: 'fair',
            text: 'Standard limitations',
            detail: 'Traditional limitation periods without modern clarifications.'
          },
          nsw: {
            status: 'fair',
            text: 'Basic limitation periods',
            detail: 'Standard framework for limitation of trustee liability.'
          },
          vic: {
            status: 'fair',
            text: 'Traditional limitations',
            detail: 'Conventional approach to limitation periods.'
          },
          wa: {
            status: 'fair',
            text: 'Standard framework',
            detail: 'Basic limitation provisions under traditional approach.'
          },
          sa: {
            status: 'fair',
            text: 'Traditional limitations',
            detail: 'Standard limitation periods for trustee actions.'
          },
          tas: {
            status: 'poor',
            text: 'Limited provisions',
            detail: 'Minimal framework for limitation of trustee liability.'
          },
          act: {
            status: 'fair',
            text: 'Basic limitations',
            detail: 'Standard limitation provisions under traditional framework.'
          },
          nt: {
            status: 'poor',
            text: 'Minimal framework',
            detail: 'Limited provisions for limitation periods.'
          }
        }
      ]
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

  const toggleJurisdiction = (jurisdictionKey) => {
    if (selectedJurisdictions.includes(jurisdictionKey)) {
      if (selectedJurisdictions.length > 1) {
        setSelectedJurisdictions(selectedJurisdictions.filter(j => j !== jurisdictionKey));
      }
    } else {
      setSelectedJurisdictions([...selectedJurisdictions, jurisdictionKey]);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <Map className="w-8 h-8 mr-3 text-purple-600" />
          Jurisdiction Comparison Tool
        </h1>
        <p className="text-gray-600">Compare trustee powers and duties across Australian states and territories</p>
      </div>

      {/* Jurisdiction Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Select jurisdictions to compare:</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {Object.entries(jurisdictions).map(([key, jurisdiction]) => (
            <button
              key={key}
              onClick={() => toggleJurisdiction(key)}
              className={`p-3 border rounded-lg text-left transition-all ${
                selectedJurisdictions.includes(key) 
                  ? 'border-purple-500 bg-purple-50 text-purple-800' 
                  : 'border-gray-300 hover:border-purple-300'
              }`}
            >
              <div className="font-medium text-sm">{jurisdiction.name}</div>
              <div className="text-xs text-gray-600 mt-1">{jurisdiction.description}</div>
            </button>
          ))}
        </div>
        <div className="text-sm text-gray-600 mt-2">
          Selected: {selectedJurisdictions.length} jurisdiction{selectedJurisdictions.length !== 1 ? 's' : ''} 
          (minimum 1 required)
        </div>
      </div>

      {/* Category Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Comparison category:</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Object.entries(comparisonData).map(([key, category]) => (
            <button
              key={key}
              onClick={() => setComparisonCategory(key)}
              className={`p-4 border rounded-lg text-left ${
                comparisonCategory === key 
                  ? 'border-purple-500 bg-purple-50' 
                  : 'border-gray-300 hover:border-purple-300'
              }`}
            >
              <div className="flex items-center mb-2">
                {key === 'duties' && <Scale className="w-5 h-5 mr-2 text-purple-600" />}
                {key === 'powers' && <Shield className="w-5 h-5 mr-2 text-purple-600" />}
                {key === 'protections' && <Users className="w-5 h-5 mr-2 text-purple-600" />}
                <span className="font-medium">{category.title}</span>
              </div>
              <div className="text-sm text-gray-600">
                {key === 'duties' && 'Core obligations and standards for trustees'}
                {key === 'powers' && 'Authority and capabilities of trustees'}
                {key === 'protections' && 'Legal safeguards and relief for trustees'}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4 font-semibold border-r min-w-48">
                  {comparisonData[comparisonCategory].title}
                </th>
                {selectedJurisdictions.map(jurisdictionKey => (
                  <th key={jurisdictionKey} className="text-center p-4 font-semibold border-r min-w-40">
                    <div>{jurisdictions[jurisdictionKey].name}</div>
                    <div className="text-xs text-gray-600 font-normal">
                      <em dangerouslySetInnerHTML={{ __html: jurisdictions[jurisdictionKey].fullName }}></em>
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

      {/* Disclaimer */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
          <div className="text-sm text-yellow-800">
            <strong>Educational comparison:</strong> This tool provides general comparative information about Australian trust law jurisdictions. Laws are subject to change and professional legal advice should be sought for specific trust matters. Comparative assessments reflect general frameworks as at 2025.
          </div>
        </div>
      </div>
    </div>
  );
};

export default JurisdictionComparisonTool;
