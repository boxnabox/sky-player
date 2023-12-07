import clsx from 'clsx';

export default function SvgImg(props: SVGProps) {
  return (
    <svg
      className={clsx(props.className, 'std-svg')}
      aria-label={`${props.ariaLabel || 'no desc'}`}
    >
      <use xlinkHref={props.href}></use>
    </svg>
  );
}
