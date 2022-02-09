import { trigger, transition, style, query, group, animate, animateChild } from "@angular/animations";

export const pagesAnimation =
    trigger('routeAnimations', [
        // transition('HomePage <=> AboutPage', [
        //     style({ position: 'relative' }),
        //     query(':enter, :leave', [
        //         style({
        //             position: 'absolute',
        //             top: 0,
        //             left: 0,
        //             opacity: 1,
        //             width: '100%'
        //         })
        //     ]),
        //     query(':enter', [
        //         style({ opacity: 0 })
        //         // style({ left: '-100%' })
        //     ]),
        //     query(':leave', animateChild()),
        //     group([
        //         query(':leave', [
        //             animate('300ms ease-out', style({ opacity: 1 }))
        //         ]),
        //         query(':enter', [
        //             animate('300ms ease-out', style({ opacity: 0 }))
        //         ])
        //     ]),
        //     query(':enter', animateChild()),
        // ]),
        // transition('* <=> ContactPage', [
        //     style({ position: 'relative' }),
        //     query(':enter, :leave', [
        //         style({
        //             position: 'absolute',
        //             top: 0,
        //             left: 0,
        //             width: '100%',
        //             opacity: 1
        //         })
        //     ]),
        //     query(':enter', [
        //         style({ opacity: 0 })
        //     ]),
        //     query(':leave', animateChild()),
        //     group([
        //         query(':leave', [
        //             animate('200ms ease-out', style({ opacity: 1 }))
        //         ]),
        //         query(':enter', [
        //             animate('300ms ease-out', style({ opacity: 0 }))
        //         ])
        //     ]),
        //     query(':enter', animateChild()),
        // ])
        // transition('* => *', [
        //     style({ position: 'relative' }),
        //     query(':enter, :leave', [
        //         style({
        //             position: 'absolute',
        //             top: 0,
        //             left: 0,
        //             width: '100%',
        //             opacity: 1
        //         })
        //     ]),
        //     query(':enter', [
        //         style({ opacity: 0 })
        //     ]),
        //     query(':leave', animateChild()),
        //     group([
        //         query(':leave', [
        //             animate('200ms ease-out', style({ opacity: 1 }))
        //         ]),
        //         query(':enter', [
        //             animate('300ms ease-out', style({ opacity: 0 }))
        //         ])
        //     ]),
        //     query(':enter', animateChild()),
        // ])
        // transition('* <=> *', [
        //     query(':enter', [
        //             style({ opacity: 0 })
        //         ], { optional: true }
        //     ),
        //     group([
        //         query(':leave', [
        //                 animate(300, style({ opacity: 0 }))
        //             ],
        //             { optional: true }
        //         ),
        //         query(':enter', [
        //                 style({ opacity: 0 }),
        //                 animate(300, style({ opacity: 1 }))
        //             ],
        //             { optional: true }
        //         )
        //     ]),
        //     query(':enter', animateChild()),
        // ])
        transition('* <=> *', [
            // Set a default  style for enter and leave
            query(':enter, :leave', [
              style({
                position: 'absolute',
                left: 0,
                width: '100%',
                height: '100%',
                opacity: 0,
                // transform: 'scale(0) translateY(100%)',
              }),
            ]),
            // Animate the new page in
            query(':enter', [
              animate('600ms ease', style({ opacity: 1 })),
            ]),
            // query(':leave', [
            //   animate('600ms ease', style({ opacity: 0 })),
            // ])
          ]),
    ]);
