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
          qld1973: { status: 'poor
