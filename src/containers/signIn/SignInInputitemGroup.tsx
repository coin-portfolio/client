import { axiosInstance } from '@/services/instance';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import InputLabelItem from '@/components/signUp/InputLabelItem';
import defaultTheme from '@/styles/theme/defaultTheme';
import { signUpObj } from '@/types/user';
import axios from 'axios';
import { useState, FormEvent } from 'react';
import styled from 'styled-components';

const InputLabelItemWrap = styled.div`
  margin-bottom: 30px;
  width: 100%;
`;

const StyleInputLabelItem = styled(InputLabelItem)`
  margin-bottom: 20px;
  width: 100%;
  position: relative;

  label {
    color: #9ca3af;
    display: block;
    font-size: 12px;
    padding: 10px 0 0;
  }
  input {
    border-bottom: 1px solid #ddd;
    width: 100%;
    height: 40px;
    color: #fff;
  }

  button {
    position: absolute;
    bottom: 10px;
    right: 0;
    color: ${defaultTheme.color.MAIN_COLOR};
  }
`;

const SignInInputitemGroup = () => {
  const [inputValue, setInputValue] = useState<signUpObj>({ id: '', password: '', passwordConfirm: '', email: '' });
  const [authNumber, setAuthNumber] = useState('');
  const [isShowAuthNumberInput, setIsShowAuthNumberInput] = useState(true);

  const inputChangeHandler = (key: keyof signUpObj, value: any) => {
    setInputValue((prev) => ({ ...prev, [key]: value }));
  };

  const changeAuthNumber = (e: FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    setAuthNumber(value);
  };
  const checkAuthNumber = async () => {
    const res = await axiosInstance.post('/api/auth/email/result', { authNumber, email: inputValue.email });
    return res.data;
  };

  const sendAuthNumber = async () => {
    const res = await axiosInstance.post('/api/auth/email', inputValue.email);
    return res.data;
  };

  const resendAuthNumber = async () => {
    sendAuthNumber();
  };

  const checkIdHandler = async () => {
    const res = await axiosInstance.post('/api/auth/checkid', inputValue.id);
    return res.data;
  };
  return (
    <InputLabelItemWrap>
      <StyleInputLabelItem
        label='아이디'
        value={inputValue.id}
        onChangeHandler={(e: FormEvent<HTMLInputElement>) => inputChangeHandler('id', e.currentTarget.value)}
      />

      <StyleInputLabelItem
        label='비밀번호'
        type='password'
        value={inputValue.password}
        onChangeHandler={(e: FormEvent<HTMLInputElement>) => inputChangeHandler('password', e.currentTarget.value)}
      />
    </InputLabelItemWrap>
  );
};

export default SignInInputitemGroup;
