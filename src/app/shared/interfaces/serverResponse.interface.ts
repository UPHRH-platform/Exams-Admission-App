/**
 * server response
*/
export interface ServerResponse {
    /**
     * api id
    */
    statusInfo: StatusInfo;
    /**
     * response param
    */
    responseData?: any;
}

export interface Response {
    id: string,
    ver: string,
    ts?: string,
    params?: any
    code?: number,
    responseCode: string,
    result?: any
    error?: any
}

export interface StatusInfo {
    statusCode: number;
    statusMessage: string;
    errorMessage?: any;
}
