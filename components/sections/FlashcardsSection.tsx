import React from 'react';
import { FlashcardStudy } from '../FlashcardStudy';
import { flashcards, flashcardCategories } from '../../data/flashcards';
import { Category } from '../../types';

interface FlashcardsSectionProps {
  selectedCategory: Category;
}

export const FlashcardsSection: React.FC<FlashcardsSectionProps> = ({ selectedCategory }) => {
  // Only show flashcards section when Flashcards category is selected
  if (selectedCategory !== 'Flashcards') {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 mb-20">
      <FlashcardStudy 
        flashcards={flashcards}
        categories={flashcardCategories}
      />
    </section>
  );
};
