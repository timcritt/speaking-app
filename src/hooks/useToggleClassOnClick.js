import { useState, useEffect, useRef } from 'react';

//applies class when referenced item is clicked. Removes class when click outside

export default function useToggleClassOnClick() {
  const [classApplied, setClassApplied] = useState('');
  const ref = useRef(null);

  //removes class
  const handleClickOutside = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setClassApplied('');
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return { ref, classApplied, setClassApplied };
}
