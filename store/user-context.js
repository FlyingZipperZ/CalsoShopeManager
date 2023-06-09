import { createContext, useState } from "react";

export const UserContext = createContext({
  users: [],
  addUser: { users },
  setUser: (users) => {},
  deleteUser: (id) => {},
  updateUser: (id) => {},
});

function userReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return [action.payload, ...state];
    case "SET":
      return action.payload;
    case "UPDATE":
      const updatableUserIndex = state.findIndex(
        (user) => user.id === action.payload.id
      );
      const updatableUser = state[updatableUserIndex];
      const updatedItem = { ...updatableUser, ...action.payload.data };
      const updateUsers = [...state];
      updateUsers[updatableUserIndex] = updatedItem;
      return updateUsers;
    case "DELETE":
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
}
