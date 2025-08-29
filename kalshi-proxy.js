// This is a Vercel serverless function that acts as a secure proxy to the Kalshi API.

export default async function handler(req, res) {
  // Allow requests from any origin
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight CORS requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const apiKey = process.env.KALSHI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key is not configured on the server.' });
  }

  // Always fetch all open events. The frontend will do the filtering.
  const kalshiApiUrl = `https://trading-api.kalshi.com/v1/events/`;

  try {
    const response = await fetch(kalshiApiUrl, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Kalshi API Error:', errorData);
      return res.status(response.status).json({ error: errorData.error || 'Failed to fetch data from Kalshi API.' });
    }

    const data = await response.json();
    res.status(200).json(data);
    
  } catch (error) {
    console.error('Proxy Server Error:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
}



