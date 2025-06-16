# Component Documentation

This directory contains the six main interactive educational tools.

## File Structure

- InteractiveDutyChecker.js - Duty analysis tool
- JurisdictionComparisonTool.js - Cross-jurisdiction comparison  
- CaseStudySimulator.js - Scenario-based learning
- AdaptiveAssessmentQuiz.js - Adaptive difficulty quiz
- PowerAuthorisationChecker.js - Authority determination
- BreachTrustAnalyser.js - Breach identification and analysis

## Component Dependencies

All components use:
- React Hooks (useState for state management)
- Lucide React (Icon library for UI elements)
- Tailwind CSS (Utility-first CSS framework via CDN)

## How to Use Components

Each component is self-contained and requires no props:

### InteractiveDutyChecker
Features:
- Scenario selection and analysis
- Queensland 2025 vs 1973 comparison
- Duty identification and breach assessment
- Severity indicators and recommendations

### JurisdictionComparisonTool
Features:
- Multi-jurisdiction selection
- Category-based comparison (powers, duties, protections)
- Interactive comparison tables
- Detailed explanations with legal citations

### CaseStudySimulator
Features:
- Multiple branching case studies
- Decision consequence analysis
- Performance scoring system
- Detailed feedback and learning points

### AdaptiveAssessmentQuiz
Features:
- Three difficulty levels (basic, intermediate, advanced)
- Adaptive difficulty adjustment
- Performance tracking
- Comprehensive result analysis

### PowerAuthorisationChecker
Features:
- Action authorisation analysis
- Legal source identification
- Risk and condition assessment
- Practical recommendations

### BreachTrustAnalyser
Features:
- Breach type classification
- Liability risk assessment
- Defence identification
- Remedy analysis

## Styling

Components use Tailwind CSS utility classes for consistent styling:
- Blue primary color scheme with semantic colors for status
- Responsive grid and flexbox layouts
- Consistent heading hierarchy
- Hover states and transitions
- Color-coded success/warning/error states

## State Management

Each component manages its own state using React's useState hook.
No external state management (Redux, Context) required.

## Responsiveness

All components are fully responsive:
- Mobile: Single-column layouts, touch-friendly buttons
- Tablet: Optimised grid layouts  
- Desktop: Full multi-column layouts with sidebar navigation

## Educational Integration

Components can be embedded in Learning Management Systems:
1. Build the React app
2. Extract individual component HTML
3. Embed in LMS content areas
4. Ensure Tailwind CSS is loaded

Each component works independently and can be used in isolation.

## Common Issues

**Styling Not Loading:**
Ensure Tailwind CSS is properly loaded via CDN link in public/index.html

**Icons Not Displaying:**
Check Lucide React installation: npm install lucide-react

**Performance Issues:**
Components are optimised but for large datasets consider:
- Pagination for large comparison tables
- Lazy loading for complex analysis
- Debounced input for real-time search

---

For technical support, please raise an issue in the main repository.
