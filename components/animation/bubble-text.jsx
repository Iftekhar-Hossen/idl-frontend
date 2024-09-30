import styles from "@/styles/bubble.module.css";

export const BubbleText = ({ children, index }) => {
  return (
    <span className={styles.hoverText} key={index}>
      {children}
    </span>
  );
};
