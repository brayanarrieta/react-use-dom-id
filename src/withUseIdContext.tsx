import React from 'react';
import useIdContext from './hooks/useIdContext';

const withUseIdContext = (
  namespacePrefixContext?: string,
) => (Component: React.ComponentType<any>) => {
  // eslint-disable-next-line react/function-component-definition
  const WrappedComponent = (props: any) => {
    const { generateId: generateIdContext } = useIdContext();

    const generateId = (
      namespacePrefix?: string,
    ) => generateIdContext(namespacePrefix || namespacePrefixContext);

    return (
      <Component
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
        useIdContext={{
          generateId,
        }}
      />
    );
  };

  return WrappedComponent;
};

export default withUseIdContext;
