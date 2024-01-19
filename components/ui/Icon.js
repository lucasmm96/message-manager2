import Image from 'next/image';

import classes from '@/components/ui/Icon.module.css';

function Icon(props) {
  return (
    <>
      <Image
        className={props.click ? classes.pointer : ''}
        src={`/icons/${props.filename}`}
        alt={props.alt}
        width={props.w}
        height={props.h}
        priority
        onClick={props.click || (() => {})}
      />
      {props.label && <span className={classes.text}>{props.label}</span>}
    </>
  );
}

export default Icon;
