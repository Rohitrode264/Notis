import { useState } from 'react';
import { ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { DataItem } from '../../recoil/atoms/indiaDataAtom';

export const NewsDropdown = (item: DataItem) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="w-full max-w-4xl mb-4 font-sans text-base antialiased">
      <div 
        onClick={toggleOpen}
        className="w-full p-5 cursor-pointer rounded-t-xl bg-gradient-to-r from-black to-slate-900 text-gray-100 shadow-md flex justify-between items-center hover:bg-neutral-800 transition-colors"
      >
        <h3 className="font-semibold text-lg">{item.title}</h3>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </div>
      <div className="h-0.5 w-full bg-gradient-to-r from-gray-600 via-gray-500 to-gray-600" />
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: "auto", 
              opacity: 1,
              transition: {
                height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
                opacity: { duration: 0.8, delay: 0.2 }
              }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: {
                height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
                opacity: { duration: 0.2 }
              }
            }}
            className="overflow-hidden bg-neutral-900 rounded-b-xl text-gray-200"
          >
            <div className="px-6 py-5 border-t border-gray-700">
              <p className="mb-5 text-gray-300 text-[1.05rem] leading-relaxed">{item.summary}</p>
              <div className="border-t border-gray-700 pt-3">
                <p className="text-sm text-gray-400 mb-1">Source: {item.source}</p>
                <a 
                  href={item.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <ExternalLink size={16} className="mr-1" />
                  <span>Read full article</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};