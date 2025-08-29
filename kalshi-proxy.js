// This is a Vercel Serverless Function.
// It acts as a secure proxy to the Kalshi API.

export default async function handler(request, response) {
  // IMPORTANT: Your Kalshi API key should be stored as an Environment Variable
  // in your Vercel project settings, named KALSHI_API_KEY.
  const apiKey = process.env.KALSHI_API_KEY;

  if (!apiKey) {
    return response.status(500).json({ error: 'API key is not configured.' });
  }

  // Use the event series ticker from the query parameter, or a default.
  const seriesTicker = request.query.series_ticker || 'INFL';

  // The real Kalshi API endpoint.
  const kalshiApiUrl = `https://trading-api.kalshi.com/v1/events/?series_ticker=${seriesTicker}`;

  try {
    const apiResponse = await fetch(kalshiApiUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apiKey}`, // Using the secure API key
        'Content-Type': 'application/json'
      }
    });

    if (!apiResponse.ok) {
      // If Kalshi API returns an error, forward it.
      const errorData = await apiResponse.text();
      return response.status(apiResponse.status).json({
        error: `Failed to fetch from Kalshi API: ${errorData}`
      });
    }

    const data = await apiResponse.json();

    // Set CORS headers to allow your frontend to access this endpoint
    response.setHeader('Access-Control-Allow-Origin', '*'); // Or lock to your domain
    response.setHeader('Access-Control-Allow-Methods', 'GET');
    
    // Send the live data back to your application
    return response.status(200).json(data);

  } catch (error) {
    console.error('Error fetching from Kalshi API:', error);
    return response.status(500).json({ error: 'An internal server error occurred.' });
  }
}

