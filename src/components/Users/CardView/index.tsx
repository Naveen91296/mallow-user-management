import { useMemo } from "react";
import { Avatar, Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useAppSelector, useAppDispatch } from "../../../redux/hooks";
import { filterUsersBySearch } from "../../../utils/userFilters";
import { EmptyState, LoadingSpinner } from "../../ui";
import { modalCreator } from "../../../redux/creators/modalCreators";
import styles from "./CardView.module.css";
import { drawerCreator } from "../../../redux/creators/drawerCreator";

const CardView = () => {
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

  // Show loader when usersList is null
  if (!usersList) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.cardContainer}>
      {filteredUsers.length === 0 ? (
        <EmptyState />
      ) : (
        <div className={styles.cardsGrid}>
          {filteredUsers.map((user) => (
            <div key={user.id} className={styles.cardWrapper}>
              <Card className={styles.userCard} bodyStyle={{ padding: 0 }}>
                <div className={styles.cardContent}>
                  <div className={styles.avatarContainer}>
                    <Avatar
                      src={user.avatar}
                      alt={`${user.first_name} ${user.last_name}`}
                      size={64}
                      className={styles.avatar}
                    />
                    <div className={styles.hoverOverlay}>
                      <div className={styles.actionIcons}>
                        <div
                          className={styles.iconButton}
                          onClick={() => handleEditUser(user.id)}
                        >
                          <EditOutlined />
                        </div>
                        <div
                          className={styles.iconButton}
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <DeleteOutlined />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.userInfo}>
                    <h3 className={styles.userName}>
                      {user.first_name} {user.last_name}
                    </h3>
                    <p className={styles.userEmail}>{user.email}</p>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardView;
