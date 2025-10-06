import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, BookOpen } from 'lucide-react';
import { Flashcard } from '../data/flashcards';
import { useAnalytics } from '../hooks/useAnalytics';

interface FlashcardStudyProps {
  flashcards: Flashcard[];
  categories: string[];
}

export const FlashcardStudy: React.FC<FlashcardStudyProps> = ({ flashcards, categories }) => {
  const { trackFlashcardInteraction, trackEvent, trackProgressUpdate } = useAnalytics();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [studiedCards, setStudiedCards] = useState<Set<string>>(new Set());

  // Filter flashcards based on selected category
  const filteredCards = selectedCategory === 'All' 
    ? flashcards 
    : flashcards.filter(card => card.category === selectedCategory);

  const currentCard = filteredCards[currentIndex];
  const totalCards = filteredCards.length;
  const progress = totalCards > 0 ? ((currentIndex + 1) / totalCards) * 100 : 0;
  const cardsLeft = totalCards - (currentIndex + 1);

  // Reset when category changes
  useEffect(() => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setStudiedCards(new Set());
  }, [selectedCategory]);

  const handleCategoryChange = (category: string) => {
    trackEvent('category_change', 'flashcards', category);
    setSelectedCategory(category);
  };

  const handleNext = () => {
    if (currentCard) {
      trackFlashcardInteraction('next', currentCard.term);
      setStudiedCards(prev => new Set([...prev, currentCard.id]));
      
      // Track progress milestones
      const newProgress = Math.round(((currentIndex + 2) / totalCards) * 100);
      if (newProgress % 25 === 0) {
        trackProgressUpdate(`flashcards_${selectedCategory}`, newProgress);
      }
    }
    if (currentIndex < totalCards - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      if (currentCard) {
        trackFlashcardInteraction('previous', currentCard.term);
      }
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleFlip = () => {
    if (currentCard) {
      trackFlashcardInteraction('flip', currentCard.term);
    }
    setIsFlipped(!isFlipped);
  };

  const handleReset = () => {
    trackEvent('reset_progress', 'flashcards', selectedCategory, studiedCards.size);
    setCurrentIndex(0);
    setIsFlipped(false);
    setStudiedCards(new Set());
  };


  if (totalCards === 0) {
    return (
      <div className="text-center py-20">
        <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-bold text-gray-300 mb-2">No flashcards available</h3>
        <p className="text-gray-400">Select a different category to study</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Category Selection */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-white mb-4 text-center">Choose Category to Study</h3>
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-lg shadow-purple-500/50'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {category}
              {category !== 'All' && (
                <span className="ml-2 text-xs opacity-75">
                  ({flashcards.filter(card => card.category === category).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-300">
            Progress: {currentIndex + 1} of {totalCards}
          </span>
          <span className="text-sm font-medium text-gray-300">
            {cardsLeft} cards left
          </span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-cyan-500 to-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Flashcard */}
      <div className="relative mb-12">
        <div 
          className="flashcard-container cursor-pointer"
          onClick={handleFlip}
          style={{ perspective: '1000px' }}
        >
          <div 
            className={`flashcard ${isFlipped ? 'flipped' : ''}`}
            style={{
              transformStyle: 'preserve-3d',
              transition: 'transform 0.6s',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
          >
            {/* Front of card (Term) */}
            <div 
              className="flashcard-face flashcard-front"
              style={{
                backfaceVisibility: 'hidden',
                width: '100%',
                height: '100%'
              }}
            >
              <div className="bg-gradient-to-br from-blue-500 to-cyan-500 p-[1px] rounded-xl">
                <div className="bg-gray-900 rounded-xl p-8 h-80 flex flex-col justify-center items-center text-center">
                  <BookOpen className="w-12 h-12 text-cyan-400 mb-4" />
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {currentCard?.term}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Click to reveal definition
                  </p>
                  <div className="absolute top-4 right-4">
                    <span className="bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded-full text-xs font-medium">
                      {currentCard?.category}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Back of card (Definition) */}
            <div 
              className="flashcard-face flashcard-back"
              style={{
                backfaceVisibility: 'hidden',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                transform: 'rotateY(180deg)'
              }}
            >
              <div className="bg-gradient-to-br from-green-500 to-emerald-500 p-[1px] rounded-xl">
                <div className="bg-gray-900 rounded-xl p-8 h-80 flex flex-col justify-center items-center text-center">
                  <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mb-4">
                    <span className="text-green-400 font-bold text-xl">✓</span>
                  </div>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    {currentCard?.definition}
                  </p>
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium">
                      Definition
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center space-x-4">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        <button
          onClick={handleFlip}
          className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>{isFlipped ? 'Show Term' : 'Show Definition'}</span>
        </button>


        <button
          onClick={handleNext}
          disabled={currentIndex >= totalCards - 1}
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
            currentIndex >= totalCards - 1 
              ? 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-50' 
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Reset Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={handleReset}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset Progress</span>
        </button>
      </div>

      {/* Study Stats */}
      <div className="mt-8 text-center">
        <div className="inline-flex items-center space-x-6 bg-gray-800/50 rounded-lg px-6 py-3">
          <div className="text-center">
            <div className="text-2xl font-bold text-cyan-400">{studiedCards.size}</div>
            <div className="text-xs text-gray-400">Studied</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{totalCards}</div>
            <div className="text-xs text-gray-400">Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">{Math.round(progress)}%</div>
            <div className="text-xs text-gray-400">Complete</div>
          </div>
        </div>
      </div>
    </div>
  );
};
