import { renderHook } from '@testing-library/react-hooks';
import useIdContext from './useIdContext';

describe('useIdContext', () => {
  it('when pass different namespaces should generate unique ids', () => {
    const { result: firstContext } = renderHook(() => useIdContext());
    const { result: secondContext } = renderHook(() => useIdContext());

    expect(firstContext.current.generateId('first')).toBe('first-1');
    expect(secondContext.current.generateId('second')).toBe('second-1');
  });

  it('when pass same namespaces should generate unique ids', () => {
    const { result: firstContext } = renderHook(() => useIdContext());
    const { result: secondContext } = renderHook(() => useIdContext());

    expect(firstContext.current.generateId('test')).toBe('test-1');
    expect(secondContext.current.generateId('test')).toBe('test-2');
  });

  it('when not pass a namespace prefix should generate a unique id with the default namespace', () => {
    const { result: context } = renderHook(() => useIdContext());

    expect(context.current.generateId()).toBe('app-1');
  });

  describe('when pass a namespace prefix context', () => {
    it('it should be part of the unique ids', () => {
      const { result: context } = renderHook(() => useIdContext('test-namespace'));

      expect(context.current.generateId()).toBe('test-namespace-1');
      expect(context.current.generateId()).toBe('test-namespace-2');
    });

    it('and override with the namespace prefix param it the new one should be part of the unique id', () => {
      const { result: context } = renderHook(() => useIdContext('test-namespace'));

      expect(context.current.generateId('new-test-namespace')).toBe('new-test-namespace-1');
    });
  });
});
