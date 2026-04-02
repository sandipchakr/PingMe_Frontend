import { motion } from "framer-motion";

const SkeletonCard = () => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-md">
      <motion.div
        className="h-40 bg-gray-700 rounded-md mb-4"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
      
      <motion.div
        className="h-4 bg-gray-700 rounded w-3/4 mb-2"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
      
      <motion.div
        className="h-4 bg-gray-700 rounded w-1/2"
        animate={{ opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 1.2, repeat: Infinity }}
      />
    </div>
  );
};

export default SkeletonCard;