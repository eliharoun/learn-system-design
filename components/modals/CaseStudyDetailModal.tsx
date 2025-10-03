import React from 'react';
import { X, CheckCircle, BarChart3, Layers, Code, TrendingUp } from 'lucide-react';
import { CaseStudy } from '../../types';
import { getDifficultyBadgeColor } from '../../utils';
import { LazyDiagramViewer } from '../enhanced/LazyDiagramViewer';
import { useProgress } from '../../hooks/useProgress';

interface CaseStudyDetailModalProps {
  caseStudy: CaseStudy;
  onClose: () => void;
}

export const CaseStudyDetailModal: React.FC<CaseStudyDetailModalProps> = ({ caseStudy, onClose }) => {
  const progress = useProgress();
  const Icon = caseStudy.icon;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
      <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-800 shadow-2xl">
        <div className={`bg-gradient-to-br ${caseStudy.color} p-8 relative`}>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-4 bg-white bg-opacity-20 rounded-xl">
                <Icon className="w-8 h-8 text-white" />
              </div>
              <div>
                <span className="text-sm font-medium text-white text-opacity-80">{caseStudy.category}</span>
                <h2 className="text-3xl font-bold text-white">{caseStudy.title}</h2>
              </div>
            </div>
            <span className={`text-sm font-bold px-4 py-2 rounded-full ${
              caseStudy.difficulty === 'Easy' ? 'bg-green-500/30 text-green-200' :
              caseStudy.difficulty === 'Medium' ? 'bg-yellow-500/30 text-yellow-200' :
              'bg-red-500/30 text-red-200'
            }`}>
              {caseStudy.difficulty}
            </span>
          </div>
        </div>
        
        <div className="p-8 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-3">Overview</h3>
            <p className="text-gray-300 leading-relaxed">{caseStudy.content.overview}</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-3">Requirements</h3>
            <ul className="space-y-2">
              {caseStudy.content.requirements.map((req, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{req}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-2 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-cyan-400" />
              Capacity Estimations
            </h3>
            <p className="text-gray-300 leading-relaxed">{caseStudy.content.estimations}</p>
          </div>

          <div>
            <h3 className="text-xl font-bold text-white mb-3">System Components</h3>
            <div className="space-y-2">
              {caseStudy.content.components.map((component, idx) => (
                <div key={idx} className="flex items-start space-x-3 bg-gray-800 bg-opacity-50 p-3 rounded-lg">
                  <Layers className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{component}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 rounded-xl p-6 border border-purple-500/20">
            <h3 className="text-lg font-bold text-white mb-3 flex items-center">
              <Code className="w-5 h-5 mr-2 text-purple-400" />
              Key Design Decisions
            </h3>
            <ul className="space-y-2">
              {caseStudy.content.keyDecisions.map((decision, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${caseStudy.color} mt-2`} />
                  <span className="text-gray-300">{decision}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Diagrams Section */}
          {caseStudy.content.diagrams && caseStudy.content.diagrams.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Architecture Diagrams</h3>
              <div className="grid grid-cols-1 gap-4">
                {caseStudy.content.diagrams.map((diagramFile, idx) => {
                  const diagramTitle = diagramFile.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
                  return (
                    <div key={idx} className="bg-blue-900/20 border border-blue-500/50 rounded-lg p-4">
                      <LazyDiagramViewer
                        diagramId={diagramFile}
                        title={diagramTitle}
                        className="max-w-full"
                        showControls={true}
                        autoLoad={true}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        
        {/* Completion Button */}
        <div className="border-t border-gray-700 p-6 bg-gray-800/50">
          <button
            onClick={() => {
              progress.markCaseStudyCompleted(caseStudy.id);
              onClose();
            }}
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
              progress.isCaseStudyCompleted(caseStudy.id)
                ? 'bg-green-500/20 border-2 border-green-500 text-green-400 cursor-default'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white hover:shadow-lg'
            }`}
            disabled={progress.isCaseStudyCompleted(caseStudy.id)}
          >
            {progress.isCaseStudyCompleted(caseStudy.id) ? (
              <span className="flex items-center justify-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Completed!
              </span>
            ) : (
              'Mark as Complete'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
