import { motion } from 'motion/react';

export default function Dock({ items, className = '' }) {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
      className={`flex items-center gap-2 sm:gap-4 px-4 py-3 bg-neutral-900/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl shadow-black/50 ${className}`}
    >
      {items.map((item, index) => (
        <NavIcon key={index} item={item} />
      ))}
    </motion.div>
  );
}

function NavIcon({ item }) {
  return (
    <motion.div
      whileHover={{ scale: 1.2, y: -2 }}
      whileTap={{ scale: 0.9 }}
      onClick={item.onClick}
      className={`relative p-2.5 sm:p-3 rounded-full cursor-pointer transition-all duration-300 group ${item.className}`}
    >
      {/* Active Indicator Glow */}
      {item.className.includes('!border-blue-500') && (
        <motion.div
          layoutId="active-pill"
          className="absolute inset-0 bg-blue-500/20 rounded-full blur-md"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}

      {/* Icon with hover color change */}
      <div className="relative z-10 text-white/50 group-hover:text-white transition-colors duration-300">
        {item.icon}
      </div>

      {/* Tooltip */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-900 border border-white/10 rounded-md text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap">
        {item.label}
      </div>
    </motion.div>
  );
}
