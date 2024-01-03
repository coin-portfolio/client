import { ReactNode } from 'react';
import styled from 'styled-components';

const StyleButton = styled.button`
  &:disabled {
    color: #777;
    cursor: no-drop;
  }
`;

type Props = {
  className?: string;
  type?: 'button' | 'submit' | 'reset' | undefined;
  children: ReactNode;
  disabled?: boolean;
  onClick?: (e: any) => void;
};

const Button = ({ className, type = 'button', disabled, children, ...buttonProps }: Props) => {
  return (
    <StyleButton className={className} type={type} disabled={disabled} {...buttonProps}>
      {children}
    </StyleButton>
  );
};

export default Button;
