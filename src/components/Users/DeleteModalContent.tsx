import { Avatar } from "antd";
import type { User } from "../../redux/reduxTypes/api";
import userLayoutStyles from "./UserLayout.module.css";

interface DeleteModalContentProps {
  user: User | null;
}

const DeleteModalContent = ({ user }: DeleteModalContentProps) => {
  return (
    <>
      {user && (
        <div className={userLayoutStyles.deleteUserInfo}>
          <Avatar
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            size={48}
          />
          <div className={userLayoutStyles.deleteUserDetails}>
            <div className={userLayoutStyles.deleteUserName}>
              {user.first_name} {user.last_name}
            </div>
            <div className={userLayoutStyles.deleteUserEmail}>{user.email}</div>
          </div>
        </div>
      )}
      Are you sure you want to delete this user? This action cannot be undone.
    </>
  );
};

export default DeleteModalContent;
