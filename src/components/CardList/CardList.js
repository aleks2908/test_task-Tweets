import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { Card } from "../Card/Card";
import css from "./CardList.module.css";

import Dropdown from "react-dropdown";
import "react-dropdown/style.css";

export const CardList = () => {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState("all");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  axios.defaults.baseURL = "https://6442c0c733997d3ef918c74f.mockapi.io";

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.log(error.message);
        toast.error("Request error.");
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const onCardChange = (id, followers, active) => {
    const updateData = active
      ? { followers: followers - 1, active: "" }
      : { followers: followers + 1, active: "active" };

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.put(`/users/${id}`, {
          ...updateData,
        });

        const userChangeArray = users.map((user) => {
          if (user.id === id) {
            return response.data;
          }
          return user;
        });

        setUsers(userChangeArray);
      } catch (error) {
        console.log(error.message);
        toast.error("Request error.");
      }
      setIsLoading(false);
    };
    fetchData();
  };

  const onLoadMoreClick = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleDropdown = (value) => {
    setPage(1);
    setShowUsers(value.value);
  };

  const filteredUsers = useMemo(() => {
    switch (showUsers) {
      case "follow":
        return users.filter((user) => !user.active);
      case "followings":
        return users.filter((user) => user.active);
      default:
        return users;
    }
  }, [showUsers, users]);

  const options = [
    { value: "all", label: "Show all" },
    { value: "follow", label: "Show follow" },
    { value: "followings", label: "Show followings" },
  ];

  return (
    <>
      <Dropdown
        placeholderClassName={css.placeholderClassName}
        className={css.className}
        controlClassName={css.controlClassName}
        menuClassName={css.menuClassName}

        options={options}
        onChange={handleDropdown}
        value={showUsers}
        placeholder="Show Tweets"
      />

      {isLoading && (
        <div className={css.spiner}>
          <ThreeDots
            height="25"
            width="116"
            color="#5736a3"
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </div>
      )}

      <ul className={css.cardList}>
        {filteredUsers.length > 0 &&
          filteredUsers.slice(0, page * 4).map((user) => (
            <li key={user.id}>
              <Card user={user} onCardChange={onCardChange} />
            </li>
          ))}
      </ul>

      {page * 4 < filteredUsers.length && (
        <button
          className={css.loadMoreButton}
          onClick={onLoadMoreClick}
          type="button"
        >
          Load More
        </button>
      )}
    </>
  );
};
