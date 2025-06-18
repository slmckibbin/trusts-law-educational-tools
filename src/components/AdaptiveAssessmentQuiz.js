// src/Components/AdaptiveAssessmentQuiz.js

import { useState, useEffect } from 'react';
import { Brain, Target, TrendingUp, Award, RotateCcw, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

const AdaptiveAssessmentQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState();
  const = useState(0);
  const = useState('basic'); // basic, intermediate, advanced
  const [quizComplete, setQuizComplete] = useState(false);
  const = useState(null);
  const = useState(false);
  const = useState({
    correct: 0,
    total: 0,
    streak: 0,
    topics: {}
  });

  const questionBank = {
    basic:,
        explanation: "The right of indemnification and reimbursement is the most crucial protection, allowing trustees to recover properly incurred expenses from trust assets.",
        difficulty: 'basic',
        qld2025Note: "Section 155 strengthens this right in *Trusts Act 2025* (Qld)." 
      },
      {
        id: 'b2',
        topic: 'Trust Types',
        question: "In a discretionary trust, what does 'discretionary' refer to?",
        options:,
        explanation: "Discretionary trusts give trustees discretion over which beneficiaries receive distributions and how much they receive.",
        difficulty: 'basic'
      },
      {
        id: 'b3',
        topic: 'Duties',
        question: "Which is NOT a traditional trustee duty?",
        options: [
          { text: "Follow trust terms exactly", correct: false },
          { text: "Act impartially among beneficiaries", correct: false },
          { text: "Guarantee investment returns", correct: true },
          { text: "Keep proper accounts", correct: false }
        ],
        explanation: "Trustees cannot guarantee investment returns – they must invest prudently but are not liable for market losses if acting properly.", 
        difficulty: 'basic'
      },
      {
        id: 'b4',
        topic: 'Queensland 2025',
        question: "What is the main innovation of Queensland <em>Trusts Act 2025</em> (Qld)?", 
        options: [
          { text: "Allows unlimited fees", correct: false },
          { text: "Eliminates all trustee duties", correct: false },
          { text: "Creates non-excludable core duties", correct: true },
          { text: "Permits gambling with trust funds", correct: false }
        ],
        explanation: "The *Trusts Act 2025* (Qld) introduces core duties that cannot be excluded by trust deeds, providing minimum beneficiary protection.", 
        difficulty: 'basic',
        qld2025Note: "Sections 64–70 establish these non-excludable duties including honesty, care, records, and information disclosure." 
      }
    ],
    intermediate:
        options: [
          { text: "No difference in standards", correct: false },
          { text: "Professional trustees must exercise care equivalent to their profession", correct: true },
          { text: "Professional trustees have unlimited immunity", correct: false },
          { text: "Only professional trustees can charge fees", correct: false }
        ],
        explanation: "Section 65 requires professional trustees to meet the standard of care expected in their profession, business, or employment.",
        difficulty: 'intermediate',
        qld2025Note: "This creates a tiered system: professional (Section 65), knowledgeable (Section 66), and ordinary (Section 67) trustees."
      },
      {
        id: 'i2',
        topic: 'Information Rights',
        question: "Under *Schmidt v Rosewood Trust Ltd*, what determines beneficiary information rights?", 
        options: [
          { text: "Only fixed beneficial interests give information rights", correct: false },
          { text: "All beneficiaries have identical information rights", correct: false },
          { text: "Court discretion based on nature of interest and relevance", correct: true },
          { text: "Only trustees can decide what information to provide", correct: false }
        ],
        explanation: "*Schmidt* established that information rights depend on court discretion, considering the beneficiary’s interest and the relevance of information sought.", 
        difficulty: 'intermediate'
      },
      {
        id: 'i3',
        topic: 'Investment Powers',
        question: "What is the 'prudent person' test for trustee investments?",
        options:,
        explanation: "The prudent person test requires trustees to invest with the care, skill, and caution that a prudent person would exercise in similar circumstances.",
        difficulty: 'intermediate'
      },
      {
        id: 'i4',
        topic: 'Delegation',
        question: "Under Queensland <em>Trusts Act 2025</em> (Qld), what are the new delegation powers?", 
        options:,
        explanation: "Sections 72–73 allow delegation of investment and administrative functions (maximum 12 months) but trustees must maintain oversight.", 
        difficulty: 'intermediate',
        qld2025Note: "This represents a significant expansion from the restrictive approach in the *Trusts Act 1973* (Qld)." 
      }
    ],
    advanced:
        options: [
          { text: "Always when the trust incurs any debt", correct: false },
          { text: "Only when directors personally guarantee trust debts", correct: false },
          { text: "When trustee cannot pay debts and lacks full indemnity due to breach/limitation", correct: true },
          { text: "Never – directors are always protected", correct: false } 
        explanation: "Section 197 of the *Corporations Act 2001* (Cth) creates director liability when the corporate trustee cannot pay its debts and is not entitled to full indemnity due to breach of trust, acting outside powers, or deed limitations.", 
        difficulty: 'advanced'
      },
      {
        id: 'a2',
        topic: 'Complex Duties',
        question: "In discretionary trusts, what does the duty to act 'impartially' actually require?", 
        options: [
          { text: "Equal distributions to all beneficiaries", correct: false },
          { text: "Proper consideration of discretion without predetermined bias", correct: true },
          { text: "Consulting all beneficiaries before decisions", correct: false },
          { text: "Following beneficiaries' majority vote", correct: false }
        ],
        explanation: "For discretionary trusts, impartiality means giving real and genuine consideration to the exercise of discretion, not equal treatment.",
        difficulty: 'advanced'
      },
      {
        id: 'a3',
        topic: 'Judicial Oversight',
        question: "When will courts review trustees' discretionary decisions?",
        options: [
          { text: "Whenever beneficiaries request review", correct: false },
          { text: "Only for bad faith, improper considerations, or failure to exercise discretion", correct: true },
          { text: "For any decision beneficiaries consider unfair", correct: false },
          { text: "Courts cannot review discretionary decisions", correct: false }
        ],
        explanation: "Courts will only intervene in discretionary decisions for bad faith, taking improper considerations into account, or failure to genuinely exercise discretion.",
        difficulty: 'advanced'
      },
      {
        id: 'a4',
        topic: 'Queensland 2025 Implications',
        question: "How does the 'all powers of absolute owner' approach in <em>Trusts Act 2025</em> (Qld) change trustee liability?",
        options: [
          { text: "Eliminates all trustee liability", correct: false },
          { text: "Increases powers but maintains enhanced duty obligations", correct: true },
          { text: "Creates unlimited trustee discretion", correct: false },
          { text: "Only applies to professional trustees", correct: false }
        ],
        explanation: "While granting broader powers, the Act simultaneously imposes non-excludable duties, creating a balance of enhanced authority with mandatory responsibilities.",
        difficulty: 'advanced',
        qld2025Note: "This revolutionary approach moves from restrictive enumerated powers to general authority subject to strengthened duties."
      }
    ]
  };

  const getCurrentQuestions = () => {
    return questionBank[difficulty] |
| questionBank.basic;
  };

  const adaptDifficulty = (correct, currentDifficulty, streak) => {
    if (correct && streak >= 2 && currentDifficulty === 'basic') {
      return 'intermediate';
    }
    if (correct && streak >= 3 && currentDifficulty === 'intermediate') {
      return 'advanced';
    }
    if (!correct && streak <= -2 && currentDifficulty === 'advanced') {
      return 'intermediate';
    }
    if (!correct && streak <= -2 && currentDifficulty === 'intermediate') {
      return 'basic';
    }
    return currentDifficulty;
  };

  const handleAnswer = (optionIndex) => {
    setSelectedAnswer(optionIndex);
    setShowExplanation(true);

    const questions = getCurrentQuestions();
    const question = questions[currentQuestion];
    const isCorrect = question.options[optionIndex].correct;

    const newAnswer = {
      questionId: question.id,
      questionText: question.question,
      selectedOption: question.options[optionIndex].text,
      correct: isCorrect,
      explanation: question.explanation,
      topic: question.topic,
      difficulty: difficulty
    };

    setAnswers([...answers, newAnswer]);

    const newScore = isCorrect? score + 1 : score;
    setScore(newScore);

    const newStreak = isCorrect?
      (performanceTracker.streak >= 0? performanceTracker.streak + 1 : 1) :
      (performanceTracker.streak <= 0? performanceTracker.streak - 1 : -1);

    const updatedTracker = {
      correct: performanceTracker.correct + (isCorrect? 1 : 0),
      total: performanceTracker.total + 1,
      streak: newStreak,
      topics: {
       ...performanceTracker.topics,
        [question.topic]: {
          correct: (performanceTracker.topics[question.topic]?.correct |
| 0) + (isCorrect? 1 : 0),
          total: (performanceTracker.topics[question.topic]?.total |
| 0) + 1
        }
      }
    };

    setPerformanceTracker(updatedTracker);

    // Adapt difficulty for next question
    const newDifficulty = adaptDifficulty(isCorrect, difficulty, newStreak);
    if (newDifficulty!== difficulty) {
      setDifficulty(newDifficulty);
    }
  };

  const nextQuestion = () => {
    const questions = getCurrentQuestions();
    const currentDifficultyQuestions = questionBank[difficulty];
    if (currentQuestion < currentDifficultyQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setCurrentQuestion(0); // Loop back to the start of the current difficulty's questions
      setSelectedAnswer(null);
      setShowExplanation(false);

      if (performanceTracker.total >= 15 && difficulty === 'advanced') {
        setQuizComplete(true);
      }
    }
  };


  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers();
    setScore(0);
    setDifficulty('basic');
    setQuizComplete(false);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setPerformanceTracker({
      correct: 0,
      total: 0,
      streak: 0,
      topics: {}
    });
  };

  const getDifficultyColor = (diff) => {
    switch (diff) {
      case 'basic': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPerformanceLevel = () => {
    // Avoid division by zero if no questions attempted yet
    if (performanceTracker.total === 0) {
        return { level: 'Start the Quiz.', color: 'text-gray-600', icon: <Brain /> }; 
    }
    const percentage = (performanceTracker.correct / performanceTracker.total) * 100;
    if (percentage >= 90) return { level: 'Excellent', color: 'text-green-600', icon: <Award /> };
    if (percentage >= 75) return { level: 'Good', color: 'text-blue-600', icon: <Target /> };
    if (percentage >= 60) return { level: 'Satisfactory', color: 'text-yellow-600', icon: <TrendingUp /> };
    return { level: 'Needs Improvement', color: 'text-red-600', icon: <AlertCircle /> };
  };

  if (quizComplete) {
    const performance = getPerformanceLevel();

    return (
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center mb-4">
            {performance.icon}
            <h1 className="text-3xl font-bold ml-3">Quiz complete.</h1> 
          </div>
          <div className={`text-2xl font-semibold ${performance.color}`}>
            {performance.level}
          </div>
          <div className="text-gray-600 mt-2">
            Score: {performanceTracker.correct}/{performanceTracker.total} ({Math.round((performanceTracker.correct/performanceTracker.total)*100)}%)
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Performance by Topic</h3>
            <div className="space-y-3">
              {Object.entries(performanceTracker.topics).map(([topic, stats]) => (
                <div key={topic} className="flex items-center justify-between">
                  <span className="text-sm">{topic}</span>
                  <div className="flex items-center">
                    <span className="text-sm mr-2">{stats.correct}/{stats.total}</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          (stats.correct/stats.total) >= 0.8? 'bg-green-500' :
                          (stats.correct/stats.total) >= 0.6? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${(stats.correct/stats.total)*100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Adaptive learning summary</h3>
            <div className="space-y-2 text-sm">
              <div>Final Difficulty Level: <span className={`px-2 py-1 rounded ${getDifficultyColor(difficulty)}`}>{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</span></div>
              <div>Questions Attempted: {performanceTracker.total}</div>
              <div>Current Streak: {performanceTracker.streak > 0? `+${performanceTracker.streak}` : performanceTracker.streak}</div>
              <div>Adaptation Events: {answers.filter((a, i) => i > 0 && answers[i-1].difficulty!== a.difficulty).length}</div>
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold">Review your answers.</h3> 
          {answers.map((answer, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="font-medium" dangerouslySetInnerHTML={{ __html: answer.questionText }}></div> {/* Use dangerouslySetInnerHTML for <em> tags */}
                  <div className="text-sm text-gray-600 mt-1">
                    Topic: {answer.topic} | Difficulty: {answer.difficulty}
                  </div>
                </div>
                <div className={`flex items-center px-3 py-1 rounded-full text-sm ${
                  answer.correct? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {answer.correct? <CheckCircle className="w-4 h-4 mr-1" /> : <XCircle className="w-4 h-4 mr-1" />}
                  {answer.correct? 'Correct' : 'Incorrect'}
                </div>
              </div>
              <div className="text-sm">
                <span className="font-medium">Your answer:</span> {answer.selectedOption}
              </div>
              <div className="text-sm text-gray-600 mt-2">
                {answer.explanation}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={resetQuiz}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Take quiz again. 
          </button>
        </div>
      </div>
    );
  }

  const questions = getCurrentQuestions();
  const question = questions[currentQuestion];

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold flex items-center">
            <Brain className="w-8 h-8 mr-3 text-purple-600" />
            Adaptive Trusts Law Quiz
          </h1>
          <button
            onClick={resetQuiz}
            className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </button>
        </div>

        <div className="flex items-center space-x-4 text-sm mb-4">
          <span className="bg-blue-100 px-3 py-1 rounded-full">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="bg-green-100 px-3 py-1 rounded-full">
            Score: {performanceTracker.correct}/{performanceTracker.total}
          </span>
          <span className={`px-3 py-1 rounded-full ${getDifficultyColor(difficulty)}`}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Level
          </span>
          {performanceTracker.streak!== 0 && (
            <span className={`px-3 py-1 rounded-full ${
              performanceTracker.streak > 0? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              Streak: {performanceTracker.streak > 0? `+${performanceTracker.streak}` : performanceTracker.streak}
            </span>
          )}
        </div>

        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="bg-white border rounded-lg p-6">
        <div className="mb-4">
          <span className="text-sm text-purple-600 font-medium">{question.topic}</span>
          {/* Using dangerouslySetInnerHTML to render <em> tags */}
          <h3 className="text-xl font-semibold mt-2" dangerouslySetInnerHTML={{ __html: question.question }}></h3>
        </div>

        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              disabled={showExplanation}
              className={`w-full p-4 text-left border rounded-lg transition-colors ${
                showExplanation
                 ? option.correct
                   ? 'border-green-500 bg-green-50'
                    : selectedAnswer === index
                   ? 'border-red-500 bg-red-50'
                    : 'border-gray-300 bg-gray-50'
                  : 'border-gray-300 hover:border-blue-300 hover:bg-blue-50'
              } ${showExplanation? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center justify-between">
                <span>{option.text}</span>
                {showExplanation && (
                  <div className="flex items-center">
                    {option.correct? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : selectedAnswer === index? (
                      <XCircle className="w-5 h-5 text-red-600" />
                    ) : null}
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {showExplanation && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-blue-800 mb-2">Explanation:</h4>
            <p className="text-blue-700 text-sm">{question.explanation}</p>
            {question.qld2025Note && (
              <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded">
                <div className="text-sm font-medium text-green-800 mb-1">Queensland 2025 Update:</div>
                <div className="text-sm text-green-700">{question.qld2025Note}</div>
              </div>
            )}
          </div>
        )}

        {showExplanation && (
          <div className="text-center">
            <button
              onClick={nextQuestion}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {/* Change button text for clarity when quiz might continue looping */}
              {performanceTracker.total < 15? 'Next question' : 'Review results / next section'} 
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 bg-gray-50 p-4 rounded-lg">
        <h4 className="font-semibold mb-2">How adaptive learning works:</h4>
        <div className="text-sm text-gray-600 space-y-1">
          <div>• Questions adapt based on your performance – answer correctly to unlock harder questions.</div> 
          <div>• Your streak affects difficulty adjustments (two or more correct moves up, two or more wrong moves down).</div> 
          <div>• Three difficulty levels: Basic (foundational), Intermediate (application), Advanced (complex analysis).</div> 
          <div>• The quiz continues until you have attempted at least 15 questions, or you complete all questions in the advanced difficulty.</div> 
        </div>
      </div>
    </div>
  );
};

export default AdaptiveAssessmentQuiz;
