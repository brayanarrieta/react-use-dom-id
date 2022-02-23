import React from 'react';
import CounterNamespacesContext from './CounterNamespacesContext';

const useId = (namespacePrefix?: string) => {
  const [id, setId] = React.useState<string | null>(null);
  const { generateId } = React.useContext(CounterNamespacesContext);

  React.useEffect(() => {
    const newId = generateId(namespacePrefix);
    setId(newId);
  }, [namespacePrefix, generateId]);

  return id;
};

export default useId;
