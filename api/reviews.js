export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  }

  const token = process.env.GOOGLE_BUSINESS_TOKEN;
  if (!token) {
    return res.status(500).json({ error: 'GOOGLE_BUSINESS_TOKEN is not configured' });
  }

  const accountId = '10752065761511131400';
  const locationId = 'ChIJWfWwZzC6xzsSKM9hG7u2R5U';
  const url = `https://mybusiness.googleapis.com/v4/accounts/${accountId}/locations/${locationId}/reviews`;

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      return res.status(response.status).json({
        error: 'Failed to fetch reviews from Google Business API',
        details: errorText,
      });
    }

    const data = await response.json();
    const rawReviews = data.reviews || [];

    // Helper map for Google Business star rating enum
    const starMap = {
      STAR_RATING_UNSPECIFIED: 5,
      ONE: 1,
      TWO: 2,
      THREE: 3,
      FOUR: 4,
      FIVE: 5,
    };

    const simplifiedReviews = rawReviews.map((rev) => {
      const rating = typeof rev.starRating === 'number'
        ? rev.starRating
        : (starMap[rev.starRating] || 5);

      return {
        id: rev.reviewId || rev.name || Math.random().toString(36).substring(2),
        name: rev.reviewer?.displayName || 'Happy Customer',
        profilePhotoUrl: rev.reviewer?.profilePhotoUrl || null,
        starRating: rating,
        comment: rev.comment || '',
        relativeTime: rev.createTime || rev.updateTime || '',
      };
    });

    return res.status(200).json(simplifiedReviews);
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error while fetching reviews',
      message: error.message,
    });
  }
}
