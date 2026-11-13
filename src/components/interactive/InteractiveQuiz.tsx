import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../../data/publicationData';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award, ChevronRight, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../audio/soundEngine';

export const InteractiveQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const question = QUIZ_QUESTIONS[currentIdx];
  const total = QUIZ_QUESTIONS.length;

  const handleSelectOption = (optionId: string) => {
    if (showExplanation) return;
    sound.playClick();
    setSelectedAnswers((prev) => ({ ...prev, [question.id]: optionId }));
    setShowExplanation(true);

    const isCorrect = question.options.find((o) => o.id === optionId)?.isCorrect;
    if (isCorrect) {
      sound.playConvergenceChime();
    } else {
      sound.playPoisonAlert();
    }
  };

  const handleNext = () => {
    sound.playClick();
    if (currentIdx < total - 1) {
      setCurrentIdx((prev) => prev + 1);
      setShowExplanation(false);
    } else {
      setQuizFinished(true);
      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      sound.playConvergenceChime();
    }
  };

  const handleReset = () => {
    sound.playClick();
    setCurrentIdx(0);
    setSelectedAnswers({});
    setShowExplanation(false);
    setQuizFinished(false);
  };

  // Calculate score
  const correctCount = Object.entries(selectedAnswers).filter(([qId, selectedOptId]) => {
    const q = QUIZ_QUESTIONS.find((item) => item.id === Number(qId));
    return q?.options.find((o) => o.id === selectedOptId)?.isCorrect;
  }).length;

  const percentage = Math.round((correctCount / total) * 100);

  return (
    <div id="mastery-quiz" className="my-14 rounded-2xl glass-panel-elevated border border-sky-500/30 p-6 sm:p-8 scroll-mt-20">
      
      {/* Quiz Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-sky-400">
            <Award className="w-4 h-4" />
            <span>Academic Rigor Assessment</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-white mt-1">
            RIP & Distance-Vector Mastery Examination
          </h3>
        </div>

        {!quizFinished && (
          <div className="text-xs font-mono px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300">
            Question <strong className="text-sky-400">{currentIdx + 1}</strong> of {total}
          </div>
        )}
      </div>

      {!quizFinished ? (
        <div className="mt-8">
          
          {/* Progress bar */}
          <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden mb-6">
            <div 
              className="bg-gradient-to-r from-sky-500 to-emerald-400 h-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / total) * 100}%` }}
            />
          </div>

          {/* Context pill */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-sky-950 text-sky-400 border border-sky-800">
              {question.context || 'Routing Theory'}
            </span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-400">
              Tier: {question.difficulty}
            </span>
          </div>

          {/* Question text */}
          <h4 className="text-lg sm:text-xl font-serif text-slate-100 leading-snug">
            {question.question}
          </h4>

          {/* Option list */}
          <div className="mt-6 space-y-3">
            {question.options.map((opt) => {
              const isSelected = selectedAnswers[question.id] === opt.id;
              let btnStyle = 'border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-300';

              if (showExplanation) {
                if (opt.isCorrect) {
                  btnStyle = 'border-emerald-500 bg-emerald-950/40 text-emerald-200 shadow-glow-emerald';
                } else if (isSelected && !opt.isCorrect) {
                  btnStyle = 'border-rose-500 bg-rose-950/40 text-rose-200';
                } else {
                  btnStyle = 'border-slate-800/40 bg-slate-950/40 text-slate-500 opacity-60';
                }
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  disabled={showExplanation}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-sans flex items-start gap-3 transition-all ${btnStyle}`}
                >
                  <span className="w-6 h-6 rounded-lg bg-slate-800/80 font-mono text-xs flex items-center justify-center shrink-0 uppercase font-bold text-slate-400">
                    {opt.id}
                  </span>
                  <span className="flex-1 leading-relaxed mt-0.5">{opt.text}</span>
                  {showExplanation && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  )}
                  {showExplanation && isSelected && !opt.isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Box */}
          {showExplanation && (
            <div className="mt-6 p-5 rounded-xl bg-slate-950 border border-sky-500/30 text-xs sm:text-sm animate-fadeIn">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 font-mono text-xs">
                <span className="text-sky-400 font-bold">Standard Track Explanation:</span>
                {question.rfcAnchor && (
                  <span className="text-slate-400">{question.rfcAnchor}</span>
                )}
              </div>
              <p className="text-slate-300 leading-relaxed font-sans">
                {question.explanation}
              </p>
              <div className="mt-4 text-right">
                <button
                  onClick={handleNext}
                  className="px-4 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-mono text-xs font-bold transition-all shadow-glow-cyan inline-flex items-center gap-1.5"
                >
                  <span>{currentIdx < total - 1 ? 'Next Question' : 'View Final Scorecard'}</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* Quiz Completed Results */
        <div className="mt-8 py-8 text-center space-y-6 animate-fadeIn">
          <div className="inline-flex p-4 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400">
            <Award className="w-12 h-12" />
          </div>

          <div>
            <h4 className="text-2xl sm:text-3xl font-serif text-white">Examination Concluded</h4>
            <p className="text-slate-400 font-serif italic text-sm mt-1">
              Evaluated against RFC 1058 & RFC 2453 protocol specifications.
            </p>
          </div>

          <div className="max-w-xs mx-auto p-6 rounded-2xl bg-slate-950 border border-slate-800">
            <div className="text-4xl font-bold font-mono text-white">
              {percentage}%
            </div>
            <div className="text-xs font-mono text-slate-400 mt-1">
              {correctCount} of {total} Questions Answered Correctly
            </div>
            <div className="mt-4 pt-4 border-t border-slate-800 text-xs font-mono text-emerald-400">
              {percentage >= 80 ? 'Mastery Achieved (Grade: Distinction)' : percentage >= 50 ? 'Proficient (Grade: Pass)' : 'Review Core Chapters'}
            </div>
          </div>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Assessment</span>
          </button>
        </div>
      )}

    </div>
  );
};
