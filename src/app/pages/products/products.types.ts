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
    cost?: string;
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
