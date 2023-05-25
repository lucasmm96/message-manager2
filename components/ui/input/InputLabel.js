import classes from '@/components/ui/input/InputLabel.module.css';

import IconLink from '@/components/ui/IconLink';

function InputLabel(props) {
  return (
    <div>
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
    </div>
  );
}

export default InputLabel;
