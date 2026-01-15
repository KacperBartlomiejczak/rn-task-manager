/**
 * Reusable Framer Motion animation variants and transitions
 * for consistent animations throughout the application
 */

import type { Transition, Variants } from "framer-motion";

// ============================================
// TRANSITION PRESETS
// ============================================

export const springTransition: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 25,
};

export const smoothTransition: Transition = {
  type: "spring",
  stiffness: 400,
  damping: 17,
};

export const slowSpring: Transition = {
  type: "spring",
  stiffness: 100,
  damping: 30,
};

export const easeTransition: Transition = {
  duration: 0.3,
  ease: [0.22, 1, 0.36, 1] as any,
};

// ============================================
// ANIMATION VARIANTS
// ============================================

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: easeTransition,
  },
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: easeTransition,
  },
};

export const fadeInDown: Variants = {
  hidden: { opacity: 0, y: -20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: easeTransition,
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springTransition,
  },
};

export const slideInFromLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springTransition,
  },
  exit: {
    opacity: 0,
    x: -50,
    transition: easeTransition,
  },
};

export const slideInFromRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: springTransition,
  },
  exit: {
    opacity: 0,
    x: 50,
    transition: easeTransition,
  },
};

// ============================================
// CONTAINER VARIANTS (for stagger effects)
// ============================================

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.05,
    },
  },
};

export const staggerContainerFast: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: easeTransition,
  },
};

// ============================================
// HOVER & TAP ANIMATIONS (for whileHover/whileTap)
// ============================================

export const hoverLift = {
  scale: 1.05,
  y: -4,
  transition: smoothTransition,
};

export const hoverScale = {
  scale: 1.02,
  transition: smoothTransition,
};

export const tapScale = {
  scale: 0.98,
};

export const tapScaleSmall = {
  scale: 0.95,
};

// ============================================
// LOOPING ANIMATIONS
// ============================================

export const floatingAnimation = {
  y: [0, -8, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: "easeInOut" as any,
  },
};

export const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut" as any,
  },
};

export const rotateAnimation = {
  rotate: [0, 360],
  transition: {
    duration: 20,
    repeat: Infinity,
    ease: "linear" as any,
  },
};
