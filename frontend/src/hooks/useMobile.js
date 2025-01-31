
import { useState, useEffect } from 'react';

const useMobile = (breakpoint = 768) => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkIfMobile = () => {
            const mobileBreakpoint = 768;
            setIsMobile(window.innerWidth <= mobileBreakpoint);
        };

        checkIfMobile();

        window.addEventListener('resize', checkIfMobile);

        return () => window.removeEventListener('resize', checkIfMobile);
    }, [breakpoint]);

    return isMobile;
};

export default useMobile;