import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../../data/publicationData';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, Award, ChevronRight, BookOpen } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../../audio/soundEngine';
import { LiquidMetalButton } from "@designcodeio/threeui";
import "@designcodeio/threeui/style.css";
import { LiquidMetalAction, LiquidButton } from '../buttons/LiquidMetalAction';

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
    <div id="mastery-quiz" className="my-14 rounded-2xl glass-panel-elevated border border-[#D8CBB3]/25 p-6 sm:p-8 scroll-mt-20 shadow-liquid-glass">
      
      {/* Quiz Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#D8CBB3]/15">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-[#2F6BFF] font-bold">
            <Award className="w-4 h-4" />
            <span>Academic Rigor Assessment</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-[#FAF7F2] mt-1">
            RIP & Distance-Vector Mastery Examination
          </h3>
        </div>

        {!quizFinished && (
          <div className="text-xs font-mono px-3 py-1.5 rounded-full bg-[#121210] border border-[#D8CBB3]/20 text-[#D8CBB3]">
            Question <strong className="text-[#2F6BFF]">{currentIdx + 1}</strong> of {total}
          </div>
        )}
      </div>

      {!quizFinished ? (
        <div className="mt-8">
          
          {/* Progress bar */}
          <div className="w-full bg-[#121210] h-2 rounded-full overflow-hidden mb-6 border border-[#D8CBB3]/15">
            <div 
              className="bg-gradient-to-r from-[#2F6BFF] to-[#D8CBB3] h-full transition-all duration-300 shadow-glow-electric"
              style={{ width: `${((currentIdx + 1) / total) * 100}%` }}
            />
          </div>

          {/* Context pill */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded bg-[#2F6BFF]/20 text-[#2F6BFF] border border-[#2F6BFF]/40 font-bold">
              {question.context || 'Routing Theory'}
            </span>
            <span className="text-[10px] font-mono px-2.5 py-0.5 rounded bg-[#121210] text-[#D8CBB3]/80 border border-[#D8CBB3]/20">
              Tier: {question.difficulty}
            </span>
          </div>

          {/* Question text */}
          <h4 className="text-lg sm:text-xl font-serif text-[#FAF7F2] leading-snug">
            {question.question}
          </h4>

          {/* Option list */}
          <div className="mt-6 space-y-3">
            {question.options.map((opt) => {
              const isSelected = selectedAnswers[question.id] === opt.id;
              let btnStyle = 'border-[#D8CBB3]/20 bg-[#121210] hover:border-[#2F6BFF] text-[#D8CBB3]';

              if (showExplanation) {
                if (opt.isCorrect) {
                  btnStyle = 'border-[#2F6BFF] bg-[#2F6BFF]/20 text-[#FAF7F2] shadow-glow-electric';
                } else if (isSelected && !opt.isCorrect) {
                  btnStyle = 'border-rose-500 bg-rose-950/40 text-rose-200';
                } else {
                  btnStyle = 'border-[#D8CBB3]/10 bg-[#121210]/40 text-[#D8CBB3]/40 opacity-50';
                }
              }

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectOption(opt.id)}
                  disabled={showExplanation}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm font-sans flex items-start gap-3 transition-all ${btnStyle}`}
                >
                  <span className="w-6 h-6 rounded-lg bg-[#1E1E1C] font-mono text-xs flex items-center justify-center shrink-0 uppercase font-bold text-[#D8CBB3] border border-[#D8CBB3]/20">
                    {opt.id}
                  </span>
                  <span className="flex-1 leading-relaxed mt-0.5">{opt.text}</span>
                  {showExplanation && opt.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-[#2F6BFF] shrink-0 mt-0.5" />
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
            <div className="mt-6 p-5 rounded-xl bg-[#121210] border border-[#2F6BFF]/40 text-xs sm:text-sm animate-fadeIn shadow-lg">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#D8CBB3]/15 font-mono text-xs">
                <span className="text-[#2F6BFF] font-bold">Standard Track Explanation:</span>
                {question.rfcAnchor && (
                  <span className="text-[#D8CBB3]/60">{question.rfcAnchor}</span>
                )}
              </div>
              <p className="text-[#D8CBB3] leading-relaxed font-sans">
                {question.explanation}
              </p>
              <div className="mt-4 flex justify-end">
                <LiquidMetalAction
                  text={currentIdx < total - 1 ? 'Next Question' : 'View Scorecard'}
                  onClick={handleNext}
                  width={180}
                  height={48}
                />
              </div>
            </div>
          )}

        </div>
      ) : (
        /* Quiz Completed Results */
        <div className="mt-8 py-8 text-center space-y-6 animate-fadeIn">
          <div className="inline-flex p-4 rounded-full bg-[#2F6BFF]/10 border border-[#2F6BFF]/30 text-[#2F6BFF] shadow-glow-electric">
            <Award className="w-12 h-12" />
          </div>

          <div>
            <h4 className="text-2xl sm:text-3xl font-serif text-[#FAF7F2]">Examination Concluded</h4>
            <p className="text-[#D8CBB3]/80 font-serif italic text-sm mt-1">
              Evaluated against RFC 1058 & RFC 2453 protocol specifications.
            </p>
          </div>

          <div className="max-w-xs mx-auto p-6 rounded-2xl bg-[#121210] border border-[#D8CBB3]/25 shadow-inner">
            <div className="text-4xl font-bold font-mono text-[#FAF7F2]">
              {percentage}%
            </div>
            <div className="text-xs font-mono text-[#D8CBB3]/70 mt-1">
              {correctCount} of {total} Questions Answered Correctly
            </div>
            <div className="mt-4 pt-4 border-t border-[#D8CBB3]/15 text-xs font-mono text-[#2F6BFF] font-bold">
              {percentage >= 80 ? 'Mastery Achieved (Grade: Distinction)' : percentage >= 50 ? 'Proficient (Grade: Pass)' : 'Review Core Chapters'}
            </div>
          </div>

          <div className="pt-2 flex justify-center">
            <LiquidMetalAction
              text="Retake Assessment"
              onClick={handleReset}
              width={200}
              height={50}
            />
          </div>
        </div>
      )}

    </div>
  );
};
