import { type ReactElement, type SVGProps } from 'react';

function TemperatureIcon({
  height,
  width,
  className,
  ...restProps
}: SVGProps<SVGSVGElement>): ReactElement {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width ?? 24}
      height={height ?? 24}
      viewBox="0 0 24 24"
      className={className}
      {...restProps}
    >
      <path
        fill="currentColor"
        d="M15 13V5a3 3 0 0 0-6 0v8a5 5 0 1 0 6 0m-3-9a1 1 0 0 1 1 1v3h-2V5a1 1 0 0 1 1-1Z"
      />
    </svg>
  );
}

export default TemperatureIcon;
