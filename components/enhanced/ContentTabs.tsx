import React, { useState } from 'react';

interface ContentTab {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
}

interface ContentTabsProps {
  tabs: ContentTab[];
  defaultTab?: string;
  className?: string;
  tabClassName?: string;
  contentClassName?: string;
}

export const ContentTabs: React.FC<ContentTabsProps> = ({
  tabs,
  defaultTab,
  className = '',
  tabClassName = '',
  contentClassName = ''
}) => {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id || '');

  const activeTabContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className={`content-tabs ${className}`}>
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                group inline-flex items-center py-2 px-1 border-b-2 font-medium text-sm transition-colors duration-200
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }
                ${tabClassName}
              `}
              aria-current={activeTab === tab.id ? 'page' : undefined}
            >
              {tab.icon && (
                <span className="mr-2">
                  {tab.icon}
                </span>
              )}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className={`tab-content mt-6 ${contentClassName}`}>
        {activeTabContent && (
          <div className="animate-fadeIn">
            {activeTabContent}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentTabs;
