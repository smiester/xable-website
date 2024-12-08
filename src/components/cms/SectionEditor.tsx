import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useCMSStore } from '../../store/cmsStore';
import { ContentSection } from '../../types/cms';

export function SectionEditor() {
  const sections = useCMSStore((state) => state.sections);
  const updateSection = useCMSStore((state) => state.updateSection);

  const editor = useEditor({
    extensions: [StarterKit],
  });

  const handleSectionUpdate = (section: ContentSection, content: string) => {
    updateSection(section.id, {
      content,
      lastModified: new Date().toISOString(),
    });
  };

  return (
    <div className="space-y-8">
      {sections.map((section) => (
        <div key={section.id} className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            {section.title}
          </h3>
          <EditorContent
            editor={editor}
            className="prose max-w-none"
            onChange={() => {
              if (editor) {
                handleSectionUpdate(section, editor.getHTML());
              }
            }}
          />
          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">
              Last modified: {new Date(section.lastModified).toLocaleDateString()}
            </span>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={section.isPublished}
                onChange={(e) =>
                  updateSection(section.id, { isPublished: e.target.checked })
                }
                className="rounded border-gray-300 text-purple-600 focus:ring-purple-500"
              />
              <span className="ml-2 text-sm text-gray-700">Published</span>
            </label>
          </div>
        </div>
      ))}
    </div>
  );
}