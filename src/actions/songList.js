export const IS_LIKE = "IS_LIKE";

export const isLike = (index) => {
  return {
    type: IS_LIKE,
    index
  };
};
