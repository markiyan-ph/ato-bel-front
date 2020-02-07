export const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export const updateObject = (oldObject, newProperties) => {
  return {
    ...oldObject,
    ...newProperties
  };
};