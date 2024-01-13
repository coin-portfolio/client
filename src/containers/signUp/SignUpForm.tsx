'use client';

import { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast, { Toaster } from 'react-hot-toast';
import styled from 'styled-components';
import Button from '@/components/common/Button';
import InputLabelItem from '@/components/signUp/InputLabelItem';
import Loading from '@/components/common/Loading';
import { checkAuthCodeApi, idCheckApi, sendAuthCodeEmailApi, signUpApi } from '@/services/auth';
import useTimer from '@/hooks/useTimer';
import { signUpObj } from '@/types/user';
import { isValidate } from '@/utils/isValidate';
import { formatSeconds, isValidValue } from '@/utils';
import { emailRegEx, idRegEx } from '@/utils/constant';
import defaultTheme from '@/styles/theme/defaultTheme';
import CheckIcon from '../../../public/icons/check.svg';

const InputLabelItemWrap = styled.form`
  margin-bottom: 30px;
  width: 100%;
`;

const StyleInputLabelItem = styled(InputLabelItem)`
  margin-top: 20px;
  width: 100%;
  position: relative;
`;

const StyleCheckIcon = styled(CheckIcon)`
  position: absolute;
  right: 20px;
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

const SuccessMessage = styled.p`
  margin: 10px 0 0 10px;
  color: #08a580;
  font-size: 12px;
  line-height: 18px;
`;

const StyleButton = styled(Button)`
  position: absolute;
  color: ${defaultTheme.color.MAIN_COLOR};
  font-size: 12px;
  right: 20px;
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

const Timer = styled.p`
  position: absolute;
  right: 20px;
  color: ${defaultTheme.color.MAIN_COLOR};
  font-size: 14px;
`;

const ResendEmailButton = styled(Button)`
  position: absolute;
  right: 20px;
  color: ${defaultTheme.color.MAIN_COLOR};
  font-size: 12px;
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

const SignUpForm = () => {
  const router = useRouter();
  const [inputObj, setInputObj] = useState<signUpObj>({
    id: '',
    password: '',
    passwordConfirm: '',
    email: '',
  });
  const [authCode, setAuthCode] = useState('');
  const [errorMessageObj, setErrorMessageObj] = useState({
    id: '',
    password: '',
    passwordConfirm: '',
    email: '',
    authCode: '',
  });
  const [isShowAuthCodeInput, setIsShowAuthCodeInput] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [availableId, setAvailableId] = useState(false);
  const [availableEmail, setAvailableEmail] = useState(false);
  const [idSuccessMessage, setIdSuccessMessage] = useState('');
  const [emailSuccessMessage, setEmailSuccessMessage] = useState('');
  const [isShowTimer, setIsShowTimer] = useState(false);

  const timer = useTimer(300, isShowTimer);
  const { minutes, seconds } = formatSeconds(timer);

  useEffect(() => {
    if (timer === 0) {
      setIsShowTimer(false);
    }
  }, [timer]);

  const inputChangeHandler = (key: keyof signUpObj, value: any) => {
    setErrorMessageObj((prev) => ({ ...prev, [key]: '' }));
    setIdSuccessMessage('');
    setInputObj((prev: any) => ({ ...prev, [key]: value }));
  };

  //인증번호 입력
  const changeAuthCode = (e: FormEvent<HTMLInputElement>, email: string) => {
    setErrorMessageObj((prev) => ({ ...prev, authCode: '' }));

    const { value } = e.currentTarget;
    setAuthCode(value);

    if (value.length === 6) {
      checkAuthCode(value, email);
    }
  };

  // 아이디 중복확인
  const idCheckHandler = async (e: any, id: string) => {
    e.preventDefault();
    setErrorMessageObj((prev) => ({ ...prev, id: '' }));
    setAvailableId(false);

    const validId = isValidValue(inputObj.id, '아이디', idRegEx, '소문자와 숫자만 입력해주세요');
    if (validId) {
      setErrorMessageObj((prev) => ({ ...prev, id: validId }));
      return;
    }
    setIsLoading(true);
    try {
      const res = await idCheckApi(id);
      if (res.status === 200) {
        setIdSuccessMessage(res.data.message);
        setErrorMessageObj((prev: any) => ({ ...prev, id: '' }));
        setAvailableId(true);
      } else {
        setErrorMessageObj((prev: any) => ({ ...prev, id: res.data.message }));
        setIdSuccessMessage('');
      }
    } catch (error: any) {
      setErrorMessageObj((prev: any) => ({ ...prev, id: error?.message }));
    } finally {
      setIsLoading(false);
    }
  };

  // 인증번호 이메일 전송
  const sendAuthCodeEmail = async () => {
    setAuthCode('');
    setErrorMessageObj((prev) => ({ ...prev, email: '', authCode: '' }));

    const validEmail = isValidValue(inputObj.email, '이메일', emailRegEx, '이메일 형식을 확인해주세요');
    if (validEmail) {
      setErrorMessageObj((prev) => ({ ...prev, email: validEmail }));
      return;
    }

    setIsLoading(true);
    try {
      const res = await sendAuthCodeEmailApi(inputObj.email);
      if (res.status === 200) {
        setIsShowAuthCodeInput(true);
        setIsShowTimer(true);
      }
    } catch (error: any) {
      setErrorMessageObj((prev) => ({ ...prev, email: error.message }));
    } finally {
      setIsLoading(false);
    }
  };

  // 인증번호 확인
  const checkAuthCode = async (value: string, email: string) => {
    setIsLoading(true);
    try {
      const res = await checkAuthCodeApi({
        authNumber: value,
        email: email,
      });
      if (res.status === 200) {
        setEmailSuccessMessage(res.data.message);
        setAvailableEmail(true);
        setIsShowAuthCodeInput(false);
      }
    } catch (error: any) {
      setErrorMessageObj((prev) => ({ ...prev, authCode: error.message }));
    } finally {
      setIsLoading(false);
    }
  };

  // 회원가입
  const signUpHandler = async () => {
    setErrorMessageObj({ id: '', password: '', passwordConfirm: '', email: '', authCode: '' });
    const validationError = isValidate(inputObj, errorMessageObj);

    if (validationError) {
      setErrorMessageObj({ ...validationError });
    }

    if (!availableId) {
      setErrorMessageObj((prev) => ({ ...prev, id: '중복확인을 해주세요' }));
    }

    if (!availableEmail) {
      setErrorMessageObj((prev) => ({ ...prev, email: '이메일 확인을 해주세요' }));
    }

    if (availableId && availableEmail) {
      setIsLoading(true);
      try {
        const res = await signUpApi({
          id: inputObj.id,
          password: inputObj.password,
          email: inputObj.email,
        });
        if (res.status === 200) {
          toast.success(res.data.message);
          router.push('/signIn');
        }
      } catch (error: any) {
        toast.error(error.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <InputLabelItemWrap>
        <StyleInputLabelItem
          placeholder='아이디'
          value={inputObj.id}
          disabled={availableId}
          onChangeHandler={(e: FormEvent<HTMLInputElement>) => inputChangeHandler('id', e.currentTarget.value)}
          buttonComponents={
            availableId ? (
              <StyleCheckIcon fill='#3ec578' />
            ) : (
              <StyleButton onClick={(e) => idCheckHandler(e, inputObj.id)}>중복확인</StyleButton>
            )
          }
        />
        {errorMessageObj.id && <ErrorMessage>{errorMessageObj.id}</ErrorMessage>}
        {idSuccessMessage && <SuccessMessage>{idSuccessMessage}</SuccessMessage>}

        <StyleInputLabelItem
          placeholder='비밀번호'
          type='password'
          value={inputObj.password}
          onChangeHandler={(e: FormEvent<HTMLInputElement>) => inputChangeHandler('password', e.currentTarget.value)}
        />
        <ErrorMessage>{errorMessageObj.password}</ErrorMessage>

        <StyleInputLabelItem
          placeholder='비밀번호 확인'
          type='password'
          value={inputObj.passwordConfirm}
          onChangeHandler={(e: FormEvent<HTMLInputElement>) =>
            inputChangeHandler('passwordConfirm', e.currentTarget.value)
          }
        />
        <ErrorMessage>{errorMessageObj.passwordConfirm}</ErrorMessage>

        <StyleInputLabelItem
          placeholder='이메일'
          value={inputObj.email}
          disabled={isShowAuthCodeInput}
          onChangeHandler={(e: FormEvent<HTMLInputElement>) => inputChangeHandler('email', e.currentTarget.value)}
          buttonComponents={
            availableEmail ? (
              <StyleCheckIcon fill='#3ec578' />
            ) : (
              <StyleButton disabled={isShowAuthCodeInput} onClick={sendAuthCodeEmail}>
                인증번호 전송
              </StyleButton>
            )
          }
        />

        {errorMessageObj.email && <ErrorMessage>{errorMessageObj.email}</ErrorMessage>}
        {emailSuccessMessage && <SuccessMessage>{emailSuccessMessage}</SuccessMessage>}
        {isShowAuthCodeInput && !emailSuccessMessage && (
          <SuccessMessage>
            {inputObj.email} 으로 인증 메일을 전송했습니다.
            <br /> 이메일은 5분간 유효합니다.
          </SuccessMessage>
        )}

        {isShowAuthCodeInput && (
          <>
            <StyleInputLabelItem
              maxLength={6}
              value={authCode}
              onChangeHandler={(e: any) => changeAuthCode(e, inputObj.email)}
              buttonComponents={
                isShowTimer ? (
                  <Timer>{`${minutes}:${seconds}`}</Timer>
                ) : (
                  <ResendEmailButton disabled={false} onClick={sendAuthCodeEmail}>
                    재요청
                  </ResendEmailButton>
                )
              }
            />
            <ErrorMessage>{errorMessageObj.authCode}</ErrorMessage>
          </>
        )}
        <StyleSignUpButton disabled={isLoading} onClick={signUpHandler}>
          회원가입
        </StyleSignUpButton>

        <SignInText>
          Already have an account? <Link href='/signIn'>SignIn</Link>
        </SignInText>
        <Toaster position='top-center' />
      </InputLabelItemWrap>
      {isLoading && <StyleLoading />}
    </>
  );
};

export default SignUpForm;
