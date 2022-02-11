// Angular Modules
import { ChangeDetectionStrategy, Component, HostListener, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

// Third's Modules
import { Howl } from 'howler';
import { Subject } from 'rxjs';
import { IconNamesEnum } from 'ngx-bootstrap-icons';

/**
 * App Component
 *
 * @export
 * @class AppComponent
 * @implements {OnInit}
 * @implements {OnDestroy}
 */
@Component({
    selector: 'ath-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {

    // Public properties
    public iconNames = IconNamesEnum;
    public scrollY: number = 0;
    public showButton: boolean = false;
    public sound = new Howl({
        src: 'assets/audio/bg-audio.mp3',
        loop: true,
        volume: 0.3
    });

    // Private properties
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit() {
        // Play music background
        this.sound.play();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();

        // Stop music background
        this.sound.stop();
    }

    /**
     * Watch screen width
     *
     * @memberof HeaderComponent
     */
    @HostListener('window:scroll', ['$event'])
    public onWindowResize() {
        this.scrollY = window.scrollY;
    }

    /**
     * Back to top scroll
     *
     * @memberof AppComponent
     */
    public backToTop() {
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

}
