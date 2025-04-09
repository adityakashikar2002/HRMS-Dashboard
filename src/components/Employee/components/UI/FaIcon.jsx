import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(fas);

const FaIcon = ({ icon, ...props }) => {
  return <FontAwesomeIcon icon={icon} {...props} />;
};

export default FaIcon;