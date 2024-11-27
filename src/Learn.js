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
    content: {
      title: 'Chess Endgame Fundamentals',
      sections: [
        {
          heading: 'What is an Endgame?',
          text: 'The endgame is the final stage of a chess game where few pieces remain on the board. It requires precise calculation, king activity, and understanding of key strategic principles.'
        },
        {
          heading: 'Key Endgame Principles',
          text: '1. Activate the King\n- In the endgame, the king becomes a strong piece\n- Move the king towards the center\n- Use the king to support passed pawns\n- Control key squares\n\n2. Pawn Promotion Strategy\n- Create and protect passed pawns\n- Use king to support pawn advancement\n- Block opponent\'s pawns\n\n3. Critical Endgame Positions\n- King and Pawn vs King\n- Rook Endgames\n- Minor Piece Endgames'
        },
        {
          heading: 'Theoretical Concepts',
          text: 'Important Endgame Theories:\n- Opposition Theory\n- Triangulation\n- Zugzwang\n- Square of the Pawn\n- Lucena and Philidor Positions\n\nThese concepts help determine winning and drawing chances in complex endgame scenarios.'
        }
      ]
    }
  },
  {
    id: 'tactics',
    title: 'Tactics',
    description: 'Learn chess tactics and strategic maneuvers',
    content: {
        title: 'Chess Tactical Mastery',
        sections: [
          {
            heading: 'What are Chess Tactics?',
            text: 'Tactics are short-term calculated sequences that exploit specific weaknesses in the opponent\'s position. They involve precise combinations to gain material or positional advantage.'
          },
          {
            heading: 'Core Tactical Motifs',
            text: 'Key Tactical Themes:\n1. Fork\n- Attacking two pieces simultaneously\n- Can be performed by knights, pawns, or other pieces\n\n2. Pin\n- Restricting piece movement\n- Absolute pin (can\'t move without exposing king)\n- Relative pin (can move but loses material)\n\n3. Skewer\n- Similar to pin, but the more valuable piece is in front\n- Forces piece to move, exposing another piece'
          },
          {
            heading: 'Advanced Tactical Concepts',
            text: 'Complex Tactical Strategies:\n- Discovered Attack\n- Double Attack\n- Deflection\n- Interference\n- Overloading\n\nMastering these concepts requires pattern recognition, calculation, and strategic thinking.'
          },
          {
            heading: 'Tactical Calculation Principles',
            text: 'Improving Tactical Vision:\n1. Always look for tactical opportunities\n2. Analyze piece relationships\n3. Consider all possible moves\n4. Practice pattern recognition\n5. Study classic tactical games\n\nTactics are the foundation of chess strategy and decisive game-changing moments.'
          }
        ]
      }
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