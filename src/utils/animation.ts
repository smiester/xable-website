export const fadeInUp = "animate-fadeIn opacity-0 translate-y-4 transition-all duration-700 ease-out";
export const fadeIn = "animate-fadeIn opacity-0 transition-all duration-700 ease-out";
export const slideIn = "animate-slideIn opacity-0 -translate-x-4 transition-all duration-700 ease-out";
export const scaleIn = "animate-scaleIn opacity-0 scale-95 transition-all duration-500 ease-out";

export const staggerChildren = (index: number) => ({
  style: {
    animationDelay: `${index * 150}ms`,
  },
});