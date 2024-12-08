import React, { useState, createContext, useContext, ReactNode } from 'react';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

interface TabsProps {
  children: ReactNode;
}

export function Tabs({ children }: TabsProps) {
  const [activeTab, setActiveTab] = useState('');

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="space-y-4">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {React.Children.map(children, (child) => {
              if (React.isValidElement(child)) {
                return React.cloneElement(child);
              }
              return null;
            })}
          </nav>
        </div>
        <div>
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child) && child.props.label === activeTab) {
              return child.props.children;
            }
            return null;
          })}
        </div>
      </div>
    </TabsContext.Provider>
  );
}

interface TabProps {
  label: string;
  children: ReactNode;
}

export function Tab({ label, children }: TabProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tab must be used within Tabs');

  const { activeTab, setActiveTab } = context;
  const isActive = activeTab === label;

  React.useEffect(() => {
    if (!activeTab) {
      setActiveTab(label);
    }
  }, [activeTab, label, setActiveTab]);

  return (
    <button
      className={`${
        isActive
          ? 'border-purple-500 text-purple-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
      } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
      onClick={() => setActiveTab(label)}
      role="tab"
      aria-selected={isActive}
      aria-controls={`panel-${label}`}
    >
      {label}
    </button>
  );
}