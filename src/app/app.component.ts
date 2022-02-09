// Angular Modules
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

// Third's Modules
import { IconNamesEnum } from 'ngx-bootstrap-icons';
import { Observable, fromEvent, takeUntil, Subject } from 'rxjs';

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
    public scroll$: Observable<Event> = fromEvent(document, 'scroll');
    public scrollPercent: number = 0;
    public showButton: boolean = false;

    // Private properties
    private _unsubscribeAll: Subject<any> = new Subject<any>();


    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit() {

        // Subscribe to scroll position changes
        this.scroll$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((event) => {
                this.scrollPercent = this._calculateScrollPercentage(event);
                console.log(this.scrollPercent >= 14.34)
                if (this.scrollPercent >= 14.34) {
                    this.showButton = true;
                } else {
                    this.showButton = false;
                }
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    private _calculateScrollPercentage(event): number {

        const {
            scrollTop,
            scrollHeight,
            clientHeight,
        } = event.target.documentElement;

        const scrollPercent = (scrollTop / (scrollHeight + clientHeight)) * 100;

        return scrollPercent;
    }

}
