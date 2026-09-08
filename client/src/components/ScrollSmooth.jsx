import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";

const SmoothScroll = () => {
    const lenisRef = useRef(null);

    useEffect(() => {
        const lenis = new Lenis({
            autoRaf: false,
            lerp: 0.1,
            anchors: true,
        });

        lenisRef.current = lenis;

        const update = (time) => {
            lenis.raf(time * 1000);
        };

        gsap.ticker.add(update);

        const handleScroll = () => { };

        lenis.on("scroll", handleScroll);

        return () => {
            lenis.off("scroll", handleScroll);
            gsap.ticker.remove(update);
            lenis.destroy();
            lenisRef.current = null;
        };
    }, []);

    return null;
};

export default SmoothScroll;