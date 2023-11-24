const analyzeImage = async (inputValue, setReceiveInput) => {
  const apiKey = '43dacccf5b3a48b7af77db7ebd328211';
  const endpoint = 'https://azure-ai-vision-service.cognitiveservices.azure.com/';
  const apiUrl = `${endpoint}/computervision/imageanalysis:analyze?api-version=2023-02-01-preview&features=tags,read,caption,denseCaptions,smartCrops,objects,people`

  try {
    const result = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': apiKey,
      },
      body: JSON.stringify({ url: inputValue }),
    });
    const response = await result.json()

    if (response) {
      setReceiveInput(true);
      return response;
    } else {
      throw new Error('Error analyzing the image');
    }
  } catch (error) {
    throw error;
  } 
};

export { analyzeImage }

