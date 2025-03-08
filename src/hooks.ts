import { useEffect, useState } from "react";

export const useLocalStorage = function HookLocalStorage(key: string) {
  const [value, setValue] = useState(false);

  const localValue = JSON.parse(localStorage.getItem(key) || "false");

  useEffect(() => {
    setValue(localValue);
  }, [localValue]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return { value, setValue}
}

export const useToggle = function HookToggle(init: boolean) {

  const [open, setOpen] = useState<boolean>(init);

  const toggle = () => { setOpen(prev => !prev); };

  return { open, setOpen, toggle };
}