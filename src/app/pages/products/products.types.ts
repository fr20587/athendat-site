/**
 * Product
 *
 * @export
 * @interface Product
 */
export interface Product {
    _id?: string;
    logoUrl?: string;
    secondaryLogoUrl?: string;
    coverUrl?: string;
    link?: string;
    coverDarkUrl?: string;
    state?: State;
    status?: Status;
    name?: string;
    abstract?: string;
    description?: string;
    phases?: Phase[];
    currentVersion?: string;
    versionChanges?: VersionChange[];
    plans?: Plan[];
    planFeatures?: PlanSection[];
}

interface Phase {
    number?: number;
    status?: Status;
    sections?: Section[];
}

interface Section {
    name?: string;
    status?: Status;
    points?: Point[];
}

interface Point {
    name?: string;
    status?: Status;
}

interface VersionChange {
    releaseDate?: string;
    version?: string;
    changes?: Change[];
}

interface Change {
    section?: string;
    points?: string[];
}

export interface Plan {
    name?: string;
    cost?: number;
    description?: string;
    planSection?: PlanSection[];
}

interface PlanSection {
    name?: string;
    features?: Feature[];
}
interface Feature {
    name?: string;
    description?: string;
    observation?: string;
    planA?: boolean;
    planB?: boolean;
    planC?: boolean;
}

type State = 'En desarrollo' | 'Disponible' | 'En pruebas';
type Status = 'Completado' | 'Proceso' | 'Planificado';


export interface EnzonaResponse {
    status: number;
    result: Result;
}

export interface Result {
    ok:      boolean;
    message: string;
    payment: Payment;
}

export interface Payment {
    transaction_uuid: string;
    currency:         string;
    created_at:       Date;
    updated_at:       Date;
    status_code:      number;
    status_denom:     string;
    description:      string;
    invoice_number:   string;
    merchant_op_id:   string;
    terminal_id:      string;
    amount:           Amount;
    items:            Item[];
    links:            Link[];
    commission:       string;
}

export interface Amount {
    total:   string;
    details: Details;
}

export interface Details {
    shipping: string;
    tax:      string;
    discount: string;
    tip:      string;
}

export interface Item {
    description: string;
    quantity:    string;
    price:       string;
    tax:         string;
    name:        string;
}

export interface Link {
    rel:    string;
    method: string;
    href:   string;
}


export interface EnzonaPaymentRequest {
    description:         string;
    currency:            string;
    merchant_op_id:      string;
    invoice_number:      string;
    terminal_id:         string;
    amount:              Amount;
    items:               Item[];
    return_url:          string;
    cancel_url:          string;
    buyer_identity_code: string;
}

export interface Amount {
    total:   string;
    details: Details;
}

export interface Details {
    shipping: string;
    tax:      string;
    discount: string;
    tip:      string;
}

export interface Item {
    name:        string;
    description: string;
    quantity:    string;
    price:       string;
    tax:         string;
}

