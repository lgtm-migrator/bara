import { StreamEventPayload, BaraStreamEmitter } from './stream';
export declare const mockStreamOptions: (name: string, max?: number) => {
    id: string;
    name: string;
    methods: {
        init: (emit: BaraStreamEmitter) => void;
        onEvent: ({ eventType, payload }: StreamEventPayload) => void;
    };
};
export declare const mockEventOptions: (name: string, streamIds?: string[]) => {
    streamIds: string[];
    id: string;
    name: string;
};
export declare const mockTriggerOptions: (events: any[], conditions?: any[], actions?: []) => {
    events: any[];
    conditions: any[];
    actions: [];
};
