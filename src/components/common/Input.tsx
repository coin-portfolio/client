import styled from 'styled-components';

const StyleInput = styled.input`
  width: 100%;
  height: 60px;
  color: #fff;
  background-color: #242846;
  border-radius: 25px;
  padding: 0 20px;
  font-size: 14px;

  &::placeholder {
    font-size: 12px;
  }
  &:disabled {
    border-bottom: none;
    cursor: no-drop;
  }
`;

type Props = {
  maxLength?: number;
  className?: string;
  type?: string;
  value: string;
  onChange: (e?: any) => void;
  placeholder?: string;
  disabled?: boolean;
};

const Input = ({ maxLength, className, type = 'text', value, onChange, placeholder, disabled }: Props) => {
  return (
    <StyleInput
      maxLength={maxLength}
      className={className}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={!!disabled}
    />
  );
};

export default Input;
