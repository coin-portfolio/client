'use client';

import SignInForm from '@/containers/SignIn/SignInForm';
import { flexbox } from '@/styles/mixins/flexbox';
import defaultTheme from '@/styles/theme/defaultTheme';
import styled from 'styled-components';

const SignInWrap = styled.section`
  ${flexbox('center', 'flex-start')}
  flex-direction:column;
  width: 500px;
  height: calc(100vh - 70px);
  margin: 0 auto;
`;

const SignInTitle = styled.h2`
  font-size: 32px;
  color: ${defaultTheme.color.MAIN_COLOR};
  margin-bottom: 30px;
`;

const SignIn = () => {
  return (
    <SignInWrap>
      <SignInTitle>Sign In</SignInTitle>
      <SignInForm />
    </SignInWrap>
  );
};

export default SignIn;
