import styled from 'styled-components';

const LoadingWrap = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.3);
  img {
    width: 50px;
    height: 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

const Loading = () => {
  return (
    <LoadingWrap>
      <img src='/icons/loading.gif' alt='Loading...' />
    </LoadingWrap>
  );
};
export default Loading;
