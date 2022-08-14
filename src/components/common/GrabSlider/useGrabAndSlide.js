import { useEffect, useState } from 'react';

const useGrabAndSlide = (ref, activeClass) => {
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(null);
  const [scrollLeft, setScrollLeft] = useState();

  useEffect(() => {
    const slider = ref.current;
    const handleMouseUp = () => {
      setIsDown(() => false);
      slider.classList.remove(activeClass);
    };

    const handleMouseLeave = () => {
      setIsDown(() => false);
      slider.classList.remove(activeClass);
    };

    const handleMouseMove = (e) => {
      if (isDown) {
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = x - startX; //multipy startx by a number for scroll-fast
        slider.scrollLeft = scrollLeft - walk;
      }
    };

    const handleMouseDown = (e) => {
      setIsDown(() => true);
      slider.classList.add(activeClass);
      setStartX(() => e.pageX - slider.offsetLeft);
      setScrollLeft(() => slider.scrollLeft);
    };

    if (slider) {
      slider.addEventListener('mousedown', handleMouseDown);
      slider.addEventListener('mouseleave', handleMouseLeave);
      slider.addEventListener('mouseup', handleMouseUp);
      slider.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (slider) {
        slider.removeEventListener('mousedown', handleMouseDown);
        slider.removeEventListener('mouseleave', handleMouseLeave);
        slider.removeEventListener('mouseup', handleMouseUp);
        slider.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [isDown, activeClass, startX, scrollLeft, ref]);
};

export default useGrabAndSlide;
