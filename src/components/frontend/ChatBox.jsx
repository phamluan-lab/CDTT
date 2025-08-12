import React, { useState, useRef, useEffect } from 'react';
import chatService from '../../services/chatService';

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Danh sách câu trả lời mặc định
  const defaultResponses = {
    'chào': 'Xin chào! Tôi có thể giúp gì cho bạn?',
    'hello': 'Xin chào! Tôi có thể giúp gì cho bạn?',
    'hi': 'Xin chào! Tôi có thể giúp gì cho bạn?',
    'giá': 'Sản phẩm của chúng tôi có nhiều mức giá khác nhau. Bạn có thể xem chi tiết giá tại trang sản phẩm.',
    'ship': 'Chúng tôi giao hàng toàn quốc. Phí ship từ 20.000đ - 50.000đ tùy khu vực.',
    'vận chuyển': 'Chúng tôi giao hàng toàn quốc. Phí ship từ 20.000đ - 50.000đ tùy khu vực.',
    'thanh toán': 'Chúng tôi chấp nhận thanh toán qua: Tiền mặt, Chuyển khoản, Thẻ tín dụng, Ví điện tử.',
    'đổi trả': 'Chúng tôi có chính sách đổi trả trong vòng 7 ngày nếu sản phẩm có lỗi từ nhà sản xuất.',
    'bảo hành': 'Sản phẩm được bảo hành chính hãng 12 tháng.',
    'giờ làm việc': 'Chúng tôi làm việc từ 8:00 - 22:00 tất cả các ngày trong tuần.',
    'địa chỉ': 'Cửa hàng của chúng tôi tại: 123 Đường ABC, Quận XYZ, TP. HCM',
    'số điện thoại': 'Hotline hỗ trợ: 1900 1234',
    'email': 'Email liên hệ: support@example.com',
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getAIResponse = async (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Kiểm tra từng từ khóa trong tin nhắn
    for (const [keyword, response] of Object.entries(defaultResponses)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }

    // Nếu không tìm thấy từ khóa phù hợp, sử dụng Gemini
    try {
      const geminiResponse = await chatService.getChatGPTResponse(message);
      return geminiResponse;
    } catch (error) {
      console.error('Error getting AI response:', error);
      // Trả về lỗi trực tiếp từ service nếu có
      return error.message || 'Xin lỗi, đã có lỗi khi kết nối với AI. Vui lòng thử lại sau.';
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (newMessage.trim() === '' || isLoading) return;

    const message = {
      id: Date.now(),
      text: newMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString()
    };

    setMessages([...messages, message]);
    setNewMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await getAIResponse(newMessage);
      const responseMessage = {
        id: Date.now() + 1,
        text: aiResponse,
        sender: 'admin',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, responseMessage]);
    } catch (error) {
      console.error('Error handling message from AI:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Xin lỗi, không thể nhận phản hồi từ AI. Vui lòng kiểm tra kết nối mạng hoặc thử lại sau.',
        sender: 'admin',
        timestamp: new Date().toLocaleTimeString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Nút Chat */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 transition-colors"
      >
        {isOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* Cửa sổ Chat */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-white rounded-lg shadow-xl">
          {/* Tiêu đề Chat */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg">
            <h3 className="font-semibold">Hỗ trợ trực tuyến</h3>
            <p className="text-sm">Bạn có thể hỏi về: giá cả, vận chuyển, thanh toán, đổi trả, bảo hành...</p>
          </div>

          {/* Khu vực tin nhắn */}
          <div className="h-96 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  <p>{message.text}</p>
                  <span className="text-xs opacity-75 mt-1 block">
                    {message.timestamp}
                  </span>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 rounded-lg p-3">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Ô nhập tin nhắn */}
          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Nhập tin nhắn của bạn..."
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                className={`bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
                }`}
                title="Gửi tin nhắn"
                disabled={isLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                </svg>
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatBox; 