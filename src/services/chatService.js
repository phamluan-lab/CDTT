import axios from 'axios';

const GEMINI_API_KEY = 'AIzaSyDtijNyvDQJvkvZgnRz7fbkyymJxQ7NJRo'; // Thay thế bằng API key của bạn từ Google AI Studio
const GEMINI_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

const chatService = {
  async getChatGPTResponse(message) {
    try {
      const response = await axios.post(
        GEMINI_API_URL,
        {
          contents: [{
            parts: [{
              text: message
            }]
          }]
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      return response.data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Error calling Gemini API:', error.response ? error.response.data : error.message);
      if (error.response) {
        const errorMessage = error.response.data.error.message || 'Lỗi không xác định từ Gemini.';
        throw new Error(`Lỗi từ Gemini: ${errorMessage}`);
      } else if (error.request) {
        throw new Error('Không thể kết nối tới máy chủ Gemini. Vui lòng kiểm tra kết nối mạng của bạn.');
      } else {
        throw new Error(`Lỗi khi gửi yêu cầu tới Gemini: ${error.message}`);
      }
    }
  }
};

export default chatService; 