import React from 'react';
import { X, CheckCircle } from 'lucide-react';
import { Topic } from '../../types';
import { LazyDiagramViewer } from '../enhanced/LazyDiagramViewer';
import { useProgress } from '../../hooks/useProgress';
import { useAnalytics } from '../../hooks/useAnalytics';

interface TopicDetailModalProps {
  topic: Topic;
  onClose: () => void;
}

export const TopicDetailModal: React.FC<TopicDetailModalProps> = ({ topic, onClose }) => {
  const progress = useProgress();
  const { trackEvent } = useAnalytics();
  const Icon = topic.icon;

  const handleClose = () => {
    trackEvent('modal_close', 'topic_detail', topic.title);
    onClose();
  };

  const handleMarkComplete = () => {
    trackEvent('topic_completed', 'learning_progress', topic.title);
    progress.markTopicCompleted(topic.id);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
      <div className="bg-gray-900 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-gray-800 shadow-2xl">
        <div className={`bg-gradient-to-br ${topic.color} p-8 relative`}>
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 bg-white bg-opacity-20 rounded-lg hover:bg-opacity-30 transition-all"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="flex items-center space-x-4">
            <div className="p-4 bg-white bg-opacity-20 rounded-xl">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <span className="text-sm font-medium text-white text-opacity-80">{topic.category}</span>
              <h2 className="text-3xl font-bold text-white">{topic.title}</h2>
            </div>
          </div>
        </div>
        
        <div className="p-8 space-y-6">
          <div>
            <h3 className="text-xl font-bold text-white mb-3">Overview</h3>
            <p className="text-gray-300 leading-relaxed">{topic.content.overview}</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold text-white mb-3">Key Points</h3>
            <ul className="space-y-2">
              {topic.content.keyPoints.map((point, idx) => (
                <li key={idx} className="flex items-start space-x-3">
                  <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${topic.color} mt-2`} />
                  <span className="text-gray-300">{point}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="bg-gray-800 bg-opacity-50 rounded-xl p-6 border border-gray-700">
            <h3 className="text-lg font-bold text-white mb-2">Example</h3>
            <p className="text-gray-300 leading-relaxed">{topic.content.example}</p>
          </div>

          {topic.content.tradeoffs && (
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Trade-offs</h3>
              <ul className="space-y-2">
                {topic.content.tradeoffs.considerations.map((consideration, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-2" />
                    <span className="text-gray-300">{consideration}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}


          {/* Diagrams Section */}
          {topic.content && 'diagrams' in topic.content && topic.content.diagrams && topic.content.diagrams.length > 0 && (
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Diagrams</h3>
              <div className="grid grid-cols-1 gap-4">
                {topic.content.diagrams.map((diagramFile, idx) => {
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
            onClick={handleMarkComplete}
            className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
              progress.isTopicCompleted(topic.id)
                ? 'bg-green-500/20 border-2 border-green-500 text-green-400 cursor-default'
                : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white hover:shadow-lg'
            }`}
            disabled={progress.isTopicCompleted(topic.id)}
          >
            {progress.isTopicCompleted(topic.id) ? (
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
