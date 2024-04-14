import { useEffect, useRef } from "react";

export function useCloseModal(closeFn, listenCapturing) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        if (ref.current && !ref.current.contains(e.target)) closeFn();
      }
      document.addEventListener("click", handleClick, listenCapturing);

      return () =>
        document.removeEventListener("click", handleClick, listenCapturing);
    },
    [closeFn, listenCapturing]
  );
  return ref;
}
