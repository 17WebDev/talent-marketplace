import React from 'react';
import { Engineer } from '../types';

interface TalentCardProps {
  engineer: Engineer;
}

const TalentCard: React.FC<TalentCardProps> = ({ engineer }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <img
        src={`${engineer.image}?w=400&h=400&fit=crop`}
        alt={engineer.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900">{engineer.name}</h3>
        <p className="text-sm text-gray-600">{engineer.role}</p>
        <p className="text-sm text-gray-500 mt-1">{engineer.experience}</p>
        
        <div className="mt-3 flex flex-wrap gap-2">
          {engineer.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
            >
              {skill}
            </span>
          ))}
        </div>
        
        <button className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors">
          Schedule Call
        </button>
      </div>
    </div>
  );
};

export default TalentCard;