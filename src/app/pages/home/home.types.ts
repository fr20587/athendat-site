
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
    subtitle?: string;
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
