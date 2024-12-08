import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { useCMSStore } from '../../store/cmsStore';
import { ContentSection } from '../../types/cms';

export function ContentEditor() {
  const sections = useCMSStore((state) => state.sections);
  const updateSection = useCMSStore((state) => state.updateSection);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [content, setContent] = useState('');

  const handleEdit = (section: ContentSection) => {
    setEditingSection(section.id);
    setContent(section.content);
  };

  const handleSave = () => {
    if (editingSection) {
      updateSection(editingSection, { content });
      setEditingSection(null);
      setContent('');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Content Management</h2>
      
      <div className="space-y-6">
        {sections.map((section) => (
          <div key={section.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium capitalize">{section.title}</h3>
              <button
                onClick={() => handleEdit(section)}
                className="text-purple-600 hover:text-purple-700"
              >
                Edit
              </button>
            </div>
            
            {editingSection === section.id ? (
              <div className="space-y-4">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full h-32 rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
                <button
                  onClick={handleSave}
                  className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
                >
                  <Save className="h-5 w-5 mr-2" />
                  Save Changes
                </button>
              </div>
            ) : (
              <div className="prose max-w-none">
                {section.content}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}