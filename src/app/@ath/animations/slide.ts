import { animate, state, style, transition, trigger } from '@angular/animations';
import { AthAnimationCurves, AthAnimationDurations } from './defaults';

// -----------------------------------------------------------------------------------------------------
// @ Slide in top
// -----------------------------------------------------------------------------------------------------
const slideInTop = trigger('slideInTop', [
    state('void',
        style({
            transform: 'translate3d(0, -100%, 0)'
        })
    ),

    state('*',
        style({
            transform: 'translate3d(0, 0, 0)'
        })
    ),

    // Prevent the transition if the state is false
    transition('void => false', []),

    // Transition
    transition('void => *', animate('{{timings}}'), {
        params: {
            timings: `${AthAnimationDurations.entering} ${AthAnimationCurves.deceleration}`
        }
    })
]);

// -----------------------------------------------------------------------------------------------------
// @ Slide in bottom
// -----------------------------------------------------------------------------------------------------
const slideInBottom = trigger('slideInBottom', [
    state('void',
        style({
            transform: 'translate3d(0, 100%, 0)'
        })
    ),

    state('*',
        style({
            transform: 'translate3d(0, 0, 0)'
        })
    ),

    // Prevent the transition if the state is false
    transition('void => false', []),

    // Transition
    transition('void => *', animate('{{timings}}'), {
        params: {
            timings: `${AthAnimationDurations.entering} ${AthAnimationCurves.deceleration}`
        }
    })
]);

// -----------------------------------------------------------------------------------------------------
// @ Slide in left
// -----------------------------------------------------------------------------------------------------
export const slideInLeft = trigger('slideInLeft', [
    state('void',
        style({
            transform: 'translate3d(-100%, 0, 0)'
        })
    ),

    state('*',
        style({
            transform: 'translate3d(0, 0, 0)'
        })
    ),

    // Prevent the transition if the state is false
    transition('void => false', []),

    // Transition
    transition('void => *', animate('{{timings}}'), {
        params: {
            timings: `${AthAnimationDurations.entering} ${AthAnimationCurves.deceleration}`
        }
    })
]);

// -----------------------------------------------------------------------------------------------------
// @ Slide in right
// -----------------------------------------------------------------------------------------------------
export const slideInRight = trigger('slideInRight', [
    state('void',
        style({
            transform: 'translate3d(100%, 0, 0)'
        })
    ),

    state('*',
        style({
            transform: 'translate3d(0, 0, 0)'
        })
    ),

    // Prevent the transition if the state is false
    transition('void => false', []),

    // Transition
    transition('void => *', animate('{{timings}}'), {
        params: {
            timings: `${AthAnimationDurations.entering} ${AthAnimationCurves.deceleration}`
        }
    })
]);

// -----------------------------------------------------------------------------------------------------
// @ Slide out top
// -----------------------------------------------------------------------------------------------------
const slideOutTop = trigger('slideOutTop', [
    state('*',
        style({
            transform: 'translate3d(0, 0, 0)'
        })
    ),

    state('void',
        style({
            transform: 'translate3d(0, -100%, 0)'
        })
    ),

    // Prevent the transition if the state is false
    transition('false => void', []),

    // Transition
    transition('* => void', animate('{{timings}}'), {
        params: {
            timings: `${AthAnimationDurations.exiting} ${AthAnimationCurves.acceleration}`
        }
    })
]);

// -----------------------------------------------------------------------------------------------------
// @ Slide out bottom
// -----------------------------------------------------------------------------------------------------
const slideOutBottom = trigger('slideOutBottom', [
    state('*',
        style({
            transform: 'translate3d(0, 0, 0)'
        })
    ),

    state('void',
        style({
            transform: 'translate3d(0, 100%, 0)'
        })
    ),

    // Prevent the transition if the state is false
    transition('false => void', []),

    // Transition
    transition('* => void', animate('{{timings}}'), {
        params: {
            timings: `${AthAnimationDurations.exiting} ${AthAnimationCurves.acceleration}`
        }
    })
]);

// -----------------------------------------------------------------------------------------------------
// @ Slide out left
// -----------------------------------------------------------------------------------------------------
export const slideOutLeft = trigger('slideOutLeft', [
    state('*',
        style({
            transform: 'translate3d(0, 0, 0)'
        })
    ),

    state('void',
        style({
            transform: 'translate3d(-100%, 0, 0)'
        })
    ),

    // Prevent the transition if the state is false
    transition('false => void', []),

    // Transition
    transition('* => void', animate('{{timings}}'), {
        params: {
            timings: `${AthAnimationDurations.exiting} ${AthAnimationCurves.acceleration}`
        }
    })
]);

// -----------------------------------------------------------------------------------------------------
// @ Slide out right
// -----------------------------------------------------------------------------------------------------
export const slideOutRight = trigger('slideOutRight', [
    state('*',
        style({
            transform: 'translate3d(0, 0, 0)'
        })
    ),

    state('void',
        style({
            transform: 'translate3d(100%, 0, 0)'
        })
    ),

    // Prevent the transition if the state is false
    transition('false => void', []),

    // Transition
    transition('* => void', animate('{{timings}}'), {
        params: {
            timings: `${AthAnimationDurations.exiting} ${AthAnimationCurves.acceleration}`
        }
    })
]);

