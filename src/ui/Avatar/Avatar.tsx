import styles from "./style.module.css";
import image from "../../assets/placeholder.jpg";

import { useAuth } from "../../context/authContext";

function Avatar() {
  const { userAvatar } = useAuth();
  return (
    <img
      className={styles.avatar}
      src={userAvatar ? userAvatar : image}
      alt="Avatar"
    />
  );
}

export default Avatar;
