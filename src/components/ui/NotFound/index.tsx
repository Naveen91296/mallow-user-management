import { Result, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/routeConstants";
import styles from "./NotFound.module.css";

const NotFound = () => {
  const navigate = useNavigate();

  const handleBackHome = () => {
    navigate(ROUTES.USERS);
  };

  return (
    <div className={styles.notFoundContainer}>
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="primary" onClick={handleBackHome}>
            Back Home
          </Button>
        }
        className={styles.notFoundResult}
      />
    </div>
  );
};

export default NotFound;
