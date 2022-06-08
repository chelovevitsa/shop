import { useEffect } from 'react';
import { useCookies } from 'react-cookie';

const ClearSession = () => {
    // eslint-disable-next-line
    const [cookies, setCookie] = useCookies(['token']);

    useEffect(() => {
        setCookie('token', '', { path: '/' });
    }, [setCookie]);
}

export default ClearSession;