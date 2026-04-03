import { motion } from "framer-motion";

const pulse = {
  animate: { opacity: [0.3, 0.6, 0.3] },
  transition: { duration: 1, repeat: Infinity },
};

const SkeletonCard = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#013e7b] to-[#123] border-r border-[#55a7f9] border-y-[#043efc]
     p-3 rounded-xl shadow flex flex-col justify-center items-start gap-1 mx-2">

      {/* Profile row — avatar + name + time */}
      <div className="flex items-center gap-2 w-full">
        <motion.div {...pulse} className="h-9 w-9 rounded-full bg-gray-600/50" />
        <motion.div {...pulse} className="h-3 w-24 rounded bg-gray-600/50" />
        <motion.div {...pulse} className="h-3 w-16 rounded bg-gray-600/50" />
      </div>

      {/* Title */}
      <motion.div {...pulse} className="h-5 w-3/4 rounded bg-gray-600/50 mt-1" />

      {/* Cover image */}
      <motion.div {...pulse} className="w-full h-[40vh] rounded bg-gray-600/50 mt-1" />

      {/* Content preview + read more */}
      <div className="flex gap-2 w-full mt-1">
        <motion.div {...pulse} className="h-3 w-32 rounded bg-gray-600/50" />
        <motion.div {...pulse} className="h-3 w-14 rounded bg-gray-500/40" />
      </div>

      {/* Like / Comment row */}
      <div className="w-full flex justify-evenly items-center mt-2">
        <div className="flex items-center gap-1">
          <motion.div {...pulse} className="h-5 w-5 rounded-full bg-gray-600/50" />
          <motion.div {...pulse} className="h-3 w-4 rounded bg-gray-600/50" />
        </div>
        <div className="flex items-center gap-1">
          <motion.div {...pulse} className="h-5 w-5 rounded-full bg-gray-600/50" />
          <motion.div {...pulse} className="h-3 w-4 rounded bg-gray-600/50" />
        </div>
      </div>

    </div>
  );
};

export default SkeletonCard;