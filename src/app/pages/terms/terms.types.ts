/**
 * Terms Interface
 */
export interface Terms {
    updatedAt?: string;
    introduction?: string;
    sections?: Section[];
}

/**
 * Section Interface
 */
export interface Section {
    name: string;
    description?: string;
    points?: string[];
}
