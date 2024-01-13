import { axiosInstance } from '@/services/instance';
import Button from '@/components/common/Button';
import defaultTheme from '@/styles/theme/defaultTheme';
import styled from 'styled-components';

const StyleSignInButton = styled(Button)`
  width: 100%;
  height: 50px;
  border-radius: 5px;
  background-color: ${defaultTheme.color.MAIN_COLOR};
  font-size: 14px;
  font-weight: bold;
`;

const SignInButton = () => {
  const signInHandler = async () => {
    const res = await axiosInstance.post('/api/auth/signIn', { id: 'kongsunk', password: 'qwer1234!!' });
    console.log(res);
    return res.data;
  };

  return (
    <StyleSignInButton disabled={false} onClick={signInHandler}>
      로그인
    </StyleSignInButton>
  );
};
export default SignInButton;
