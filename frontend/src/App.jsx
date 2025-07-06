import React, { useState } from 'react';

export default function App() {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('http://localhost:5000/business-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, location }),
    });
    const result = await res.json();
    setData(result);
    setLoading(false);
  };

  const regenerateHeadline = async () => {
    if (!name || !location) return;
    setLoading(true);
    const res = await fetch(
      `http://localhost:5000/regenerate-headline?name=${name}&location=${location}`
    );
    const result = await res.json();
    setData({ ...data, headline: result.headline });
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-purple-200 flex flex-col items-center justify-start py-16 px-4">
      <h1 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
        GrowthProAI Business Dashboard
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md space-y-6 animate-fade-in"
      >
        <div>
          <label className="block text-gray-700 mb-1 font-semibold">
            Business Name
          </label>
          <input
            type="text"
            placeholder="e.g. Cake & Co"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-1 font-semibold">
            Location
          </label>
          <input
            type="text"
            placeholder="e.g. Mumbai"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white font-bold transition-all ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90'
          }`}
        >
          {loading ? 'Loading...' : 'Generate Data'}
        </button>
      </form>

      {data && (
        <div className="mt-10 w-full max-w-md bg-white rounded-2xl shadow-xl p-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            📊 Business Insights
          </h2>
          <div className="space-y-2 text-gray-700">
            <p>
              <span className="font-semibold">Google Rating:</span> {data.rating}
            </p>
            <p>
              <span className="font-semibold">Reviews:</span> {data.reviews}
            </p>
            <p>
              <span className="font-semibold">SEO Headline:</span>
              <br />
              <span className="italic">"{data.headline}"</span>
            </p>
          </div>
          <button
            onClick={regenerateHeadline}
            disabled={loading}
            className={`mt-6 w-full py-2 rounded-lg text-white font-bold transition-all ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-green-500 to-teal-500 hover:opacity-90'
            }`}
          >
            {loading ? 'Loading...' : '🔁 Regenerate Headline'}
          </button>
        </div>
      )}
    </div>
  );
}
