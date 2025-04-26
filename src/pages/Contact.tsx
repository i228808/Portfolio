import { motion } from 'framer-motion';
import { useState, FormEvent, ChangeEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    
    fetch('https://formspree.io/f/xnndnbqk', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        alert('Message sent successfully!');
        form.reset();
      } else {
        throw new Error('Network response was not ok');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('There was a problem sending your message. Please try again.');
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

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
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    required
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
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-2 bg-secondary rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact; 