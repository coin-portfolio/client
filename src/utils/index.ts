export const isValidValue = (value: string, label: string, regEx: any, regExText: string) => {
  if (value.trim() === '') {
    return `${label}를 입력해주세요`;
  } else if (!regEx.test(value)) {
    return regExText;
  }
};

export const formatSeconds = (time: number) => {
  const minutes = String(Math.floor(time / 60)).padStart(2, '0');
  const seconds = String(time % 60).padStart(2, '0');

  return { minutes, seconds };
};
