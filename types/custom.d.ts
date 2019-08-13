declare namespace NodeJS {
    export interface Global {
        $log: any;
        $info: any;
        $done: any;
        $logger: any;
        $success: any;
        $warn: any;
        $error: any;
        $clearConsole: any;
    }
}

declare function $logger(log: any, level?: string): void;
declare function $log(log: string, level?: string): void;
declare function $info(log: string, level?: string): void;
declare function $success(log: string, level?: string): void;
declare function $warn(log: string, level?: string): void;
declare function $error(log: string, level?: string): void;
declare function $clearConsole(title: string): void;

declare namespace Express {
    export interface Response {
        $response: import('../src/utils/Response').default;
        $respond: (data?: any, status?: number) => void;
    }
}
