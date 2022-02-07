import { IconName, IconNamesEnum } from "ngx-bootstrap-icons";

/**
 * Product
 *
 * @export
 * @interface Product
 */
export interface Product {
    _id?: string;
    logoUrl?: string;
    status?: string;
    name?: string;
    abstract?: string;
    description?: string;
}

/**
 * Member
 *
 * @export
 * @interface Member
 */
export interface Member {
    _id?: string;
    imageUrl?: string;
    fullName?: string;
    title?: string;
    abstract?: string;
    socials?: Social[];
}

/**
 * Social
 *
 * @export
 * @interface Social
 */
export interface Social {
    name?: string;
    icon?: string;
    link?: string;
}
