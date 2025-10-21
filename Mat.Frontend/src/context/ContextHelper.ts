import { handleApiError } from 'src/services/ApiErrorHandler';

/**
 * Wraps async operations with loading and error handling.
 *
 * @param setLoading - A state setter for isLoading
 * @param func - The async function to execute
 * @returns Promise<void>
 */
export async function handleAsync<T>(
    setLoading: (loading: boolean) => void,
    func: () => Promise<T>
): Promise<T | null> {
    setLoading(true);
    try {
        return await func();
    } catch (err) {
        handleApiError(err);
        return null;
    } finally {
        setLoading(false);
    }
}
