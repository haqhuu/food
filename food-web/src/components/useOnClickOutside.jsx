import { useEffect } from "react";

function useOnClickOutside(ref, handler) {
    useEffect(() => {
        const listener = (event) => {
            // Nếu click vào bên trong phần tử được tham chiếu, không làm gì cả
            if (!ref.current || ref.current.contains(event.target)) {
                return;
            }
            handler(event);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
}

export default useOnClickOutside;
