const reducer = (state, action) => {
  if (action.type === "USER_SUCCESS") {
    // console.log(action.payload)
    return { ...state, user: action.payload.user, token: action.payload.token };
  }

  throw new Error("no matching action type");
};

export default reducer;
