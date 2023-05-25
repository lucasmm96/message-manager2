import Link from 'next/link';

import classes from '@/components/ui/IconLink.module.css';

import Icon from '@/components/ui/Icon';

function IconLink(props) {
  return (
    <Link href={props.href} target={props.newTab ? '_blank' : ''}>
      <Icon filename={props.filename} alt={props.alt} w={props.w} h={props.h} />
      {props.text ? <span className={classes.text}>{props.text}</span> : ''}
    </Link>
  );
}

export default IconLink;
