import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useBlogStore } from '../../store/blogStore';
import { useAuthStore } from '../../store/authStore';
import { Plus, Edit } from 'lucide-react';

export function BlogList() {
  const posts = useBlogStore((state) => state.posts);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <div className="space-y-8" role="feed" aria-label="Blog posts">
      {isAuthenticated && (
        <div className="flex justify-end">
          <Link
            to="/cms/blog/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700"
          >
            <Plus className="h-5 w-5 mr-2" />
            New Post
          </Link>
        </div>
      )}

      {posts.map((post) => (
        <article
          key={post.id}
          className="bg-white rounded-lg shadow-md overflow-hidden"
          role="article"
          itemScope
          itemType="http://schema.org/BlogPosting"
        >
          <meta itemProp="datePublished" content={post.date} />
          <meta itemProp="author" content={post.author} />
          <img
            src={post.imageUrl}
            alt=""
            className="w-full h-48 object-cover"
            role="presentation"
            itemProp="image"
          />
          <div className="p-6">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-bold text-gray-900 mb-2" itemProp="headline">
                {post.title}
              </h2>
              {isAuthenticated && (
                <Link
                  to={`/cms/blog/edit/${post.id}`}
                  className="text-purple-600 hover:text-purple-700"
                >
                  <Edit className="h-5 w-5" />
                </Link>
              )}
            </div>
            <div className="flex items-center text-sm text-gray-500 mb-4">
              <span itemProp="author">{post.author}</span>
              <span className="mx-2">•</span>
              <time dateTime={post.date} itemProp="datePublished">
                {format(new Date(post.date), 'MMMM d, yyyy')}
              </time>
            </div>
            <p className="text-gray-600 mb-4" itemProp="description">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                  itemProp="keywords"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}