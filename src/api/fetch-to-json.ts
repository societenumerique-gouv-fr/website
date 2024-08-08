export const fetchToJson = async (url: string, errorMessage: string) => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(errorMessage);
  }

  return response.json();
};
