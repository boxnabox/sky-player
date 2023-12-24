export default function SvgImg(props: SVGProps) {
  return (
    <svg
      className={props.className}
      aria-label={`${props.ariaLabel || 'no desc'}`}
    >
      <use xlinkHref={props.href}></use>
    </svg>
  );
}
