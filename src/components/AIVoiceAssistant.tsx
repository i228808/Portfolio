import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MicrophoneIcon, StopIcon } from '@heroicons/react/24/outline';
import { HfInference } from '@huggingface/inference';

const AIVoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const hf = new HfInference(import.meta.env.VITE_HUGGINGFACE_API_KEY);

  useEffect(() => {
    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        await processAudio(audioBlob);
      };

      mediaRecorder.start();
      setIsListening(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
      setIsListening(false);
    }
  };

  const processAudio = async (audioBlob: Blob) => {
    setIsProcessing(true);
    try {
      // Convert audio to text using Hugging Face's Whisper model
      const transcription = await hf.automaticSpeechRecognition({
        model: 'openai/whisper-large-v2',
        data: await audioBlob.arrayBuffer(),
      });

      setTranscript(transcription);

      // Generate response using Hugging Face's GPT model
      const aiResponse = await hf.textGeneration({
        model: 'gpt2',
        inputs: transcription,
        parameters: {
          max_length: 100,
          temperature: 0.7,
          top_p: 0.9,
        },
      });

      setResponse(aiResponse.generated_text);
    } catch (error) {
      console.error('Error processing audio:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={isListening ? stopRecording : startRecording}
        className={`p-4 rounded-full ${
          isListening
            ? 'bg-red-500 hover:bg-red-600'
            : 'bg-accent hover:bg-accent-dark'
        } text-white shadow-lg transition-colors duration-200`}
      >
        {isListening ? (
          <StopIcon className="w-6 h-6" />
        ) : (
          <MicrophoneIcon className="w-6 h-6" />
        )}
      </motion.button>

      <AnimatePresence>
        {(transcript || response) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-16 left-0 w-80 bg-background/90 backdrop-blur-lg rounded-lg p-4 shadow-xl border border-accent/10"
          >
            {transcript && (
              <div className="mb-4">
                <h3 className="text-sm font-medium text-accent mb-2">You said:</h3>
                <p className="text-text/80">{transcript}</p>
              </div>
            )}
            {response && (
              <div>
                <h3 className="text-sm font-medium text-accent mb-2">AI Response:</h3>
                <p className="text-text/80">{response}</p>
              </div>
            )}
            {isProcessing && (
              <div className="flex items-center space-x-2 mt-4">
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-accent rounded-full animate-bounce delay-200" />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIVoiceAssistant; 