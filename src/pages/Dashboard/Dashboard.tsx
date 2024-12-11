import useDashboard from './useDashboard.ts';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const h = useDashboard();
  const navigate = useNavigate();
  const articles = h.feedQuery.data?.pages.flatMap((page) => page.data) ?? [];
  return (
    <main className="container mx-auto px-4 py-10">
      {h.user && (
        <div className="mb-8 rounded-lg bg-white p-6 text-black shadow-md">
          <h2 className="mb-2 text-2xl font-bold">Welcome, {h.user.name}!</h2>
          <p className="text-gray-600">Email: {h.user.email}</p>
        </div>
      )}
      <div className="container mx-auto mb-8 mt-6 rounded-lg bg-white p-4 text-black shadow-md">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div>
            <label className="mb-2 block font-bold">Keyword</label>
            <input
              type="text"
              name="keyword"
              value={h.filters.keyword}
              onChange={h.handleFilterChange}
              className="w-full rounded-lg border px-4 py-2"
              placeholder="Search by keyword"
            />
          </div>
          <div>
            <label className="mb-2 block font-bold">Date</label>
            <input
              type="date"
              name="date"
              value={h.filters.date}
              onChange={h.handleFilterChange}
              className="w-full rounded-lg border px-4 py-2"
            />
          </div>
          <div>
            <label className="mb-2 block font-bold">Category</label>
            <select
              name="category"
              value={h.filters.category}
              onChange={h.handleFilterChange}
              className="w-full rounded-lg border px-4 py-2"
            >
              <option value="">All Categories</option>
              {h.options?.categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block font-bold">Source</label>
            <select
              name="source"
              value={h.filters.source}
              onChange={h.handleFilterChange}
              className="w-full rounded-lg border px-4 py-2"
            >
              <option value="">All Sources</option>
              {h.options?.sources.map((source) => (
                <option key={source} value={source}>
                  {source}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={h.handleSearch}
            className="rounded-lg bg-blue-600 px-6 py-2 font-bold text-white hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </div>
      <section>
        <h2 className="mb-6 text-3xl font-bold">Your Personalized News</h2>
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <div
                key={article.id}
                className="rounded-lg bg-white p-4 text-black shadow-md transition-transform duration-300 hover:scale-105"
              >
                <h3 className="mb-2 text-xl font-bold">{article.title}</h3>
                <p className="mb-4 text-gray-600">{article.content.slice(0, 100)}...</p>
                <div className="text-sm text-gray-500">
                  <p>Author: {article.author || 'Unknown'}</p>
                  <p>Source: {article.source}</p>
                  <p>Published: {new Date(article.published_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-10 text-center text-white">
            <p className="text-lg">
              No articles matched your preferences. Try updating your{' '}
              <button
                onClick={() => navigate('/dashboard/preferences')}
                className="text-yellow-300 underline hover:text-yellow-400"
              >
                preferences
              </button>
              .
            </p>
          </div>
        )}
      </section>
      <div className="mt-8 flex justify-center">
        {h.feedQuery.hasNextPage && (
          <button
            onClick={() => h.feedQuery.fetchNextPage()}
            disabled={h.feedQuery.isFetchingNextPage}
            className="rounded-lg bg-yellow-300 px-6 py-2 font-bold text-black transition-all hover:bg-yellow-400"
          >
            {h.feedQuery.isFetchingNextPage ? 'Loading...' : 'Load More'}
          </button>
        )}
      </div>
    </main>
  );
};

export default Dashboard;
