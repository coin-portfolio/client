'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import InputLabelItem from '@/components/signUp/InputLabelItem';
import Loading from '@/components/common/Loading';
import { signInApi } from '@/services/auth';
import { signInObj, signUpObj } from '@/types/user';
import defaultTheme from '@/styles/theme/defaultTheme';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { logIn } from '@/redux/slices/userSlice';

const InputLabelItemWrap = styled.form`
  margin-bottom: 30px;
  width: 100%;
`;

const StyleInputLabelItem = styled(InputLabelItem)`
  margin-top: 20px;
  width: 100%;
  position: relative;
`;

const StyleLoading = styled(Loading)`
  position: absolute;
  right: 20px;
  width: 30px;
  height: 30px;
`;

const ErrorMessage = styled.p`
  margin: 10px 0 0 10px;
  color: #d82020;
  font-size: 12px;
`;

const StyleSignUpButton = styled(Button)`
  width: 100%;
  height: 60px;
  border-radius: 25px;
  background-color: ${defaultTheme.color.MAIN_COLOR};
  font-size: 14px;
  font-weight: bold;
  margin-top: 30px;
`;

const SignInText = styled.p`
  color: #cfcfd3;
  font-size: 14px;
  text-align: center;
  margin-top: 30px;

  a {
    color: ${defaultTheme.color.MAIN_COLOR};
  }
`;

const SignInForm = () => {
  const router = useRouter();
  const [inputObj, setInputObj] = useState<signInObj>({
    id: '',
    password: '',
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  const inputChangeHandler = (key: keyof signUpObj, value: any) => {
    setErrorMessage('');
    setInputObj((prev: any) => ({ ...prev, [key]: value }));
  };

  // 로그인
  const signInHandler = async () => {
    setErrorMessage('');
    setIsLoading(true);
    try {
      const res = await signInApi({
        id: inputObj.id,
        password: inputObj.password,
      });
      if (res.status === 200) {
        const { token, message } = res.data;
        toast.success(message);
        localStorage.setItem('token', JSON.stringify(token));
        const { userId }: any = jwtDecode(token.accessToken);
        dispatch(logIn(userId));
        router.push('/');
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <InputLabelItemWrap>
        <StyleInputLabelItem
          placeholder='아이디'
          value={inputObj.id}
          onChangeHandler={(e: FormEvent<HTMLInputElement>) => inputChangeHandler('id', e.currentTarget.value)}
        />

        <StyleInputLabelItem
          placeholder='비밀번호'
          type='password'
          value={inputObj.password}
          onChangeHandler={(e: FormEvent<HTMLInputElement>) => inputChangeHandler('password', e.currentTarget.value)}
        />

        <ErrorMessage>{errorMessage}</ErrorMessage>

        <StyleSignUpButton disabled={false} onClick={signInHandler}>
          로그인
        </StyleSignUpButton>

        <SignInText>
          Don't have an account? <Link href='/signUp'>Create new one</Link>
        </SignInText>

        <Toaster position='top-center' />
      </InputLabelItemWrap>
      {isLoading && <StyleLoading />}
    </>
  );
};

export default SignInForm;
