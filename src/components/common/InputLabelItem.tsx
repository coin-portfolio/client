import { ChangeEvent, ReactNode } from 'react';

import styled from 'styled-components';
import Input from './Input';
import { flexbox } from '@/styles/mixins/flexbox';

const ItemWrap = styled.div``;

const Item = styled.div`
  ${flexbox('space-between', 'center')}
`;

type Props = {
  className?: string;
  maxLength?: number;
  type?: string;
  value: string;
  onChangeHandler: (event: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  buttonComponents?: ReactNode | any;
};

const InputLabelItem = ({
  className,
  maxLength,
  type = 'text',
  value,
  onChangeHandler,
  placeholder,
  disabled,
  buttonComponents,
}: Props) => {
  return (
    <ItemWrap className={className}>
      <Item>
        <Input
          type={type}
          maxLength={maxLength}
          value={value}
          onChange={onChangeHandler}
          placeholder={placeholder}
          disabled={!!disabled}
        />
        {buttonComponents && buttonComponents}
      </Item>
    </ItemWrap>
  );
};

export default InputLabelItem;
