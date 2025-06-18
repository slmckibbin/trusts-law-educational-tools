// src/components/CaseStudySimulator.js
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
          situation: "With repairs complete, the building's value has increased by 
