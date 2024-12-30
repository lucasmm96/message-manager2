import Icon from '@/components/ui/Icon';

function IconCopy(props) {
  const handleCopy = async () => await navigator.clipboard.writeText(props.text)

  return <Icon filename={props.filename} alt={props.alt} w={props.w} h={props.h} click={handleCopy}/>
}

export default IconCopy;
