import { toast } from 'sonner';

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
        console.error(err);
        toast.error((err as Error)?.message ?? 'Something went wrong');
        return null;
    } finally {
        setLoading(false);
    }
}
