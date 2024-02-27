import { useLocation } from 'react-router-dom';

export const AccessToLocation = () => {
    const location = useLocation();

    return location.state?.access;
};
