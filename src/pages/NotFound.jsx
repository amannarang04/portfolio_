import { motion } from 'framer-motion';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-7xl font-bold text-cyan-500 mb-4">404</h1>
        <p className="text-2xl text-white mb-8 font-mono">
          ERROR: PAGE NOT FOUND
        </p>
        <a href="/" className="cyber-btn">
          Return to HOME
        </a>
      </motion.div>
    </div>
  );
};

export default NotFound;
