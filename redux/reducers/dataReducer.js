const initialState = {
  totalLikes: 4,
  userName: "Alex",
};

export const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INCREASE_TOTAL_LIKE":
      return { ...state, totalLikes: state.totalLikes + 1 };
    case "INCREASE_TOTAL_LIKE_BY_AMOUNT":
      return { ...state, totalLikes: state.totalLikes + action.payload };
    default:
      return state;
  }
};
