import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

const learnCategories = [
  {
    id: 'openings',
    title: 'Openings',
    description: 'Learn fundamental chess openings and strategies',
    content: {
      title: 'Chess Openings Basics',
      sections: [
        {
          heading: 'What are Chess Openings?',
          text: 'Chess openings are the initial moves of a chess game that establish the foundation for your strategy. They are crucial for developing pieces, controlling the center, and setting up your overall game plan.'
        },
        {
          heading: 'Popular Opening Types',
          text: 'Some popular opening types include:\n- King\'s Pawn Openings (e4 openings)\n- Queen\'s Pawn Openings (d4 openings)\n- Sicilian Defense\n- French Defense\n- Italian Game'
        },
        {
          heading: 'Key Opening Principles',
          text: '1. Control the center\n2. Develop your pieces quickly\n3. Ensure king safety\n4. Connect your rooks\n5. Avoid moving the same piece multiple times in the opening'
        }
      ]
    }
  },
  {
    id: 'endgame',
    title: 'Endgame',
    description: 'Master critical endgame techniques and strategies',
    content: null // Placeholder for future expansion
  },
  {
    id: 'tactics',
    title: 'Tactics',
    description: 'Learn chess tactics and strategic maneuvers',
    content: null // Placeholder for future expansion
  }
];

const Learn = () => {
  const [expandedCategory, setExpandedCategory] = useState('openings');

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-center">Learn Chess</h1>
        
        <div className="space-y-4">
          {learnCategories.map((category) => (
            <div 
              key={category.id} 
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div 
                onClick={() => toggleCategory(category.id)}
                className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50 transition"
              >
                <div>
                  <h2 className="text-xl font-semibold">{category.title}</h2>
                  <p className="text-gray-500">{category.description}</p>
                </div>
                {expandedCategory === category.id ? (
                  <ChevronDown className="text-gray-500" />
                ) : (
                  <ChevronRight className="text-gray-500" />
                )}
              </div>
              
              {expandedCategory === category.id && category.content && (
                <div className="p-4 bg-gray-50">
                  <h3 className="text-2xl font-bold mb-4">{category.content.title}</h3>
                  {category.content.sections.map((section, index) => (
                    <div key={index} className="mb-4">
                      <h4 className="text-lg font-semibold mb-2">{section.heading}</h4>
                      <p className="text-gray-700 whitespace-pre-line">{section.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Learn;