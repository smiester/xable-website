import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { SectionEditor } from './SectionEditor';
import { ServiceEditor } from './ServiceEditor';
import { TeamEditor } from './TeamEditor';
import { BlogList } from '../blog/BlogList';
import { BlogForm } from '../blog/BlogForm';
import { ImageManager } from './ImageManager';
import { ContentEditor } from './ContentEditor';
import { Tabs, Tab } from './Tabs';

export function CMSLayout() {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex space-x-8">
              <Link
                to="/cms/content"
                className="text-gray-900 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Content
              </Link>
              <Link
                to="/cms/images"
                className="text-gray-900 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Images
              </Link>
              <Link
                to="/cms/services"
                className="text-gray-900 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Services
              </Link>
              <Link
                to="/cms/team"
                className="text-gray-900 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Team
              </Link>
              <Link
                to="/cms/blog"
                className="text-gray-900 hover:text-purple-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Blog
              </Link>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center text-gray-900 hover:text-purple-600"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Routes>
          <Route path="content" element={<ContentEditor />} />
          <Route path="images" element={<ImageManager />} />
          <Route path="services" element={<ServiceEditor />} />
          <Route path="team" element={<TeamEditor />} />
          <Route path="blog" element={<BlogList />} />
          <Route path="blog/new" element={<BlogForm />} />
          <Route path="blog/edit/:id" element={<BlogForm />} />
          <Route path="/" element={<Navigate to="/cms/content" replace />} />
        </Routes>
      </main>
    </div>
  );
}