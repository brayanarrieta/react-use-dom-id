import React from 'react';
import { render } from '@testing-library/react';
import withUseIdContext from './withUseIdContext';
import { resetIdsContext } from './context/IdsContext';

const generateMockComponent = (
  namespace?: string,
// eslint-disable-next-line react/function-component-definition
) => (props: {useIdContext: { generateId: any }}) => {
  const { useIdContext } = props;
  const { generateId } = useIdContext;
  return <div id={generateId(namespace)} />;
};

describe('withUseId', () => {
  afterEach(() => {
    resetIdsContext();
  });

  it('when not pass a namespace prefix should generate a unique id with the default namespace and pass as id prop', () => {
    const MockComponent = generateMockComponent();
    const WrappedComponent = withUseIdContext()(MockComponent);
    const { container } = render(<WrappedComponent />);
    expect(container).toMatchSnapshot();
  });

  it('when not pass namespaces should generate unique ids', () => {
    const FirstMockComponent = generateMockComponent();
    const FirstWrappedComponent = withUseIdContext()(FirstMockComponent);
    const { container: firstContainer } = render(<FirstWrappedComponent />);
    expect(firstContainer).toMatchSnapshot();

    const SecondMockComponent = generateMockComponent();
    const SecondWrappedComponent = withUseIdContext()(SecondMockComponent);
    const { container: secondContainer } = render(<SecondWrappedComponent />);
    expect(secondContainer).toMatchSnapshot();
  });

  describe('when pass a namespace prefix context', () => {
    it('it should be part of the unique id', () => {
      const MockComponent = generateMockComponent();
      const WrappedComponent = withUseIdContext('test-namespace')(MockComponent);
      const { container } = render(<WrappedComponent />);
      expect(container).toMatchSnapshot();
    });

    it('and override with the namespace prefix param it the new one should be part of the unique id', () => {
      const MockComponent = generateMockComponent('new-test-namespace');
      const WrappedComponent = withUseIdContext('test-namespace')(MockComponent);
      const { container } = render(<WrappedComponent />);
      expect(container).toMatchSnapshot();
    });
  });
});
