export function useLocalStorage<TData>(key: string, initialValue?: TData) {
  // Set initial value
  if (initialValue) localStorage.setItem(key, JSON.stringify(initialValue));

  // Get function
  function getCurrentValue() {
    const currentValue = localStorage.getItem(key);
    return currentValue ? (JSON.parse(currentValue) as TData) : null;
  }

  // Set function
  function setValue(value: TData) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // Delete function
  function deleteValue() {
    localStorage.removeItem(key);
  }

  return { getCurrentValue, setValue, deleteValue };
}
