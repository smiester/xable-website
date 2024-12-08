import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { useBlogStore } from '../../store/blogStore';
import { BlogPost } from '../../types/blog';

export function BlogEditor() {
  const [title, setTitle] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [tags, setTags] = useState('');
  const addPost = useBlogStore((state) => state.addPost);

  const editor = useEditor({
    extensions: [StarterKit],
    content: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editor) return;

    const newPost: BlogPost = {
      id: Date.now().toString(),
      title,
      content: editor.getHTML(),
      excerpt,
      author: 'Admin',
      date: new Date().toISOString(),
      slug: title.toLowerCase().replace(/\s+/g, '-'),
      tags: tags.split(',').map((tag) => tag.trim()),
      imageUrl,
    };

    addPost(newPost);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setExcerpt('');
    setImageUrl('');
    setTags('');
    editor?.commands.setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6" role="form" aria-label="Blog post editor">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          required
          aria-required="true"
        />
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          rows={3}
          required
          aria-required="true"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <EditorContent editor={editor} className="mt-1 prose max-w-none" />
      </div>

      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
          Featured Image URL
        </label>
        <input
          type="url"
          id="imageUrl"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          required
          aria-required="true"
        />
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
          aria-description="Enter tags separated by commas"
        />
      </div>

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
        aria-label="Create blog post"
      >
        Create Post
      </button>
    </form>
  );
}