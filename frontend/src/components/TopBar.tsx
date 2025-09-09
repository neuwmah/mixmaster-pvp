"use client"
import { motion } from 'framer-motion'

const marqueeItems = [
  { text: 'Create your character', emoji: '👥' },
  { text: 'Create your team', emoji: '🐍' },
  { text: 'Go fight', emoji: '⚔️' },
  { text: 'Get rank', emoji: '⭐' },
  { text: 'Get castles', emoji: '🏰' },
  { text: '100% FREE', emoji: '💰' },
  { text: 'Coming soon', emoji: '💤' },
]

const marqueeVariants = {
  animate: {
    x: [0, -1024],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 20,
        ease: 'linear',
      },
    },
  },
}

const TopBar = () => {
  const renderMarqueeItems = (startKey = 0) =>
    marqueeItems.map((item, index) => (
      <p key={startKey + index} className="flex mx-[4rem]">
        {item.text}
        <span className="translate-y-[-.2rem] ml-[.8rem]">{item.emoji}</span>
      </p>
    ))

  return (
    <div className="
      top-bar 
      h-[3.2rem] w-full
      overflow-x-hidden
      bg-[var(--gray-0)]
    ">
      <div className="container">
        <div className="
          text
          text-sm font-bold text-[var(--white)] 
          flex items-center justify-start
          w-full
          whitespace-nowrap 
        ">
          <motion.div
            className="flex"
            variants={marqueeVariants}
            animate="animate"
          >
            {renderMarqueeItems()}
            {renderMarqueeItems(marqueeItems.length)}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default TopBar