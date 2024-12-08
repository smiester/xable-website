import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';
import { useCMSStore } from '../../store/cmsStore';

export function ImageManager() {
  const [imageUrl, setImageUrl] = useState('');
  const [section, setSection] = useState('');
  const updateImage = useCMSStore((state) => state.updateImage);
  const images = useCMSStore((state) => state.images);

  const handleImageUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (imageUrl && section) {
      updateImage(section, imageUrl);
      setImageUrl('');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Image Management</h2>
      
      <form onSubmit={handleImageUpdate} className="space-y-4">
        <div>
          <label htmlFor="section" className="block text-sm font-medium text-gray-700">
            Section
          </label>
          <select
            id="section"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            required
          >
            <option value="">Select section</option>
            <option value="hero">Hero</option>
            <option value="approach">Approach</option>
            <option value="team">Team</option>
          </select>
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="url"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="https://example.com/image.jpg"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full flex justify-center items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
        >
          <Upload className="h-5 w-5 mr-2" />
          Update Image
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-lg font-medium mb-4">Current Images</h3>
        <div className="space-y-4">
          {Object.entries(images).map(([key, url]) => (
            <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h4 className="font-medium capitalize">{key}</h4>
                <p className="text-sm text-gray-500 truncate">{url}</p>
              </div>
              <img src={url} alt={key} className="h-16 w-16 object-cover rounded" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}