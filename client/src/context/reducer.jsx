const reducer = (state, action) => {
  if (action.type === "USER_SUCCESS") {
    // console.log(action.payload)
    return { ...state, user: action.payload.user, token: action.payload.token };
  }
  if (action.type === "GET_ALL_POSTS") {
    return { ...state, posts: action.payload.posts };
  }

  throw new Error("no matching action type");
};

export default reducer;
