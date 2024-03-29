import styles from "../../styles/_AnimatedContainer.module.scss";
import { motion, AnimatePresence } from "framer-motion";

// eslint-disable-next-line react/prop-types
const AnimatedContainer = ({ subClass, children }) => {
  return (
    <AnimatePresence>
      <motion.div
        className={`${styles.animatedContainer} ${subClass}`}
        variants={{
          hidden: { opacity: 0, visibility: "hidden" },
          shown: { opacity: 1, visibility: "visible" },
        }}
        initial="hidden"
        animate="shown"
        exit="hidden"
        transition={{ type: "spring", duration: 0.6 }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
export default AnimatedContainer;
