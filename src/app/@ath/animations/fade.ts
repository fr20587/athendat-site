import { animate, state, style, transition, trigger } from '@angular/animations';
import { AthAnimationCurves, AthAnimationDurations } from './defaults';

// -----------------------------------------------------------------------------------------------------
// @ Fade in
// -----------------------------------------------------------------------------------------------------
export const fadeIn = trigger('fadeIn',
    [
        state('void',
            style({
                opacity: 0
            })
        ),

        state('*',
            style({
                opacity: 1
            })
        ),

        // Prevent the transition if the state is false
        transition('void => false', []),

        // Transition
        transition('void => *', animate('{{timings}}'),
            {
                params: {
                    timings: `${AthAnimationDurations.complex} ${AthAnimationCurves.sharp}`
                }
            }
        )
    ]
);

// -----------------------------------------------------------------------------------------------------
// @ Fade out
// -----------------------------------------------------------------------------------------------------
export const fadeOut = trigger('fadeOut',
    [
        state('*',
            style({
                opacity: 1
            })
        ),

        state('void',
            style({
                opacity: 0
            })
        ),

        // Prevent the transition if the state is false
        transition('false => void', []),

        // Transition
        transition('* => void', animate('{{timings}}'),
            {
                params: {
                    timings: `${AthAnimationDurations.complex} ${AthAnimationCurves.sharp}`
                }
            }
        )
    ]
);
