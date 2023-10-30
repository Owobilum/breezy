import { type ReactElement, type SVGProps } from 'react';

import LocationIcon from './LocationIcon';
import TemperatureIcon from './TemperatureIcon';
import CloseIcon from './CloseIcon';
import HeartIcon from './HeartIcon';
import EditIcon from './EditIcon';

export type SVGElementProps = SVGProps<SVGSVGElement> & {
  title: 'location' | 'temperature' | 'close' | 'heart' | 'edit';
};

function Icon(props: SVGElementProps): ReactElement {
  const { title } = props;
  switch (title) {
    case 'location':
      return <LocationIcon {...props} />;
    case 'temperature':
      return <TemperatureIcon {...props} />;
    case 'close':
      return <CloseIcon {...props} />;
    case 'heart':
      return <HeartIcon {...props} />;
    case 'edit':
      return <EditIcon {...props} />;
    default:
      return <span />;
  }
}

export { Icon };
