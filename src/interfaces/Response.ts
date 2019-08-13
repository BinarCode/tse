import { Response as ExpressResponse } from 'express';

export default interface Response extends ExpressResponse {
    $respond: (data?: any, status?: number) => void;
}
