import React from "react";
import styles from "./styles/searchIcon.module.scss";
const SearchIcon = () => {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.53839 14.1647C3.88397 14.1647 0.908691 11.1894 0.908691 7.53497C0.908691 3.88055 3.88397 0.905273 7.53839 0.905273C11.1928 0.905273 14.1681 3.88055 14.1681 7.53497C14.1681 11.1894 11.1928 14.1647 7.53839 14.1647ZM7.53839 1.87547C4.41435 1.87547 1.87889 4.4174 1.87889 7.53497C1.87889 10.6525 4.41435 13.1945 7.53839 13.1945C10.6624 13.1945 13.1979 10.6525 13.1979 7.53497C13.1979 4.4174 10.6624 1.87547 7.53839 1.87547Z"
        fill="#635DB0"
      />
      <path
        d="M14.3298 14.8115C14.2069 14.8115 14.084 14.7662 13.987 14.6692L12.6934 13.3756C12.5058 13.188 12.5058 12.8776 12.6934 12.69C12.881 12.5024 13.1914 12.5024 13.379 12.69L14.6726 13.9836C14.8602 14.1712 14.8602 14.4816 14.6726 14.6692C14.5756 14.7662 14.4527 14.8115 14.3298 14.8115Z"
        fill="#635DB0"
      />
    </svg>
  );
};

export default SearchIcon;
