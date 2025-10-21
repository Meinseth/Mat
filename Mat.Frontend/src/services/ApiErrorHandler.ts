import { toast } from 'sonner';
import { ApiException } from './ApiClient';

export function handleApiError(error: unknown): void {
    console.error(error);

    if (ApiException.isApiException(error)) {
        switch (error.status) {
            case 401:
                // Skip toast for unauthorized
                break;
            case 400:
                toast.error('Bad Request');
                break;
            case 404:
                toast.error('Not Found');
                break;
            default:
                toast.error(error.message ?? 'Something went wrong');
                break;
        }
    } else {
        toast.error((error as Error)?.message ?? 'Something went wrong');
    }
}
