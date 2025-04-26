import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatBubbleLeftIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface Message {
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

const PORTFOLIO_CONTEXT = `You are an AI assistant helping visitors understand Abdullah Mansoor's portfolio. 
Abdullah is a Software Engineering student at FAST NUCES (6th semester) with expertise in:
- Artificial Intelligence & Machine Learning
- Formal Methods & Theorem Proving
- Full-Stack Development
- Game Development
- AI Agents Development

Key Projects:
1. AI-Powered Healthcare Platform (2024)
2. AI Fitness Coach Application (2024)
3. Advanced Chess Solver (2023)
4. Automated Test Case Generator (2023)
5. Z3 SMT Solver GUI (2023)
6. Custom Google Classroom (2023)
7. AR Property Platform (2023)
8. Multi-Threaded Ludo Game (2023)
9. Sudoku Solver (2023)

Education:
- Bachelor of Science in Software Engineering (FAST NUCES, 2022-Present)
- FSC Pre-Engineering (APSACS, 2020-2022, A+)
- Matriculation (APSACS, 2018-2020, A+)

Work Experience:
- Software Engineering Intern at Pakistan Tobacco Company (July 2025)
- Freelance Developer on Fiverr & Upwork (2023-Present)

Please provide helpful, concise responses about:
1. Abdullah's projects and technical expertise
2. Educational background and achievements
3. Work experience and skills
4. AI/ML and Formal Methods applications
5. Portfolio navigation and features
6. Technical implementation details

Keep responses under 100 words and focus on providing accurate, relevant information about Abdullah's portfolio and experience.`;

const AICollaboration = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Add initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        type: 'ai',
        content: "Hello! I'm here to help you learn about Abdullah's portfolio. You can ask me about his projects, skills, education, or work experience. How can I assist you today?",
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generatePrompt = (userInput: string) => {
    return `${PORTFOLIO_CONTEXT}\n\nVisitor's question: "${userInput}"`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isProcessing) return;

    const userMessage: Message = {
      type: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('API key not configured. Please set up your Gemini API key in the .env file.');
      }

      const prompt = generatePrompt(input.trim());
      
      // Call Gemini API with API key
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 150,
          },
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `API request failed: ${response.statusText}`);
      }

      const data = await response.json();
      const cleanResponse = data.candidates[0].content.parts[0].text.trim();

      const aiMessage: Message = {
        type: 'ai',
        content: cleanResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error: any) {
      console.error('Error generating AI response:', error);
      
      // Handle specific error cases
      if (error.message?.includes('API key not configured')) {
        setError('The AI assistant is not properly configured. Please contact the portfolio owner.');
      } else if (error.message?.includes('Failed to fetch')) {
        setError('Network error. Please check your internet connection and try again.');
      } else if (error.message?.includes('401')) {
        setError('Authentication error. Please contact the portfolio owner.');
      } else if (error.message?.includes('429')) {
        setError('Rate limit exceeded. Please try again in a few moments.');
      } else {
        setError('An error occurred. Please try again or rephrase your question.');
      }
      
      const errorMessage: Message = {
        type: 'ai',
        content: 'I apologize, but I encountered an error. Please try again or rephrase your question.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-4 rounded-full bg-accent text-white shadow-lg hover:shadow-xl 
                 hover:shadow-accent/20 transition-all duration-200"
        aria-label="Ask about the portfolio"
      >
        <ChatBubbleLeftIcon className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-16 right-0 w-96 bg-background/90 backdrop-blur-xl 
                     rounded-lg shadow-xl border border-accent/10 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-accent/10 bg-accent/5">
              <h3 className="text-lg font-semibold text-accent">Portfolio Assistant</h3>
              <p className="text-sm text-text/60">Ask me about Abdullah's experience and projects</p>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === 'user'
                        ? 'bg-accent text-white'
                        : 'bg-secondary/50 text-text'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    <span className="text-xs opacity-70 mt-1 block">
                      {message.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                </motion.div>
              ))}
              {isProcessing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-secondary/50 rounded-lg p-3">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-accent rounded-full animate-bounce delay-100" />
                      <div className="w-2 h-2 bg-accent rounded-full animate-bounce delay-200" />
                    </div>
                  </div>
                </motion.div>
              )}
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-500 text-sm text-center bg-red-500/10 p-2 rounded-lg"
                >
                  {error}
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-accent/10">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about projects, skills, or experience..."
                  className="flex-1 bg-secondary/50 rounded-lg px-4 py-2 text-text
                           placeholder:text-text/40 focus:outline-none focus:ring-2
                           focus:ring-accent/50 transition-all duration-200"
                  disabled={isProcessing}
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  disabled={!input.trim() || isProcessing}
                  className="p-2 rounded-lg bg-accent text-white disabled:opacity-50
                           disabled:cursor-not-allowed transition-all duration-200"
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AICollaboration; 