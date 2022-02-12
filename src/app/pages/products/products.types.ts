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

type State = 'En desarrollo' | 'Disponible' | 'En pruebas';
type Status = 'Completado' | 'Proceso' | 'Planificado';
