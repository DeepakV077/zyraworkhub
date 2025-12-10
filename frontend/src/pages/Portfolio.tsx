import { useEffect, useState, useCallback } from 'react';
import { ExternalLink, Search } from 'lucide-react';
import type { Project, ImageEntry } from '../types/database';

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  const fetchProjects = useCallback(async () => {
    try {
      const q = new URLSearchParams();
      if (filterCategory && filterCategory !== 'all') q.set('category', filterCategory);
      const BACKEND = import.meta.env.DEV ? 'http://127.0.0.1:4000' : '';
      const res = await fetch(`${BACKEND}/api/projects?` + q.toString());
      if (!res.ok) {
        console.error('Failed to fetch projects, status:', res.status);
        setProjects([]);
        return;
      }
      const data = await res.json();
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  }, [filterCategory]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const getFirstImage = (images?: ImageEntry[] | null): string | null => {
    if (!images || !Array.isArray(images) || images.length === 0) return null;
    const sorted = [...images].sort((a, b) => (a.order || 0) - (b.order || 0));
    return sorted[0]?.url || null;
  };

  const categories = ['all', 'branding', 'poster', 'digital-art', 'web-design', 'marketing'];

  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.client_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <section className="relative bg-gradient-to-br from-gray-900 to-gray-800 text-white py-20">
        <div className="section-container text-center">
          <h1 className="text-5xl sm:text-6xl font-heading font-extrabold mb-6">
            Our <span className="gradient-text">Portfolio</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Showcasing exceptional design and creative projects that bring visions to life
          </p>
        </div>
      </section>

      <section className="section-spacing bg-white">
        <div className="section-container">
          <div className="mb-8">
            <div className="relative mb-6">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-orange"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilterCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-all capitalize ${
                    filterCategory === category
                      ? 'bg-gradient-to-r from-primary-orange to-accent-yellow text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category === 'all' ? 'All Projects' : category.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="glass-card overflow-hidden animate-pulse">
                  <div className="bg-gray-200 h-64"></div>
                  <div className="p-6">
                    <div className="bg-gray-200 h-6 rounded mb-3"></div>
                    <div className="bg-gray-200 h-4 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="text-center py-16">
              <ExternalLink className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-2xl font-heading font-bold text-gray-900 mb-2">
                No projects found
              </h3>
              <p className="text-gray-600">Try adjusting your search or filters</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => {
                const imageUrl = getFirstImage(project.images);
                return (
                  <div
                    key={project.id}
                    className="glass-card overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group cursor-pointer"
                  >
                    <div className="relative h-64 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ExternalLink className="w-16 h-16 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-primary-orange text-xs font-semibold uppercase">
                        {project.category}
                      </div>
                    </div>

                    <div className="p-6">
                      <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-primary-orange transition-colors line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-sm text-gray-500 mb-3">Client: {project.client_name}</p>
                      <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>

                      {project.tags && project.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {project.tags.slice(0, 3).map((tag: string) => (
                            <span
                              key={tag}
                              className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
