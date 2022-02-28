import React from 'react';
import { DEFAULT_ID_SEPARATOR, DEFAULT_INITIAL_ID_NAMESPACE_COUNTER, DEFAULT_NAMESPACE } from '../constants';

let counterNamespaces : {[key: string]: number} = {};

const IdsContext = React.createContext({
  generateId(namespacePrefix?: string) {
    const namespace = namespacePrefix || DEFAULT_NAMESPACE;

    if (!counterNamespaces[namespace]) {
      counterNamespaces[namespace] = DEFAULT_INITIAL_ID_NAMESPACE_COUNTER;
    }
    counterNamespaces[namespace] += 1;

    return `${namespace}${DEFAULT_ID_SEPARATOR}${counterNamespaces[namespace]}`;
  },
});

export const resetIdsContext = () => {
  counterNamespaces = {};
};

export default IdsContext;
