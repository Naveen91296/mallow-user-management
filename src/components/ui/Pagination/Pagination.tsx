import React from "react";
import { Pagination as AntPagination } from "antd";
import styles from "./Pagination.module.css";

interface PaginationProps {
  current: number;
  total: number;
  pageSize: number;
  onChange: (page: number, pageSize?: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  current,
  total,
  pageSize,
  onChange,
}) => {
  return (
    <div className={styles.paginationContainer}>
      <AntPagination
        current={current}
        total={total}
        pageSize={pageSize}
        onChange={onChange}
        showSizeChanger={false}
        showQuickJumper={false}
        className={styles.pagination}
        simple={false}
      />
    </div>
  );
};

export default Pagination;
