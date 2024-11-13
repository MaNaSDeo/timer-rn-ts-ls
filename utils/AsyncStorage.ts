import AsyncStorage from "@react-native-async-storage/async-storage";

// Type for storage operation result
type StorageResult<T> = {
  data: T | null;
  error: Error | null;
  success: boolean;
};

// Generic function to handle storage operations
const handleStorageOperation = async <T>(
  operation: Promise<any>
): Promise<StorageResult<T>> => {
  try {
    const result = await operation;
    return {
      data: result,
      error: null,
      success: true,
    };
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error ? error : new Error("Unknown error occured"),
      success: false,
    };
  }
};

export const setItem = async <T>(
  key: string,
  value: T
): Promise<StorageResult<T>> => {
  return handleStorageOperation<T>(
    AsyncStorage.setItem(key, JSON.stringify(value)).then(() => value)
  );
};

// export const getItem = async<T>(key: string):Promise<StorageResult<T>> => {
// return handleStorageOperation<T>(AsyncStorage)
// }

export const removeItem = async (key: string): Promise<StorageResult<void>> => {
  //   const value = await handleStorageOperation<T>(AsyncStorage.getItem(key)).then(() => value)
  //   return value === null || value.data === null ? null : JSON.parse(value.data);
  return handleStorageOperation(AsyncStorage.removeItem(key));
};
