/**
 * Message interface
 *
 * @export
 * @interface Message
 */
export interface Message {
    fullName: string;
    email: string;
    category: string;
    subject: string;
    message: string;
}

/**
 * Alert type
 *
 * @export
 * @type Alert
 */
export type Alert = 'error' | 'confirmation';
