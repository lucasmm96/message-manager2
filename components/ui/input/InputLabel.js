import classes from '@/components/ui/input/InputLabel.module.css';

import IconLink from '@/components/ui/IconLink';
import IconCopy from '@/components/ui/IconCopy';

function InputLabel(props) {
  return (
    <div className={!props.value ? classes.iconPadding : ''}>
      <label className={classes.label} htmlFor={props.htmlFor}>
        {props.label}
      </label>
      {props.type === 'url' && props.value && (
        <IconLink
          href={props.value}
          newTab={true}
          filename="link.svg"
          alt="Open Link"
          w={20}
          h={20}
        />
      )}
      {props.type !== 'url' && props.value && (
        <IconCopy
          filename="copy.svg"
          alt="Copy content"
          text={props.value}
          w={17}
          h={17}
        />
      )}
    </div>
  );
}

export default InputLabel;
