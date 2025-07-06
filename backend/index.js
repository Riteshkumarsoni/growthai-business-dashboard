const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// ✅ Clean, strict, dynamic CORS
const allowedOrigins = [
  'http://localhost:5173',
  'https://growthai-business-dashboard.vercel.app'
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow server-to-server or curl
      if (allowedOrigins.includes(origin.replace(/\/$/, ''))) {
        return callback(null, true);
      }
      return callback(new Error(`CORS error: ${origin} not allowed`));
    },
    credentials: true
  })
);

const PORT = process.env.PORT || 4000;

app.use(express.json());

const headlines = [
  "Why {name} is {location}'s Hottest New Spot in 2025",
  "{name}: The Secret Gem Every {location} Local Loves",
  "Discover the Buzz: {name} in {location}",
  "Top Reasons {name} Dominates {location} This Year",
  "How {name} Became {location}'s Go-To Choice",
  "Why Everyone's Talking About {name} in {location}",
  "{name} is Changing the Game in {location}",
  "See Why {name} is Trending in {location} Right Now",
  "{name}: The Best Kept Secret in {location}",
  "Here’s Why {location} Locals Swear By {name}",
  "What Makes {name} a {location} Favorite",
  "Inside Scoop: {name} Takes Over {location}",
  "{name}: The Future of Local Business in {location}",
  "5 Reasons {name} Will Win {location} in 2025",
  "How {name} Became the Heartbeat of {location}",
  "{name}: The Talk of the Town in {location}",
  "{name} — Where {location} Locals Flock For Quality",
  "The Story Behind {name}’s Rise in {location}",
  "Why {name} is Unbeatable in {location}",
  "{name} Sets a New Standard in {location}"
];

app.get('/', (req, res) => {
  res.send('Welcome to GrowthPro AI');
});

app.post('/business-data', (req, res) => {
  try {
    const { name, location } = req.body;
    const headline = headlines[0].replace('{name}', name).replace('{location}', location);
    res.json({
      success: true,
      rating: 4.3,
      reviews: 127,
      headline
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.get('/regenerate-headline', (req, res) => {
  try {
    const { name, location } = req.query;
    const random = headlines[Math.floor(Math.random() * headlines.length)];
    const headline = random.replace('{name}', name).replace('{location}', location);
    res.json({ success: true, headline });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.listen(PORT, () => console.log(`🚀 Backend running on http://localhost:${PORT}`));
