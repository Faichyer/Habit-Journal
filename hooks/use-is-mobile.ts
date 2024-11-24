import {useState, useEffect} from "react";

const useIsMobile = () => {
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Define a handler to check the screen size
        const handleResize = () => {
            // Match Tailwind's `sm` breakpoint (640px) for mobile
            setIsMobile(window.innerWidth < 640);
        };

        // Set the initial value
        handleResize();

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Cleanup on component unmount
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    return isMobile;
};

export default useIsMobile;
