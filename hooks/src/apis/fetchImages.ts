const API_KEY = import.meta.env.VITE_PIXABAY_API_KEY;

export async function fetchImages(keyword: string) {
  try {
    const response = await fetch(
      `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
        keyword
      )}&image_type=photo&pretty=true`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
}
