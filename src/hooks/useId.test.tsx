import { renderHook } from '@testing-library/react-hooks';
import useId from './useId';

describe('useId', () => {
  it('when pass different namespaces should generate unique ids', () => {
    const { result: firstId } = renderHook(() => useId('first'));
    const { result: secondId } = renderHook(() => useId('second'));

    expect(firstId.current).toBe('first-1');
    expect(secondId.current).toBe('second-1');
  });

  it('when pass same namespaces should generate unique ids', () => {
    const { result: firstId } = renderHook(() => useId('test'));
    const { result: secondId } = renderHook(() => useId('test'));

    expect(firstId.current).toBe('test-1');
    expect(secondId.current).toBe('test-2');
  });

  it('when not pass a namespace prefix should generate a unique id with the default namespace', () => {
    const { result: id } = renderHook(() => useId());

    expect(id.current).toBe('app-1');
  });
});
