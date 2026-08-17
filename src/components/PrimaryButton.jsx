import { motion } from "framer-motion";

export default function PrimaryButton({ children, onClick, disabled, className = "" }) {
  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className={
        "w-full rounded-2xl px-6 py-3.5 font-semibold text-white text-base " +
        "bg-gradient-to-r from-pink-500 to-fuchsia-500 shadow-lg shadow-pink-500/30 " +
        "disabled:opacity-40 disabled:pointer-events-none transition-opacity " +
        className
      }
    >
      {children}
    </motion.button>
  );
}
