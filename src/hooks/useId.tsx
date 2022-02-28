import React from 'react';
import IdsContext from '../context/IdsContext';

const useId = (namespacePrefix?: string) => {
  const [id, setId] = React.useState<string | null>(null);
  const { generateId } = React.useContext(IdsContext);

  React.useEffect(() => {
    const newId = generateId(namespacePrefix);
    setId(newId);
  }, [namespacePrefix, generateId]);

  return id;
};

export default useId;
