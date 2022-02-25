import React, { useCallback } from 'react';
import IdsContext from '../context/IdsContext';

const useIdContext = (namespacePrefixContext?: string) => {
  const { generateId: generateIdContext } = React.useContext(IdsContext);

  const generateId = useCallback(
    (
      namespacePrefix?: string,
    ) => generateIdContext(namespacePrefix || namespacePrefixContext),
    [namespacePrefixContext],
  );

  return { generateId };
};

export default useIdContext;
