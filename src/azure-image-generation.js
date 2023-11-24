import "./dotenv"
const generateImage = async (prompt) => {
  const openIaApyKey = process.env.REACT_APP_REACT_OPENAI_API_KEY
  const endpoint = "https://api.openai.com/v1/images/generations"
  try {
    const result = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${openIaApyKey}`,
      },
      body: JSON.stringify({ 
        prompt : prompt,
        n : 1,
        size : "1024x1024"
      }),
    });

    const response = await result.json()

    if (response) {
      return response;
    } else {
      throw new Error('Error analyzing the image');
    }
  } catch (error) {
    throw error;
  }
}

export { generateImage }

