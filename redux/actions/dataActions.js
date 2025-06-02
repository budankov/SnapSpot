export const increaseTotalLike = () => ({
  type: "INCREASE_TOTAL_LIKE",
});

export const increaseTotalLikeByAmount = (payload) => ({
  type: "INCREASE_TOTAL_LIKE_BY_AMOUNT",
  payload: payload,
});
