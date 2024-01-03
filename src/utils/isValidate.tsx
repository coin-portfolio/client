import { isValidValue } from '.';
import { emailRegEx, idRegEx, passwordRegEx } from './constant';

export const isValidate = (value: any, errorMsg: any) => {
  errorMsg = { id: '', password: '', passwordConfirm: '', email: '' };

  if (value.id === '' || value.id) {
    const res = isValidValue(value.id, '아이디', idRegEx, '소문자와 숫자만 입력해주세요');
    errorMsg.id = res;
  }

  if (value.password.trim() === '') {
    errorMsg.password = '비밀번호를 입력해주세요';
  } else if (value.password.length < 6 || !passwordRegEx.test(value.password)) {
    errorMsg.password = '비밀번호는 6자리 이상 소문자, 숫자, 특수문자를 포함해주세요';
  }

  if (value.passwordConfirm.trim() === '' || value.password !== value.passwordConfirm) {
    errorMsg.passwordConfirm = '비밀번호를 확인해주세요';
  }

  if (value.email === '' || value.email) {
    const res = isValidValue(value.email, '이메일', emailRegEx, '이메일 형식을 확인해주세요');
    errorMsg.email = res;
  }

  return Object.values(errorMsg).every((error) => error === '') ? null : errorMsg;
};
