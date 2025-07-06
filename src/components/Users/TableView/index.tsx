import { useMemo } from "react";
import { Table } from "antd";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { filterUsersBySearch } from "../../../utils/userFilters";
import { EmptyState, LoadingSpinner } from "../../ui";
import { getTableColumns } from "./colDefs";
import styles from "./TableView.module.css";
import { modalCreator } from "../../../redux/creators/modalCreators";
import { drawerCreator } from "../../../redux/creators/drawerCreator";

const TableView = () => {
  const dispatch = useAppDispatch();
  const { usersList, searchString } = useAppSelector((state) => state.user);

  const filteredUsers = useMemo(() => {
    return filterUsersBySearch(usersList?.data || [], searchString);
  }, [usersList?.data, searchString]);

  const handleDeleteUser = async (userId: number) => {
    const user = filteredUsers.find((u) => u.id === userId);
    if (user) {
      dispatch(
        modalCreator({
          DELETE_USER: user,
        })
      );
    }
  };

  const handleEditUser = (userId: number) => {
    const user = filteredUsers.find((u) => u.id === userId);
    if (user) {
      dispatch(
        drawerCreator({
          CREATE_UPDATE_USER: user,
        })
      );
    }
  };

  const columns = getTableColumns(handleDeleteUser, handleEditUser);

  // Show loader when usersList is null
  if (!usersList) {
    return <LoadingSpinner />;
  }

  if (filteredUsers.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className={styles.tableContainer}>
      <Table
        columns={columns}
        dataSource={filteredUsers}
        pagination={false}
        rowKey="id"
        className={styles.userTable}
        size="middle"
        scroll={{ y: "calc(100vh - 300px)" }}
      />
    </div>
  );
};

export default TableView;
