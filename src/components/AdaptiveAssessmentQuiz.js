// src/components/AdaptiveAssessmentQuiz.js
import { useState, useEffect } from 'react';
import { Brain, CheckCircle, XCircle, ArrowRight, ArrowLeft, Trophy, Target, BookOpen, AlertTriangle } from 'lucide-react';

const AdaptiveAssessmentQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [difficulty, setDifficulty] = useState('intermediate');
  const [showResults, setShowResults] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [quizComplete, setQuizComplete] = useState(false);

  const questions = {
    basic: [
      {
        id: 'basic_1',
        question: 'Under the *Trusts Act 2025* (Qld), which of the following duties is non-excludable?',
        options: [
          'Duty to act impartially amongst beneficiaries',
          'Duty to invest prudently', 
          'Duty to act honestly and in good faith',
          'Duty to personally perform trust functions'
        ],
        correct: 2,
        explanation: 'Section 64 of the *Trusts Act 2025* (Qld) establishes the duty to act honestly and in good faith as a non-excludable core duty. Unlike traditional duties that can be modified by trust deeds, this duty cannot be excluded or limited.',
        area: 'Statutory duties',
        difficulty: 'basic',
        citation: '*Trusts Act 2025* (Qld) s 64.'
      },
      {
        id: 'basic_2', 
        question: 'What is the minimum period for which trust records must be kept under Queensland\'s modernised trust law?',
        options: [
          'One year',
          'Two years',
          'Three years', 
          'Seven years'
        ],
        correct: 2,
        explanation: 'Section 69 of the *Trusts Act 2025* (Qld) requires trustees to maintain trust records for a minimum period of three years. This represents a significant enhancement from the previous regime.',
        area: 'Record keeping',
        difficulty: 'basic',
        citation: '*Trusts Act 2025* (Qld) s 69.'
      },
      {
        id: 'basic_3',
        question: 'Which standard of care applies to professional trustees under the *Trusts Act 2025* (Qld)?',
        options: [
          'Ordinary prudent person standard',
          'Enhanced professional standard equivalent to a prudent person in the trustee profession',
          'Absolute liability standard',
          'Business judgement rule standard'
        ],
        correct: 1,
        explanation: 'Section 65 establishes that professional trustees must exercise the care, diligence and skill that a prudent person engaged in the profession of trustee would exercise. This is higher than the standard applied to individual trustees under section 67.',
        area: 'Duty of care',
        difficulty: 'basic',
        citation: '*Trusts Act 2025* (Qld) s 65.'
      }
    ],
    intermediate: [
      {
        id: 'inter_1',
        question: 'A discretionary trust deed excludes the trustee\'s duty to provide information to beneficiaries. Under the *Trusts Act 2025* (Qld), this exclusion is:',
        options: [
          'Valid and enforceable as trust deeds override statute',
          'Invalid because the information disclosure duty is non-excludable', 
          'Valid but subject to court discretion',
          'Invalid unless all beneficiaries consent'
        ],
        correct: 1,
        explanation: 'Section 70 establishes a non-excludable statutory right for beneficiaries to obtain trust information and accounts. This cannot be excluded by the trust deed, representing a significant shift from the *Trusts Act 1973* (Qld) regime.',
        area: 'Information disclosure',
        difficulty: 'intermediate',
        citation: '*Trusts Act 2025* (Qld) s 70.'
      },
      {
        id: 'inter_2',
        question: 'Under the enhanced delegation powers in the *Trusts Act 2025* (Qld), a trustee may delegate investment decisions provided that:',
        options: [
          'The delegate has appropriate qualifications and the trustee maintains supervision',
          'All beneficiaries consent to the delegation',
          'The delegation is temporary and for less than 12 months',
          'The trustee remains jointly liable for all investment decisions'
        ],
        correct: 0,
        explanation: 'Sections 72-73 provide enhanced delegation powers allowing trustees to delegate investment and other functions, provided the delegate is appropriately qualified and the trustee maintains adequate supervision and oversight.',
        area: 'Delegation powers',
        difficulty: 'intermediate', 
        citation: '*Trusts Act 2025* (Qld) ss 72-73.'
      },
      {
        id: 'inter_3',
        question: 'A corporate trustee purchases trust property for its parent company at market value after obtaining an independent valuation. The transaction is most likely:',
        options: [
          'Valid due to independent valuation and market price',
          'Voidable unless all beneficiaries consent in writing',
          'Automatically void as self-dealing',
          'Valid if disclosed in annual trust accounts'
        ],
        correct: 1,
        explanation: 'Despite the market valuation, this remains a self-dealing transaction creating a conflict of interest. The strict rule against self-dealing requires beneficiary consent or court approval, not merely independent valuation.',
        area: 'Conflict of interest',
        difficulty: 'intermediate',
        citation: 'See generally Boardman v Phipps [1967] 2 AC 46; *Trusts Act 2025* (Qld) s 64.'
      }
    ],
    advanced: [
      {
        id: 'adv_1',
        question: 'In *Re Beloved Wilkes\' Charity* principle terms, how does the "all powers of absolute owner" framework in section 71 of the *Trusts Act 2025* (Qld) differ from the traditional enumerated powers approach?',
        options: [
          'It requires specific statutory authorisation for each power exercised',
          'It provides a general power subject to specific exclusions and fiduciary constraints',
          'It eliminates all restrictions on trustee decision-making',
          'It applies only to professional trustees with enhanced qualifications'
        ],
        correct: 1,
        explanation: 'Section 71 represents a fundamental shift from restrictive enumerated powers to a general "all powers of absolute owner" framework, subject to the terms of the trust and fiduciary constraints. This modernises the approach established in cases like *Re Beloved Wilkes\' Charity*.',
        area: 'Trustee powers',
        difficulty: 'advanced',
        citation: '*Trusts Act 2025* (Qld) s 71; Re Beloved Wilkes\' Charity (1851) 3 Mac & G 440.'
      },
      {
        id: 'adv_2',
        question: 'A professional trustee makes an investment loss following detailed analysis and independent advice. Under section 160 relief provisions, the court\'s discretion to excuse the trustee depends primarily on whether:',
        options: [
          'The investment was within the trustee\'s express powers',
          'The trustee acted honestly and reasonably in the circumstances',
          'The beneficiaries suffered no actual loss',
          'The trustee obtained insurance coverage for the investment'
        ],
        correct: 1,
        explanation: 'Section 160 provides court discretion to relieve trustees from liability where they have "acted honestly and reasonably" and "ought fairly to be excused". This adopts the test from *Re Pauling\'s Settlement Trusts*, focusing on the trustee\'s conduct rather than the outcome.',
        area: 'Judicial relief',
        difficulty: 'advanced',
        citation: '*Trusts Act 2025* (Qld) s 160; Re Pauling\'s Settlement Trusts [1964] Ch 303.'
      },
      {
        id: 'adv_3',
        question: 'The interaction between section 64 non-excludable duties and the rule in *Armitage v Nurse* under Queensland\'s modernised framework means that:',
        options: [
          'Trust deeds can still exclude liability for gross negligence',
          'The *Armitage v Nurse* principle is completely overruled by statute',
          'Core fiduciary duties cannot be excluded regardless of trust deed provisions',
          'Professional trustees remain subject to *Armitage v Nurse* exclusions'
        ],
        correct: 2,
        explanation: 'Section 64 establishes non-excludable core duties that cannot be limited by trust deed provisions, effectively preventing the type of broad exclusions permitted under *Armitage v Nurse*. This represents a legislative response to concerns about erosion of fundamental fiduciary obligations.',
        area: 'Exclusion clauses',
        difficulty: 'advanced',
        citation: '*Trusts Act 2025* (Qld) s 64; Armitage v Nurse [1998] Ch 241.'
      }
    ]
  };

  const getAllQuestions = () => {
    return [...questions.basic, ...questions.intermediate, ...questions.advanced];
  };

  const getQuestionsByDifficulty = (diff) => {
    return questions[diff] || [];
  };

  const getCurrentQuestionData = () => {
    const currentDifficultyQuestions = getQuestionsByDifficulty(difficulty);
    return currentDifficultyQuestions[currentQuestion] || null;
  };

  const handleAnswer = (selectedOption) => {
    const questionData = getCurrentQuestionData();
    if (!questionData) return;

    const isCorrect = selectedOption === questionData.correct;
    const newAnswers = {
      ...answers,
      [questionData.id]: {
        selected: selectedOption,
        correct: isCorrect,
        questionData
      }
    };
    
    setAnswers(newAnswers);

    // Update score
    if (isCorrect) {
      const points = questionData.difficulty === 'advanced' ? 3 : 
                    questionData.difficulty === 'intermediate' ? 2 : 1;
      setScore(prev => prev + points);
    }

    // Show feedback
    setFeedback({
      isCorrect,
      explanation: questionData.explanation,
      citation: questionData.citation,
      correctAnswer: questionData.options[questionData.correct]
    });

    // Adaptive difficulty adjustment
    adjustDifficulty(isCorrect, questionData.difficulty);
  };

  const adjustDifficulty = (isCorrect, currentDiff) => {
    // Simple adaptive logic - could be more sophisticated
    if (isCorrect && currentDiff === 'basic') {
      setDifficulty('intermediate');
    } else if (isCorrect && currentDiff === 'intermediate') {
      setDifficulty('advanced');  
    } else if (!isCorrect && currentDiff === 'advanced') {
      setDifficulty('intermediate');
    } else if (!isCorrect && currentDiff === 'intermediate') {
      setDifficulty('basic');
    }
  };

  const nextQuestion = () => {
    // Allow the quiz to continue indefinitely by looping back to question 0
    // but only if the total questions attempted is less than a certain threshold
    const currentDifficultyQuestions = getQuestionsByDifficulty(difficulty);
    if (currentQuestion < currentDifficultyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setFeedback(null);
    } else {
      // If we've exhausted questions in the current difficulty,
      // reset currentQuestion to 0 for that difficulty.
      setCurrentQuestion(0); // Loop back to the start of the current difficulty's questions
      setFeedback(null);

      // We might want to end the quiz after a certain number of questions are answered overall,
      // or after cycling through all difficulties a few times.
      const totalAnswered = Object.keys(answers).length;
      if (totalAnswered >= 15 && difficulty === 'advanced') { // Example: end after 15 questions if in advanced difficulty
        setQuizComplete(true);
        setShowResults(true);
      }
    }
  };

  const previousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
      setFeedback(null);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setScore(0);
    setDifficulty('intermediate');
    setShowResults(false);
    setFeedback(null);
    setQuizComplete(false);
  };

  const getScorePercentage = () => {
    const maxScore = getAllQuestions().reduce((total, q) => {
      const points = q.difficulty === 'advanced' ? 3 : 
                    q.difficulty === 'intermediate' ? 2 : 1;
      return total + points;
    }, 0);
    return Math.round((score / maxScore) * 100);
  };

  const getPerformanceLevel = () => {
    // Avoid division by zero if no questions attempted yet
    const totalAnswered = Object.keys(answers).length;
    if (totalAnswered === 0) {
      return { level: 'Start the Quiz!', color: 'text-gray-600', icon: <Brain className="w-6 h-6" /> };
    }
    
    const percentage = getScorePercentage();
    if (percentage >= 80) return { level: 'Excellent', color: 'text-green-600', icon: <Trophy className="w-6 h-6" /> };
    if (percentage >= 70) return { level: 'Good', color: 'text-blue-600', icon: <Target className="w-6 h-6" /> };
    if (percentage >= 60) return { level: 'Satisfactory', color: 'text-yellow-600', icon: <BookOpen className="w-6 h-6" /> };
    return { level: 'Needs Improvement', color: 'text-red-600', icon: <AlertTriangle className="w-6 h-6" /> };
  };

  const questionData = getCurrentQuestionData();
  const allQuestions = getAllQuestions();
  const hasAnswered = questionData && answers[questionData.id];

  if (showResults) {
    const performance = getPerformanceLevel();
    const answeredQuestions = Object.values(answers);
    const correctAnswers = answeredQuestions.filter(a => a.correct).length;

    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold mb-2 flex items-center justify-center">
            <Trophy className="w-8 h-8 mr-3 text-yellow-600" />
            Quiz Results
          </h1>
          <p className="text-gray-600">Your adaptive assessment is complete</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <div className="text-center mb-4">
            <div className={`text-4xl font-bold mb-2 ${performance.color}`}>
              {getScorePercentage()}%
            </div>
            <div className={`flex items-center justify-center ${performance.color}`}>
              {performance.icon}
              <span className="ml-2 text-xl font-semibold">{performance.level}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="bg-white p-4 rounded border">
              <div className="text-2xl font-bold text-blue-600">{correctAnswers}</div>
              <div className="text-sm text-gray-600">Correct answers</div>
            </div>
            <div className="bg-white p-4 rounded border">
              <div className="text-2xl font-bold text-purple-600">{score}</div>
              <div className="text-sm text-gray-600">Total points</div>
            </div>
            <div className="bg-white p-4 rounded border">
              <div className="text-2xl font-bold text-green-600">{answeredQuestions.length}</div>
              <div className="text-sm text-gray-600">Questions completed</div>
            </div>
          </div>
        </div>

        {/* Review individual answers */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Review your answers</h3>
          <div className="space-y-4 max-h-96 overflow-y-auto">
            {Object.values(answers).map((answer, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="font-medium" dangerouslySetInnerHTML={{ __html: answer.questionData.question }}></div>
                    <div className="text-sm text-gray-600 mt-1">
                      Topic: {answer.questionData.area} | Difficulty: {answer.questionData.difficulty}
                    </div>
                  </div>
                  {answer.correct ? (
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                  )}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Your answer:</span> {answer.questionData.options[answer.selected]}
                </div>
                {!answer.correct && (
                  <div className="text-sm text-green-700 mt-1">
                    <span className="font-medium">Correct answer:</span> {answer.questionData.options[answer.questionData.correct]}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Performance by area</h3>
          <div className="space-y-3">
            {['Statutory duties', 'Record keeping', 'Duty of care', 'Information disclosure', 'Delegation powers', 'Conflict of interest', 'Trustee powers', 'Judicial relief', 'Exclusion clauses'].map(area => {
              const areaQuestions = answeredQuestions.filter(a => a.questionData.area === area);
              const areaCorrect = areaQuestions.filter(a => a.correct).length;
              const areaTotal = areaQuestions.length;
              
              if (areaTotal === 0) return null;
              
              const areaPercentage = Math.round((areaCorrect / areaTotal) * 100);
              
              return (
                <div key={area} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <span className="font-medium">{area}</span>
                  <div className="flex items-center">
                    <span className="text-sm text-gray-600 mr-3">{areaCorrect}/{areaTotal}</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${areaPercentage}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm font-medium w-12">{areaPercentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Performance by area */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-4">Performance by area</h3>
          <div className="space-y-3">
            {['Statutory duties', 'Record keeping', 'Duty of care', 'Information disclosure', 'Delegation powers', 'Conflict of interest', 'Trustee powers', 'Judicial relief', 'Exclusion clauses'].map(area => {
              const areaQuestions = answeredQuestions.filter(a => a.questionData.area === area);
              const areaCorrect = areaQuestions.filter(a => a.correct).length;
              const areaTotal = areaQuestions.length;
              
              if (areaTotal === 0) return null;
              
              const areaPercentage = Math.round((areaCorrect / areaTotal) * 100);
              
              return (
                <div key={area} className="flex items-centre justify-between p-3 bg-gray-50 rounded">
                  <span className="font-medium">{area}</span>
                  <div className="flex items-centre">
                    <span className="text-sm text-gray-600 mr-3">{areaCorrect}/{areaTotal}</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          areaPercentage >= 80 ? 'bg-green-500' :
                          areaPercentage >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${areaPercentage}%` }}
                      ></div>
                    </div>
                    <span className="ml-2 text-sm font-medium w-12">{areaPercentage}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mb-6 bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
            Study recommendations
          </h3>
          <div className="space-y-2 text-sm">
            {performance.level === 'Needs Improvement' && (
              <>
                <p>• Review fundamental trust concepts and the *Trusts Act 2025* (Qld) provisions</p>
                <p>• Focus on understanding non-excludable duties under sections 64-70</p>
                <p>• Study the differences between professional and individual trustee standards</p>
              </>
            )}
            {performance.level === 'Satisfactory' && (
              <>
                <p>• Strengthen understanding of advanced topics like judicial relief provisions</p>
                <p>• Review case law interactions with statutory reforms</p>
                <p>• Practice application of legal principles to complex scenarios</p>
              </>
            )}
            {(performance.level === 'Good' || performance.level === 'Excellent') && (
              <>
                <p>• Excellent work! Consider exploring comparative jurisdictional approaches</p>
                <p>• Review recent case law developments and academic commentary</p>
                <p>• Focus on practical application in professional trustee contexts</p>
              </>
            )}
          </div>
        </div>

        {/* Improvement recommendations */}
        <div className="mb-6 bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4 flex items-centre">
            <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
            Study recommendations
          </h3>
          <div className="space-y-2 text-sm">
            {performance.level === 'Needs Improvement' && (
              <>
                <p>• Review fundamental trust concepts and the *Trusts Act 2025* (Qld) provisions</p>
                <p>• Focus on understanding non-excludable duties under sections 64-70</p>
                <p>• Study the differences between professional and individual trustee standards</p>
              </>
            )}
            {performance.level === 'Satisfactory' && (
              <>
                <p>• Strengthen understanding of advanced topics like judicial relief provisions</p>
                <p>• Review case law interactions with statutory reforms</p>
                <p>• Practice application of legal principles to complex scenarios</p>
              </>
            )}
            {(performance.level === 'Good' || performance.level === 'Excellent') && (
              <>
                <p>• Excellent work! Consider exploring comparative jurisdictional approaches</p>
                <p>• Review recent case law developments and academic commentary</p>
                <p>• Focus on practical application in professional trustee contexts</p>
              </>
            )}
          </div>
        </div>
        <div className="text-center">
          <button
            onClick={resetQuiz}
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Take quiz again
          </button>
        </div>

        {/* Legal disclaimer */}
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
            <div className="text-sm text-yellow-800">
              <strong>Educational tool:</strong> This assessment provides general educational guidance about Queensland trust law. It should not be relied upon as legal advice. Professional legal advice should be sought for specific trust matters.
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2 flex items-center">
          <Brain className="w-8 h-8 mr-3 text-purple-600" />
          Adaptive Trust Law Assessment
        </h1>
        <p className="text-gray-600">Interactive quiz adapting to your knowledge level</p>
      </div>

      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">Progress</span>
          <span className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {getQuestionsByDifficulty(difficulty).length} ({difficulty})
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${((currentQuestion + 1) / getQuestionsByDifficulty(difficulty).length) * 100}%` }}
          ></div>
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <span>Current difficulty: <span className="font-medium capitalize">{difficulty}</span></span>
          <span>Score: <span className="font-medium">{score} points</span> | Total answered: {Object.keys(answers).length}</span>
        </div>
      </div>

      {questionData && (
        <div className="space-y-6">
          {/* Question */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-4">
              <span className={`px-3 py-1 rounded-full text-sm ${
                questionData.difficulty === 'advanced' ? 'bg-red-100 text-red-800' :
                questionData.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                'bg-green-100 text-green-800'
              }`}>
                {questionData.difficulty.charAt(0).toUpperCase() + questionData.difficulty.slice(1)}
              </span>
              <span className="text-sm text-gray-600">{questionData.area}</span>
            </div>
            <h2 className="text-xl font-semibold mb-4" dangerouslySetInnerHTML={{ __html: questionData.question }}></h2>
            
            <div className="space-y-3">
              {questionData.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !hasAnswered && handleAnswer(index)}
                  disabled={hasAnswered}
                  className={`w-full p-4 text-left border rounded-lg transition-all ${
                    hasAnswered
                      ? index === questionData.correct
                        ? 'border-green-500 bg-green-50 text-green-800'
                        : index === answers[questionData.id]?.selected
                        ? 'border-red-500 bg-red-50 text-red-800'
                        : 'border-gray-300 bg-gray-50 text-gray-600'
                      : 'border-gray-300 hover:border-purple-500 hover:bg-purple-50'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center text-sm font-medium">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                    {hasAnswered && index === questionData.correct && (
                      <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                    )}
                    {hasAnswered && index === answers[questionData.id]?.selected && index !== questionData.correct && (
                      <XCircle className="w-5 h-5 text-red-600 ml-auto" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Feedback */}
          {feedback && (
            <div className={`p-6 rounded-lg border-l-4 ${
              feedback.isCorrect ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'
            }`}>
              <div className="flex items-center mb-3">
                {feedback.isCorrect ? (
                  <CheckCircle className="w-6 h-6 text-green-600 mr-2" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600 mr-2" />
                )}
                <span className={`font-semibold ${
                  feedback.isCorrect ? 'text-green-800' : 'text-red-800'
                }`}>
                  {feedback.isCorrect ? 'Correct!' : 'Incorrect'}
                </span>
              </div>
              
              {!feedback.isCorrect && (
                <p className="text-red-800 mb-2">
                  <strong>Correct answer:</strong> {feedback.correctAnswer}
                </p>
              )}
              
              <p className="text-gray-700 mb-3">{feedback.explanation}</p>
              
              {feedback.citation && (
                <p className="text-sm text-gray-600 italic">
                  <strong>Citation:</strong> {feedback.citation}
                </p>
              )}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className="flex items-center px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </button>

            {hasAnswered && (
              <button
                onClick={nextQuestion}
                className="flex items-center px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                {/* Change button text for clarity when quiz might continue looping */}
                {Object.keys(answers).length < 15 ? 'Next Question' : 'Review Results / Next Section'}
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="mt-8 bg-blue-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">How the adaptive assessment works</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-medium text-blue-700 mb-2">Adaptive difficulty</h4>
            <ul className="space-y-1">
              <li>• Questions adapt based on your performance - answer correctly to unlock harder questions</li>
              <li>• Your streak affects difficulty adjustments (2+ correct moves up, 2+ wrong moves down)</li>
              <li>• Three difficulty levels: Basic (foundational), Intermediate (application), Advanced (complex analysis)</li>
              <li>• Quiz continues until you've attempted at least 15 questions, or you complete all questions in the advanced difficulty</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-purple-700 mb-2">Scoring system</h4>
            <ul className="space-y-1">
              <li>• Basic questions: 1 point each</li>
              <li>• Intermediate questions: 2 points each</li>
              <li>• Advanced questions: 3 points each</li>
              <li>• Detailed feedback with AGLC4 citations</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdaptiveAssessmentQuiz;
