import React from 'react';
import { Empty } from 'antd';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  message?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ 
  message = "No records found" 
}) => {
  return (
    <div className={styles.emptyState}>
      <Empty description={message} />
    </div>
  );
};

export default EmptyState;
