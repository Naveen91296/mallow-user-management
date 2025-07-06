import { Spin } from "antd";
import styles from "./LoadingSpinner.module.css";

interface LoadingSpinnerProps {
  size?: "small" | "default" | "large";
  tip?: string;
  minHeight?: string;
}

const LoadingSpinner = ({
  size = "large",
  tip = "Loading...",
  minHeight = "400px",
}: LoadingSpinnerProps) => (
  <div className={styles.container} style={{ minHeight }}>
    <Spin size={size} tip={tip} />
  </div>
);

export default LoadingSpinner;
