export async function fetchCats(limit = 10) {
  try {
    const res = await fetch(
      `https://cataas.com/api/cats?limit=${limit}`
    );

    if (!res.ok) throw new Error("Failed to fetch cats");

    const data = await res.json();

    // Map into usable image URLs
    return data.map(cat => ({
      id: cat.id,
      imageUrl: `https://cataas.com/cat/${cat.id}`,
      tags: cat.tags
    }));
  } catch (err) {
    console.error(err);
    return [];
  }
}
