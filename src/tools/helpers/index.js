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

export const getIndexById = (array, id) =>
  array.findIndex(item => item._id === id);

export const reorderList = (array, index) => {
  const firstPart = array.slice(index);
  const secondPart = array.slice(0, index);

  return [...firstPart, ...secondPart];
};