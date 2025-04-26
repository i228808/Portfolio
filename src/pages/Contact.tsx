import { motion } from 'framer-motion';
import { useForm, ValidationError } from '@formspree/react';

const Contact: React.FC = () => {
  const [state, handleSubmit] = useForm("xnndnbqk");

  return (
    <div className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="heading">Get in Touch</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <p className="flex items-center space-x-3">
                  <span className="text-accent">•</span>
                  <span>Email: your.email@example.com</span>
                </p>
                <p className="flex items-center space-x-3">
                  <span className="text-accent">•</span>
                  <span>Location: Your Location</span>
                </p>
                <p className="flex items-center space-x-3">
                  <span className="text-accent">•</span>
                  <span>LinkedIn: linkedin.com/in/yourprofile</span>
                </p>
                <p className="flex items-center space-x-3">
                  <span className="text-accent">•</span>
                  <span>GitHub: github.com/yourusername</span>
                </p>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-2 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    required
                  />
                  <ValidationError 
                    prefix="Name" 
                    field="name"
                    errors={state.errors}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-2 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    required
                  />
                  <ValidationError 
                    prefix="Email" 
                    field="email"
                    errors={state.errors}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    className="w-full px-4 py-2 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    required
                  ></textarea>
                  <ValidationError 
                    prefix="Message" 
                    field="message"
                    errors={state.errors}
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={state.submitting}
                  className="btn btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state.submitting ? 'Sending...' : 'Send Message'}
                </button>
                {state.succeeded && (
                  <p className="text-green-500 mt-4">
                    Thanks for your message! I'll get back to you soon.
                  </p>
                )}
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact; 