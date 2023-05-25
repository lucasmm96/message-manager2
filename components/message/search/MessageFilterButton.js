import Button from '@/components/ui/Button';

function MessageFilterButton(props) {
  return (
    <Button
      classes="containerItem"
      click={props.method}
      label={props.label}
      selected={props.selected ? true : false}
    />
  );
}

export default MessageFilterButton;
