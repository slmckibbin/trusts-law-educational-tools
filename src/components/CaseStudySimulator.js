// src/components/CaseStudySimulator.js
import { useState } from 'react';
import { Play, RotateCcw, User, DollarSign, FileText, AlertTriangle, CheckCircle, XCircle, ArrowRight } from 'lucide-react';

const CaseStudySimulator = () => {
  const [currentCase, setCurrentCase] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [userChoices, setUserChoices] = useState([]);
  const [totalScore, setTotalScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const caseStudies = {
    family_trust: {
      title: "Family Discretionary Trust Crisis",
      description: "You are the trustee of the Smith Family Trust ($2 million assets). The family is in conflict over distributions.",
      jurisdiction: "qld2025",
      trusteeType: "professional",
      scenario: {
        background: "The Smith Family Trust has $2 million in assets. John Smith (settlor, deceased) established the trust for his three adult children: Sarah (doctor), Mark (unemployed), and Lisa (student). Sarah demands equal distributions, Mark needs financial help for gambling debts, and Lisa wants education funding.",
        characters: [
          {
            name: "Sarah Smith",
            role: "Beneficiary (Doctor)",
            background: "High-income medical professional, demands 'fairness' and equal treatment",
            motivation: "Wants equal distributions and transparency in trustee decisions"
          },
          {
            name: "Mark Smith", 
            role: "Beneficiary (Unemployed)",
            background: "Struggling with gambling addiction, seeking financial assistance",
            motivation: "Needs money to pay debts and get back on feet"
          },
          {
            name: "Lisa Smith",
            role: "Beneficiary (Student)",
            background: "Medical student requiring education funding",
            motivation: "Wants support for educational advancement"
          }
        ]
      },
      steps: [
        {
          id: 1,
          situation: "Mark requests $100,000 to pay off gambling debts. He claims this will help him 'get clean' and restart his life. Sarah strongly objects, saying the family shouldn't enable his gambling.",
          question: "How do you handle Mark's request for gambling debt assistance?",
          options: [
            {
              id: 'a',
              text: "Approve the $100,000 distribution immediately",
              impact: { score: 1, consequences: "Quick decision, but may enable addiction and anger other beneficiaries.", legal: "Within discretion, but questionable exercise of power." }
            },
            {
              id: 'b',
              text: "Refuse the distribution citing trust purposes",
              impact: { score: 2, consequences: "Protects trust assets, but Mark may face serious consequences.", legal: "Defensible as gambling debts may not advance trust purposes." }
            },
            {
              id: 'c',
              text: "Offer structured support conditional on addiction counselling",
              impact: { score: 3, consequences: "Balanced approach addressing underlying issues.", legal: "Good exercise of discretion with protective conditions." }
            },
            {
              id: 'd',
              text: "Consult with professional addiction counsellor before deciding",
              impact: { score: 3, consequences: "Thorough and responsible approach.", legal: "Seeking expert advice demonstrates prudent decision-making." }
            }
          ]
        },
        {
          id: 2,
          situation: "Sarah discovers you did not give Mark $100,000 and demands an explanation. She argues all beneficiaries should receive equal annual distributions of $50,000 each as 'that's only fair'.",
          question: "How do you handle Sarah's demand for equal distributions?",
          options: [
            {
              id: 'a',
              text: "Agree to implement equal distributions to avoid conflict",
              impact: { score: 1, consequences: "Appeases Sarah but ignores discretionary nature of trust.", legal: "Fails to properly exercise discretion considering individual circumstances." }
            },
            {
              id: 'b',
              text: "Explain discretionary trust principles and your duty to consider individual needs",
              impact: { score: 3, consequences: "Educational and legally sound approach.", legal: "Correctly explains trustee discretion and fiduciary duties." }
            },
            {
              id: 'c',
              text: "Provide detailed information about trust terms and your decision-making process",
              impact: { score: 3, consequences: "Transparency builds trust and demonstrates proper governance.", legal: "Meets information disclosure obligations under *Trusts Act 2025* (Qld) s 70." }
            },
            {
              id: 'd',
              text: "Refuse to discuss trust decisions with other beneficiaries",
              impact: { score: 1, consequences: "Maintains confidentiality but may breed suspicion.", legal: "May breach information disclosure duties under Queensland law." }
            }
          ]
        },
        {
          id: 3,
          situation: "Lisa needs $30,000 for medical school fees next month. This is clearly for education (trust purpose) but Sarah objects, saying Lisa already had her 'turn' with previous education distributions.",
          question: "How do you decide on Lisa's education funding request?",
          options: [
            {
              id: 'a',
              text: "Approve education funding as it clearly meets trust purposes",
              impact: { score: 3, consequences: "Supports legitimate educational needs.", legal: "Proper exercise of discretion for clear trust purposes." }
            },
            {
              id: 'b',
              text: "Deny the request to maintain family harmony",
              impact: { score: 1, consequences: "Avoids conflict but fails Lisa's legitimate needs.", legal: "Improper to deny legitimate claim due to family pressure." }
            },
            {
              id: 'c',
              text: "Approve funding but require detailed reporting on educational progress",
              impact: { score: 3, consequences: "Supports education with appropriate oversight.", legal: "Good governance with reasonable conditions." }
            },
            {
              id: 'd',
              text: "Offer a smaller amount as compromise",
              impact: { score: 2, consequences: "Partial solution may not fully meet educational needs.", legal: "Acceptable if amount is sufficient for stated purpose." }
            }
          ]
        },
        {
          id: 4,
          situation: "The trust assets have grown significantly. You are considering investing $500,000 in a high-growth tech fund that your financial adviser recommends, but it is higher risk than current conservative investments.",
          question: "How do you approach this investment decision?",
          options: [
            {
              id: 'a',
              text: "Proceed with tech investment based on adviser recommendation",
              impact: { score: 2, consequences: "May generate good returns but significantly increases risk.", legal: "Acceptable if investment falls within trustee powers and risk tolerance." }
            },
            {
              id: 'b',
              text: "Maintain conservative investment approach",
              impact: { score: 2, consequences: "Protects capital but may limit growth potential.", legal: "Prudent approach, particularly for family trust." }
            },
            {
              id: 'c',
              text: "Diversify with smaller allocation to higher-risk investments",
              impact: { score: 3, consequences: "Balanced approach managing risk and growth.", legal: "Good application of prudent investment principles." }
            },
            {
              id: 'd',
              text: "Seek independent investment advice and beneficiary input",
              impact: { score: 3, consequences: "Thorough and consultative approach.", legal: "Demonstrates proper care and considers beneficiary interests." }
            }
          ]
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
        characters: [
          {
            name: "Major Investor Group",
            role: "Largest Unit Holders (40% stake)",
            background: "Institutional investors focused on regular income returns",
            motivation: "Wants consistent distributions and questions major expenditure"
          },
          {
            name: "Small Investor Collective",
            role: "Multiple Small Unit Holders (35% combined)",
            background: "Retail investors, often retirees dependent on distributions",
            motivation: "Needs regular income but concerned about building safety"
          },
          {
            name: "Property Manager",
            role: "Professional Building Manager",
            background: "Experienced property professional recommending repairs",
            motivation: "Wants to maintain building value and tenant satisfaction"
          }
        ]
      },
      steps: [
        {
          id: 1,
          situation: "Structural engineers recommend immediate $800,000 repairs to address concrete deterioration. Delaying could risk tenant safety and building value. This will require suspending distributions for two quarters.",
          question: "How do you handle the major repair decision?",
          options: [
            {
              id: 'a',
              text: "Proceed immediately with repairs and suspend distributions",
              impact: { score: 3, consequences: "Protects building value and tenant safety.", legal: "Proper exercise of duty of care for trust assets." }
            },
            {
              id: 'b',
              text: "Delay repairs to maintain distributions this quarter",
              impact: { score: 1, consequences: "Maintains income but risks safety and building value.", legal: "Potentially breaches duty of care if safety risks exist." }
            },
            {
              id: 'c',
              text: "Seek additional engineering opinions before deciding",
              impact: { score: 2, consequences: "Thorough approach but may delay necessary work.", legal: "Due diligence is good, but must not delay essential safety work." }
            },
            {
              id: 'd',
              text: "Consult unit holders before making final decision",
              impact: { score: 3, consequences: "Inclusive approach builds stakeholder support.", legal: "Good governance, but ultimate decision remains with trustee." }
            }
          ]
        },
        {
          id: 2,
          situation: "Major Investor Group threatens to call an extraordinary meeting to remove you as trustee if distributions are suspended. They claim you are being overly cautious about repairs.",
          question: "How do you respond to this pressure from major unit holders?",
          options: [
            {
              id: 'a',
              text: "Cave to pressure and restore distributions",
              impact: { score: 1, consequences: "Appeases investors but compromises building safety.", legal: "Potential breach of duty if safety requires repairs." }
            },
            {
              id: 'b',
              text: "Stand firm and explain fiduciary duties to preserve trust assets",
              impact: { score: 3, consequences: "Maintains professional integrity and proper governance.", legal: "Correct application of fiduciary duties despite unit holder pressure." }
            },
            {
              id: 'c',
              text: "Offer compromise with reduced distributions and staged repairs",
              impact: { score: 2, consequences: "May satisfy some concerns but could compromise repair quality.", legal: "Acceptable if staged approach doesn't compromise safety." }
            },
            {
              id: 'd',
              text: "Provide detailed engineering reports and cost-benefit analysis",
              impact: { score: 3, consequences: "Evidence-based approach supports decision-making.", legal: "Good disclosure of material information to unit holders." }
            }
          ]
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
          situation: "With repairs complete, the building's value has increased by $1.2 million due to modernisation. Several unit holders want to sell their units, others want to refinance against increased value to fund expansion.",
          question: "How do you handle post-repair opportunities and unit holder requests?",
          options: [
            {
              id: 'a',
              text: "Facilitate unit sales at updated valuations",
              impact: { score: 2, consequences: "Helps exiting unit holders but may affect trust dynamics.", legal: "Must ensure fair pricing and proper transfer procedures." }
            },
            {
              id: 'b',
              text: "Explore refinancing options for trust expansion",
              impact: { score: 2, consequences: "Could enhance returns but increases financial risk.", legal: "Must consider risk tolerance and unit holder interests." }
            },
            {
              id: 'c',
              text: "Distribute enhanced returns from increased rental yields",
              impact: { score: 3, consequences: "Rewards unit holders for patience during repairs.", legal: "Good outcome demonstrating successful asset management." }
            },
            {
              id: 'd',
              text: "Establish reserve fund for future maintenance from increased value",
              impact: { score: 3, consequences: "Prudent long-term planning prevents future disruptions.", legal: "Excellent application of prudent trustee management." }
            }
          ]
        }
      ]
    },
    charitable_trust: {
      title: "Charitable Trust Governance Challenge",
      description: "You manage a charitable trust with conflicting stakeholder expectations about fund allocation.",
      jurisdiction: "qld2025", 
      trusteeType: "individual",
      scenario: {
        background: "You are the trustee of the Community Health Foundation ($5 million), established to 'advance health and medical research in Queensland'. Grant applications exceed available funds, and stakeholders have different priorities.",
        characters: [
          {
            name: "Medical Research Institute",
            role: "Major Grant Applicant",
            background: "Prestigious research institution seeking $2 million for cancer research",
            motivation: "Wants substantial funding for high-impact medical research"
          },
          {
            name: "Community Health Groups", 
            role: "Multiple Small Organisations",
            background: "Various local health services seeking smaller grants",
            motivation: "Want practical, immediate health improvements in local communities"
          },
          {
            name: "Donor Family Representatives",
            role: "Original Donor's Children",
            background: "Family of deceased benefactor who established the trust",
            motivation: "Want to honour father's vision and maintain family legacy"
          }
        ]
      },
      steps: [
        {
          id: 1,
          situation: "The Medical Research Institute applies for $2 million (40% of total funds) for a cutting-edge cancer research project. The research could benefit thousands, but would consume most available funds for two years.",
          question: "How do you evaluate this large grant application?",
          options: [
            {
              id: 'a',
              text: "Approve the full $2 million for high-impact research",
              impact: { score: 2, consequences: "Potentially transformative research, but limits other grants.", legal: "Fits charitable purposes, but may not provide balanced community benefit." }
            },
            {
              id: 'b',
              text: "Offer partial funding of $500,000 to allow other grants",
              impact: { score: 3, consequences: "Balanced approach supporting multiple causes.", legal: "Good exercise of discretion considering broad charitable purposes." }
            },
            {
              id: 'c',
              text: "Decline to maintain funds for smaller community grants",
              impact: { score: 2, consequences: "Preserves resources for community health, but misses major opportunity.", legal: "Defensible focus on community-level health advancement." }
            },
            {
              id: 'd',
              text: "Establish multi-year funding criteria and assessment process",
              impact: { score: 3, consequences: "Creates systematic approach for future decisions.", legal: "Excellent governance demonstrating proper consideration of charitable objects." }
            }
          ]
        },
        {
          id: 2,
          situation: "Community health groups argue that large research grants don't help people immediately, while medical researchers claim basic community services aren't advancing health knowledge. The donor's family is divided on which approach their father would have preferred.",
          question: "How do you balance immediate community needs vs. long-term research investment?",
          options: [
            {
              id: 'a',
              text: "Focus primarily on immediate community health needs",
              impact: { score: 2, consequences: "Direct community benefit but limited long-term impact.", legal: "Supports health advancement, but may be too narrow interpretation." }
            },
            {
              id: 'b',
              text: "Prioritise medical research for long-term benefits",
              impact: { score: 2, consequences: "Investment in future health advances, but limited immediate impact.", legal: "Supports advancement of medical knowledge within charitable purposes." }
            },
            {
              id: 'c',
              text: "Develop balanced allocation strategy (60% community, 40% research)",
              impact: { score: 3, consequences: "Addresses both immediate and long-term health advancement.", legal: "Well-balanced interpretation of 'advancing health' in charitable objects." }
            },
            {
              id: 'd',
              text: "Consult independent health policy experts for guidance",
              impact: { score: 3, consequences: "Evidence-based approach to complex allocation decisions.", legal: "Demonstrates proper care in exercising charitable trustee discretion." }
            }
          ]
        },
        {
          id: 3,
          situation: "A whistleblower reveals that one community organisation receiving grants has been misusing funds for administrative expenses rather than health programs. This affects 15% of your grants over two years.",
          question: "How do you handle the grant misuse discovery?",
          options: [
            {
              id: 'a',
              text: "Immediately suspend all grants to investigate",
              impact: { score: 2, consequences: "Protects trust assets but disrupts legitimate programs.", legal: "Prudent protection of charitable funds, but may be overly broad." }
            },
            {
              id: 'b',
              text: "Recover misused funds and improve monitoring systems",
              impact: { score: 3, consequences: "Addresses specific problem and prevents recurrence.", legal: "Appropriate recovery action and improved due diligence." }
            },
            {
              id: 'c',
              text: "Report to relevant authorities and implement grant auditing",
              impact: { score: 3, consequences: "Ensures accountability and systematic oversight.", legal: "Proper reporting and enhanced governance for charitable funds." }
            },
            {
              id: 'd',
              text: "Cover up the issue to avoid damaging trust reputation",
              impact: { score: 1, consequences: "Preserves reputation but enables continued misuse.", legal: "Potential breach of fiduciary duties and charitable obligations." }
            }
          ]
        },
        {
          id: 4,
          situation: "The trust has performed well, and assets have grown to $6.5 million. Government funding cuts mean many worthy projects need support, but some beneficiaries suggest expanding the trust's purposes to include education and social services.",
          question: "How do you respond to suggestions to expand the trust's charitable purposes?",
          options: [
            {
              id: 'a',
              text: "Maintain strict focus on health and medical research only",
              impact: { score: 3, consequences: "Preserves trust objectives and donor intent.", legal: "Correct adherence to specific charitable purposes in trust deed." }
            },
            {
              id: 'b',
              text: "Expand purposes to include education related to health",
              impact: { score: 2, consequences: "Logical extension but may stray from original intent.", legal: "Requires court approval to vary charitable purposes." }
            },
            {
              id: 'c',
              text: "Seek court approval to broaden charitable objects",
              impact: { score: 2, consequences: "Systematic approach but complex and costly process.", legal: "Proper procedure for varying charitable trust purposes." }
            },
            {
              id: 'd',
              text: "Partner with other trusts to address broader community needs",
              impact: { score: 3, consequences: "Collaborative approach maintaining trust integrity.", legal: "Good solution preserving charitable objects while enabling broader impact." }
            }
          ]
        }
      ]
    }
  };

  const startCase = (caseId) => {
    setCurrentCase(caseId);
    setCurrentStep(0);
    setUserChoices([]);
    setTotalScore(0);
    setShowResults(false);
  };

  const makeChoice = (choice) => {
    const newChoices = [...userChoices, choice];
    setUserChoices(newChoices);
    setTotalScore(prev => prev + choice.impact.score);

    // Move to next step or show results
    const case_data = caseStudies[currentCase];
    if (currentStep < case_data.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setShowResults(true);
    }
  };

  const resetSimulation = () => {
    setCurrentCase(null);
    setCurrentStep(0);
    setUserChoices([]);
    setTotalScore(0);
    setShowResults(false);
  };

  const getPerformanceLevel = () => {
    const maxScore = userChoices.length * 3; // Maximum 3 points per choice
    const percentage = (totalScore / maxScore) * 100;
    
    if (percentage >= 85) return { level: 'Expert Trustee', color: 'text-green-600', description: 'Excellent decision-making and governance' };
    if (percentage >= 70) return { level: 'Competent Trustee', color: 'text-blue-600', description: 'Good understanding of trustee duties' };
    if (percentage >= 55) return { level: 'Developing Trustee', color: 'text-yellow-600', description: 'Some areas need improvement' };
    return { level: 'Novice Trustee', color: 'text-red-600', description: 'Significant learning required' };
  };

  if (!currentCase) {
    return (
      <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2 flex items-centre">
            <Play className="w-8 h-8 mr-3 text-green-600" />
            Trust Case Study Simulator
          </h1>
          <p className="text-gray-600">Practice trustee decision-making through realistic scenarios</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Object.entries(caseStudies).map(([caseId, caseData]) => (
            <div
              key={caseId}
              className="bg-gray-50 border rounded-lg p-6 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => startCase(caseId)}
            >
              <div className="flex items-centre justify-between mb-4">
                <div className="flex items-centre">
                  {caseId === 'family_trust' && <User className="w-6 h-6 text-blue-600 mr-2" />}
                  {caseId === 'commercial_trust' && <DollarSign className="w-6 h-6 text-purple-600 mr-2" />}
                  {caseId === 'charitable_trust' && <FileText className="w-6 h-6 text-green-600 mr-2" />}
                </div>
                <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                  {caseData.steps.length} decisions
                </span>
              </div>
              
              <h3 className="text-lg font-semibold mb-2">{caseData.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{caseData.description}</p>
              
              <div className="flex items-centre justify-between text-xs text-gray-500">
                <span>Trustee: {caseData.trusteeType}</span>
                <span>Law: {caseData.jurisdiction === 'qld2025' ? 'QLD 2025' : 'QLD 1973'}</span>
              </div>

              <button className="w-full mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 flex items-centre justify-centre">
                <Play className="w-4 h-4 mr-2" />
                Start Simulation
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">How the simulator works</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-medium text-blue-700 mb-2">Realistic scenarios</h4>
              <ul className="space-y-1">
                <li>• Face complex decisions trustees encounter in practice</li>
                <li>• Navigate competing stakeholder interests and legal obligations</li>
                <li>• Experience consequences of different decision-making approaches</li>
                <li>• Learn from detailed feedback on each choice</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-purple-700 mb-2">Learning outcomes</h4>
              <ul className="space-y-1">
                <li>• Understand trustee duties in different contexts</li>
                <li>• Practice balancing competing interests and legal requirements</li>
                <li>• Develop practical governance and decision-making skills</li>
                <li>• Gain confidence in trustee responsibilities</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const case_data = caseStudies[currentCase];
  const current_step = case_data.steps[currentStep];

  if (showResults) {
    const performance = getPerformanceLevel();
    
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-centre mb-6">
          <h1 className="text-3xl font-bold mb-2">Simulation Complete</h1>
          <p className="text-gray-600">{case_data.title}</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <div className="text-centre mb-4">
            <div className={`text-3xl font-bold mb-2 ${performance.color}`}>
              {totalScore}/{userChoices.length * 3}
            </div>
            <div className={`text-xl font-semibold ${performance.color}`}>
              {performance.level}
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {performance.description}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Your decisions review</h3>
          
          {userChoices.map((choice, index) => {
            const step = case_data.steps[index];
            return (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-medium mb-2">Step {index + 1}: {step.question}</h4>
                    <p className="text-sm text-gray-600 mb-2">{step.situation}</p>
                  </div>
                  <div className="flex items-centre ml-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      choice.impact.score === 3 ? 'bg-green-100 text-green-800' :
                      choice.impact.score === 2 ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {choice.impact.score}/3 points
                    </span>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-3 rounded mb-3">
                  <div className="font-medium text-blue-800 mb-1">Your choice:</div>
                  <div className="text-sm text-blue-700">{choice.text}</div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <div className="font-medium text-gray-700 mb-1">Consequences:</div>
                    <div className="text-gray-600">{choice.impact.consequences}</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-700 mb-1">Legal analysis:</div>
                    <div className="text-gray-600">{choice.impact.legal}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Key learning points</h3>
          <div className="space-y-2 text-sm">
            {performance.level === 'Expert Trustee' && (
              <>
                <p>• Excellent demonstration of trustee governance principles</p>
                <p>• Strong understanding of fiduciary duties and stakeholder management</p>
                <p>• Consider mentoring others or taking on complex trustee roles</p>
              </>
            )}
            {performance.level === 'Competent Trustee' && (
              <>
                <p>• Good grasp of fundamental trustee duties and decision-making</p>
                <p>• Some areas for refinement in stakeholder communication or risk management</p>
                <p>• Continue developing expertise through continuing education</p>
              </>
            )}
            {performance.level === 'Developing Trustee' && (
              <>
                <p>• Basic understanding present but inconsistent application</p>
                <p>• Focus on understanding fiduciary duties and proper process</p>
                <p>• Consider additional training before taking on complex trustee roles</p>
              </>
            )}
            {performance.level === 'Novice Trustee' && (
              <>
                <p>• Fundamental trustee concepts need strengthening</p>
                <p>• Review basic fiduciary duties and governance principles</p>
                <p>• Seek mentorship or formal training before trustee responsibilities</p>
              </>
            )}
          </div>
        </div>

        <div className="flex justify-centre space-x-4 mt-6">
          <button
            onClick={resetSimulation}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Try Another Case
          </button>
          <button
            onClick={() => startCase(currentCase)}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Retry This Case
          </button>
        </div>

        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-800">
              <strong>Learning tool:</strong> This simulator provides educational scenarios for learning trustee decision-making. Real-world situations involve additional complexities and should always involve professional legal advice.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-centre justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">{case_data.title}</h1>
          <p className="text-gray-600">Step {currentStep + 1} of {case_data.steps.length}</p>
        </div>
        <button
          onClick={resetSimulation}
          className="flex items-centre px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </button>
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-green-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / case_data.steps.length) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>Progress</span>
          <span>{currentStep + 1}/{case_data.steps.length}</span>
        </div>
      </div>

      {/* Scenario context */}
      {currentStep === 0 && (
        <div className="bg-blue-50 p-6 rounded-lg mb-6">
          <h3 className="font-semibold mb-2">Scenario background</h3>
          <p className="text-sm mb-4">{case_data.scenario.background}</p>
          
          <h4 className="font-medium mb-2">Key stakeholders:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            {case_data.scenario.characters.map((character, index) => (
              <div key={index} className="bg-white p-3 rounded border">
                <div className="font-medium">{character.name}</div>
                <div className="text-xs text-gray-600 mb-1">{character.role}</div>
                <div className="text-xs">{character.motivation}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Current situation */}
      <div className="bg-white border rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold mb-3">Current situation</h3>
        <p className="text-gray-700 mb-4">{current_step.situation}</p>
        
        <h4 className="font-medium mb-3">{current_step.question}</h4>
        
        <div className="space-y-3">
          {current_step.options.map((option, index) => (
            <button
              key={option.id}
              onClick={() => makeChoice(option)}
              className="w-full p-4 text-left border rounded-lg hover:bg-gray-50 hover:border-blue-500 transition-all"
            >
              <div className="flex items-start">
                <span className="w-6 h-6 rounded-full border-2 border-gray-300 mr-3 mt-0.5 flex items-centre justify-centre text-sm font-medium">
                  {String.fromCharCode(65 + index)}
                </span>
                <div className="flex-1">
                  <div className="font-medium mb-1">{option.text}</div>
                  <div className="text-xs text-gray-500">
                    Click to see consequences and continue
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 mt-1" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Score indicator */}
      <div className="text-centre text-sm text-gray-600">
        Current score: <span className="font-medium">{totalScore}</span> points
      </div>
    </div>
  );
};

export default CaseStudySimulator;
