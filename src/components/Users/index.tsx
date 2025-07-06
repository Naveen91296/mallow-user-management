import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Input, Button, Segmented, Modal, Drawer, Form } from "antd";
import { AppstoreOutlined, UnorderedListOutlined } from "@ant-design/icons";
import {
  getUsersListAction,
  setSearchStringAction,
  deleteUserAction,
  updateUserAction,
  createUserAction,
} from "../../redux/actions/userActions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Pagination, LoadingSpinner } from "../ui";
import DeleteModalContent from "./DeleteModalContent";
import UserForm from "./UserForm";
import { modalCreator } from "../../redux/creators/modalCreators";
import { drawerCreator } from "../../redux/creators/drawerCreator";
import styles from "./UserLayout.module.css";
import { getUsersListCreator } from "../../redux/creators/userCreators";

const UserLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const { usersList, searchString } = useAppSelector((state) => state.user);
  const { modalData } = useAppSelector((state) => state.modal);
  const { drawerData } = useAppSelector((state) => state.drawer);
  const deleteUser = modalData?.DELETE_USER || null;
  const createUpdateUser = drawerData?.CREATE_UPDATE_USER;
  const [currentPage, setCurrentPage] = useState(1);
  const isEditMode = Object.keys(createUpdateUser || {}).length > 0;

  // Check if we're on table or card view
  const currentView = location.pathname.includes("table") ? "table" : "cards";

  useEffect(() => {
    dispatch(getUsersListAction(1));
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchStringAction(e.target.value));
  };

  const handleCreateUser = () => {
    dispatch(
      drawerCreator({
        CREATE_UPDATE_USER: {},
      })
    );
  };

  const handleViewChange = (value: string | number) => {
    navigate(`/users/${value}`);
  };

  const refreshUsersList = async (page: number = currentPage) => {
    await dispatch(getUsersListCreator(null));
    await dispatch(setSearchStringAction(""));
    await dispatch(getUsersListAction(page));
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    refreshUsersList(page);
  };

  const closeModal = () => {
    dispatch(
      modalCreator({
        DELETE_USER: null,
      })
    );
  };

  const confirmDeleteUser = async () => {
    if (deleteUser) {
      await dispatch(deleteUserAction(deleteUser.id));
      refreshUsersList();
      closeModal();
    }
  };

  const closeDrawer = () => {
    dispatch(
      drawerCreator({
        CREATE_UPDATE_USER: null,
      })
    );
    form.resetFields();
  };

  const handleFormSubmit = async (values: any) => {
    if (isEditMode) {
      await dispatch(updateUserAction({ ...createUpdateUser, ...values }));
    } else {
      await dispatch(createUserAction(values));
    }
    closeDrawer();
    refreshUsersList(currentPage);
  };

  const handleFormCancel = () => {
    closeDrawer();
  };

  // Show full page loader when usersList is null and on page 1
  if (!usersList && currentPage === 1) {
    return <LoadingSpinner />;
  }

  const renderHeader = () => (
    <div className={styles.header}>
      <div className={styles.headerLeft}>
        <h1 className={styles.title}>Users</h1>
      </div>
      <div className={styles.headerRight}>
        <Input.Search
          placeholder="Type search text"
          value={searchString}
          onChange={handleSearch}
          allowClear
          className={styles.searchInput}
          disabled={!usersList || usersList.total === 0}
        />
        <Button
          type="primary"
          onClick={handleCreateUser}
          className={styles.createButton}
        >
          Create User
        </Button>
      </div>
    </div>
  );

  const renderViewToggle = () => (
    <Segmented
      value={currentView}
      onChange={handleViewChange}
      options={[
        {
          label: "Table",
          value: "table",
          icon: <UnorderedListOutlined />,
        },
        {
          label: "Card",
          value: "cards",
          icon: <AppstoreOutlined />,
        },
      ]}
      className={`${styles.viewToggle} custom-segmented`}
    />
  );

  const renderContent = () => (
    <div className={styles.content}>
      <Outlet />
    </div>
  );

  const renderPagination = () =>
    usersList?.total > 0 && (
      <Pagination
        current={currentPage}
        total={usersList.total}
        pageSize={usersList.per_page || 6}
        onChange={handlePageChange}
      />
    );

  return (
    <div className={styles.userLayout}>
      {renderHeader()}
      {renderViewToggle()}
      {renderContent()}
      {renderPagination()}
      <Modal
        title="Confirm Delete"
        open={!!deleteUser}
        onCancel={closeModal}
        footer={[
          <Button key="cancel" onClick={closeModal}>
            Cancel
          </Button>,
          <Button
            key="delete"
            type="primary"
            danger
            onClick={confirmDeleteUser}
          >
            Delete
          </Button>,
        ]}
      >
        <DeleteModalContent user={deleteUser} />
      </Modal>
      <Drawer
        title={isEditMode ? "Edit User" : "Create New User"}
        width={400}
        onClose={closeDrawer}
        open={!!createUpdateUser}
        footer={
          <div className={styles.drawerFooter}>
            <Button onClick={handleFormCancel}>Cancel</Button>
            <Button type="primary" onClick={() => form.submit()}>
              Submit
            </Button>
          </div>
        }
      >
        <UserForm
          form={form}
          onFinish={handleFormSubmit}
          initialValues={createUpdateUser || {}}
          isEditMode={isEditMode}
        />
      </Drawer>
    </div>
  );
};

export default UserLayout;
