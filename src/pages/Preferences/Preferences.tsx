import usePreferences from '@/pages/Preferences/usePreferences.ts';

const Preferences = () => {
  const h = usePreferences();

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
      <div className="mx-auto max-w-4xl rounded-lg bg-white p-8 text-black shadow-md">
        <h2 className="mb-4 text-2xl font-bold">Manage Your Preferences</h2>
        <div className="mb-6">
          <h3 className="mb-2 text-lg font-bold">Preferred News Sources</h3>
          {h.options?.sources.map((source) => (
            <label key={source} className="mb-2 block">
              <input
                type="checkbox"
                checked={h.sources.includes(source)}
                onChange={(e) => {
                  if (e.target.checked) {
                    h.setSources([...h.sources, source]);
                  } else {
                    h.setSources(h.sources.filter((s) => s !== source));
                  }
                }}
              />
              <span className="ml-2">{source}</span>
            </label>
          ))}
        </div>
        <div className="mb-6">
          <h3 className="mb-2 text-lg font-bold">Preferred Categories</h3>
          {h.options?.categories.map((category) => (
            <div>
              <label key={category} className="mb-2 inline-block">
                <input
                  type="checkbox"
                  checked={h.categories.includes(category)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      h.setCategories([...h.categories, category]);
                    } else {
                      h.setCategories(h.categories.filter((c) => c !== category));
                    }
                  }}
                />
                <span className="ml-2">{category}</span>
              </label>
            </div>
          ))}
        </div>
        <div className="mb-6">
          <h3 className="mb-2 text-lg font-bold">Preferred Authors</h3>
          <input
            type="text"
            placeholder="Search for authors"
            className="mb-4 w-full rounded-lg border px-4 py-2"
            onChange={(e) => h.searchAuthors(e.target.value)}
          />
          <ul className="max-h-40 overflow-y-auto rounded-lg bg-gray-100 shadow-md">
            {h.authorSearchResults.map((author) => (
              <li
                key={author}
                className="cursor-pointer px-4 py-2 hover:bg-gray-200"
                onClick={() => {
                  h.setAuthorSearchResults([]);
                  if (!h.authors.includes(author)) {
                    h.setAuthors([...h.authors, author]);
                  }
                }}
              >
                {author}
              </li>
            ))}
          </ul>
          <ul>
            {h.authors.map((author, index) => (
              <li key={index} className="mb-2 flex items-center justify-between">
                <span>{author}</span>
                <button
                  onClick={() => h.setAuthors(h.authors.filter((a) => a !== author))}
                  className="text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => h.saveMutation.mutate()}
          className="rounded-lg bg-yellow-300 px-6 py-2 font-bold text-black transition-all hover:bg-yellow-400"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default Preferences;
