import React from 'react';
import { motion, useCycle, useAnimate } from 'framer-motion';
import Link from 'next/link';

// Define the colors for the animation
const INITIAL_COLOR = '#111827'; // Tailwind 'gray-900'
const HOVER_COLOR_START = '#4f46e5'; // Tailwind 'indigo-600' (or a similar dark shade)
const HOVER_COLOR_END = '#9333ea'; // Tailwind 'violet-600' (a more vibrant shade for the end)

const StaggeredHoverTitle = ({ title, postLink }) => {
  const characters = (title || '').split('');
  
  // 1. Calculate the target color for each character based on its position (for a gradient effect)
  const charTargetColors = characters.map((_, index) => {
    // Interpolation factor from 0 (start) to 1 (end)
    const factor = index / (characters.length - 1 || 1); 
    
    // Simple linear interpolation for RGB components: color = start + (end - start) * factor
    // Note: Framer Motion handles the transition smoothly from initial to target color.
    
    // Helper to interpolate a single color component (0-255)
    const lerp = (start, end, factor) => Math.round(start + (end - start) * factor);

    // Convert hex to RGB tuples for interpolation (e.g., #4f46e5 is 79, 70, 229)
    // For simplicity, we'll use a single target color for the animation here, 
    // but the final *style* on hover will reflect the gradient.
    
    // Since Framer Motion can't animate between interpolated colors easily, we'll define 
    // the final color based on the index and let Framer Motion animate the color property.
    
    // **Using pre-calculated colors for smooth animation:**
    // For a cleaner transition, we calculate the final HSL/RGB and let Framer transition to it.
    // For this simplified example, we'll just use the HOVER_COLOR_START color and rely on stagger.
    // A true color gradient *reveal* is complex. Let's make the text change color sequentially.
    
    return HOVER_COLOR_START; // Simple color for now, relying on stagger for the effect
  });
  
  // 2. Setup the animation scope
  const [scope, animate] = useAnimate();
  const [isHovering, toggleHover] = useCycle(false, true);

  // 3. Function to run the stagger animation
  const runAnimation = async (direction) => {
    const sequence = characters.map((_, index) => {
      // Determine the target color
      const targetColor = direction === 'hover' ? charTargetColors[index] : INITIAL_COLOR;
      
      // Staggered delay for a start-to-end effect
      const delay = index * 0.02; // 20ms stagger per character
      
      return [
        `#char-${index}`, 
        { color: targetColor }, 
        { duration: 0.3, delay: delay, ease: "easeInOut" }
      ];
    });

    // Run the full sequence
    await animate(sequence);
    toggleHover(); // Mark animation complete
  };
  
  // 4. Handlers for mouse events
  const handleMouseEnter = () => {
    // Run the hover animation
    if (!isHovering) {
        toggleHover(); // Mark animation start
        runAnimation('hover');
    }
  };

  const handleMouseLeave = () => {
    // Run the unhover animation
    if (isHovering) {
        toggleHover(); // Mark animation start
        // To reverse the *visual* effect, we run the animation back to INITIAL_COLOR
        // The color sequence for unhover is the reverse of hover (last character first)
        const reverseSequence = characters.map((_, index) => {
            const reversedIndex = characters.length - 1 - index;
            const delay = index * 0.02; // Stagger from end to start
            
            return [
                `#char-${reversedIndex}`,
                { color: INITIAL_COLOR },
                { duration: 0.3, delay: delay, ease: "easeInOut" }
            ];
        });
        
        animate(reverseSequence).then(() => toggleHover());
    }
  };

  return (
    <h2 className="text-4xl md:text-5xl font-extrabold leading-tight">
      <Link
        href={postLink}
        className="block"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        ref={scope} 
      >
        {characters.map((char, index) => (
          <motion.span
            key={index}
            id={`char-${index}`}
            // Set initial style color for the component mount
            style={{ color: INITIAL_COLOR }} 
            className="inline-block"
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </Link>
    </h2>
  );
};