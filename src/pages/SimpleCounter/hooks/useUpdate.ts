import { useRef, useEffect } from 'react';

export default function useUpdate(cb: () => void) {
    const isMountRef = useRef<boolean>(false);

    useEffect(() => {
        if (!isMountRef.current) {
            isMountRef.current = true;
            return;
        }
        cb();
    });
}
