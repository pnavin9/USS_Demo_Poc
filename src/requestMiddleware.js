export async function sendSenseiRequest() {
  try {
    const response = await fetch('/api/sensei', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      // No body needed unless you want to make the request dynamic
    });
    const text = await response.text();
    try {
      const json = JSON.parse(text);
      console.log('Sensei API response:', json);
    } catch (e) {
      console.log('Sensei API response (raw):', text);
    }
  } catch (error) {
    console.error('Error sending Sensei API request:', error);
  }
} 