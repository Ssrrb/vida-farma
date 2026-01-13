export const fetchCategories = async (): Promise<string[]> => {
  const response = await fetch('/api/categories');

  if (!response.ok) {
    throw new Error('Failed to fetch categories');
  }

  return response.json();
};
