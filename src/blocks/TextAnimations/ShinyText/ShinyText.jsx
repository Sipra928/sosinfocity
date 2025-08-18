import { motion } from "framer-motion";

const ShinyText = ({ text, className = "" }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}   // start hidden & below
      animate={{ opacity: 1, y: 0 }}    // move to normal position
      transition={{ duration: 1.5, ease: "easeOut" }} // smooth fade-in
      className={`text-[#b5b5b5a4] inline-block   ${className}`}
    >
      {text}
    </motion.div>
  );
};

export default ShinyText;
