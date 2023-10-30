export const getTodaysDate = () => {
  const today: Date = new Date();
  const year: number = today.getFullYear();
  const month: string = String(today.getMonth() + 1).padStart(2, '0');
  const day: string = String(today.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
};

export const getTime = () => {};
