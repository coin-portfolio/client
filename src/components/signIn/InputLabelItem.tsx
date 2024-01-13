import Input from '../common/Input';

type Props = {
  className?: string;
  type?: string;
  label: string;
  value: string;
  onChangeHandler: any;
  buttonComponents?: any;
};

const InputLabelItem = ({ className, type, label, value, onChangeHandler, buttonComponents }: Props) => {
  return (
    <div className={className}>
      <label>{label}</label>
      <Input type={type} value={value} onChange={onChangeHandler} />
      {buttonComponents && buttonComponents}
    </div>
  );
};

export default InputLabelItem;
