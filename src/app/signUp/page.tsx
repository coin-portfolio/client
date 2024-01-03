'use client';

import SignUpForm from '@/containers/SignUp/SignUpForm';
import { flexbox } from '@/styles/mixins/flexbox';
import defaultTheme from '@/styles/theme/defaultTheme';
import styled from 'styled-components';

const SignUpWrap = styled.section`
  ${flexbox('center', 'flex-start')}
  flex-direction:column;
  width: 500px;
  height: calc(100vh - 70px);
  margin: 0 auto;
`;

const SignUpTitle = styled.h2`
  font-size: 32px;
  color: ${defaultTheme.color.MAIN_COLOR};
  margin-bottom: 30px;
`;

const SignUp = () => {
  return (
    <SignUpWrap>
      <SignUpTitle>Sign Up</SignUpTitle>
      <SignUpForm />
    </SignUpWrap>
  );
};

export default SignUp;
