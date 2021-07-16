import { useState } from 'react';

export default function useDrawer() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((state) => !state);
  return { open, setOpen, toggle };
}
