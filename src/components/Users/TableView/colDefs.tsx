import { Avatar, Button } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { User } from "../../../redux/reduxTypes/api";
import styles from "./TableView.module.css";

export const getTableColumns = (
  handleDeleteUser: (userId: number) => void,
  handleEditUser: (userId: number) => void
): ColumnsType<User> => [
  {
    title: "",
    dataIndex: "avatar",
    key: "avatar",
    width: 80,
    render: (avatar: string, record: User) => (
      <Avatar src={avatar} alt={`${record.first_name} ${record.last_name}`} />
    ),
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
    render: (email: string) => <span className={styles.email}>{email}</span>,
  },
  {
    title: "First Name",
    dataIndex: "first_name",
    key: "first_name",
  },
  {
    title: "Last Name",
    dataIndex: "last_name",
    key: "last_name",
  },
  {
    title: "Action",
    key: "actions",
    width: 120,
    render: (_: any, record: User) => (
      <div className={styles.actions}>
        <Button
          type="primary"
          size="small"
          className={styles.editButton}
          onClick={() => {
            handleEditUser(record.id);
          }}
        >
          Edit
        </Button>
        <Button
          type="primary"
          danger
          size="small"
          className={styles.deleteButton}
          onClick={() => {
            handleDeleteUser(record.id);
          }}
        >
          Delete
        </Button>
      </div>
    ),
  },
];
