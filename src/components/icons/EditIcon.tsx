import { ReactElement, SVGProps } from 'react';

function EditIcon({
  height,
  width,
  className,
  ...restProps
}: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 20}
      height={height ?? 20}
      className={className}
      {...restProps}
      viewBox="0 0 20 20"
    >
      <path d="m2.292 13.36l4.523 4.756L.5 20l1.792-6.64ZM12.705 2.412l4.522 4.755L7.266 17.64l-4.523-4.754l9.962-10.474ZM16.142.348l2.976 3.129c.807.848.086 1.613.086 1.613l-1.521 1.6l-4.524-4.757L14.68.334l.02-.019c.119-.112.776-.668 1.443.033Z" />
    </svg>
  );
}

export default EditIcon;
