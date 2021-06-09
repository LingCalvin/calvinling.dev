import { useState } from 'react';

let counter = 0;

export default function useUniqueId() {
  const [id] = useState(() => `uid${counter++}`);

  return id;
}
