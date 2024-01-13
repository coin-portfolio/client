'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import styled from 'styled-components';
import Button from '../common/Button';
import { flexbox } from '@/styles/mixins/flexbox';
import defaultTheme from '@/styles/theme/defaultTheme';
import Container from '../common/layout/Container';
import { useDispatch, useSelector } from 'react-redux';
import { userIdSelector } from '@/redux/selectors/userSelector';
import { jwtDecode } from 'jwt-decode';
import { AppDispatch } from '@/redux/store';
import { logIn, logOut } from '@/redux/slices/userSlice';
import { useRouter } from 'next/navigation';

const HeaderWrapper = styled.div`
  border-bottom: 1px solid #2f2f2f;
  height: 70px;
`;

const HeaderContent = styled.header`
  ${flexbox('space-between', 'center')};
  color: ${defaultTheme.color.WHILE};
  height: 100%;
`;

const Title = styled.h1`
  font-size: 24px;
`;

const ButtonWrap = styled.div`
  ${flexbox('space-between', 'center')};

  button,
  a,
  p {
    color: #fff;
    font-size: 14px;
    &:last-child {
      margin-left: 20px;
    }
  }
`;

const StyleLink = styled(Link)`
  color: ${defaultTheme.color.WHILE};
  font-size: 14px;
  &:last-child {
    margin-left: 20px;
  }
`;

const Header = () => {
  const userId = useSelector(userIdSelector);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      router.push('/signIn');
      dispatch(logOut());
      return;
    }

    const { userId }: any = jwtDecode(JSON.parse(token)?.accessToken);
    dispatch(logIn(userId));
  }, [userId]);

  const LogoutHandler = () => {
    localStorage.removeItem('token');
    dispatch(logOut());
    router.push('/signIn');
  };

  return (
    <HeaderWrapper>
      <Container>
        <HeaderContent>
          <Title>COIN MOA</Title>
          {userId ? (
            <>
              <ButtonWrap>
                <p>{userId}님 안녕하세요</p>
                <Button disabled={false} onClick={LogoutHandler}>
                  로그아웃
                </Button>
              </ButtonWrap>
            </>
          ) : (
            <div>
              <StyleLink href={'/signIn'}>로그인</StyleLink>
              <StyleLink href={'/signUp'}>회원가입</StyleLink>
            </div>
          )}
        </HeaderContent>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;
