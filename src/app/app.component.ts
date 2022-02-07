// Angular Modules
import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';

// Third's Modules
import { Howl } from 'howler';

/**
 * App Component
 *
 * @export
 * @class AppComponent
 * @implements {OnInit}
 */
@Component({
    selector: 'ath-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {

    // Public Properties
    public title = 'athendat.io';
    public sound = new Howl({
        src: 'assets/audio/bg-audio.mp3',
        loop: true,
        
    });

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit() {
        // Play the sound.
        // this.sound.play();
    }
}
