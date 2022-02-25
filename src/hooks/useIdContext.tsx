import React from 'react';
import IdsContext from '../context/IdsContext';

const useIdContext = (namespacePrefixContext?: string) => {
  const { generateId: generateIdContext } = React.useContext(IdsContext);

  const generateId = (
    namespacePrefix?: string,
  ) => generateIdContext(namespacePrefix || namespacePrefixContext);

  return { generateId };
};

export default useIdContext;
