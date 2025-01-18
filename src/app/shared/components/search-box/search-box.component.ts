import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
    selector: 'shared-search-box',
    templateUrl: './search-box.component.html',
    styleUrl: './search-box.component.css'
})
export class SearchBoxComponent implements OnInit, OnDestroy {

    private debouncer: Subject<string> = new Subject<string>();
    private debouncerSuscription?: Subscription

    @Input()
    public placeholder: string = '';

    @Input()
    public initialValue: string = '';

    @Output()
    public onSearch: EventEmitter<string> = new EventEmitter();

    @Output()
    public onDebounce: EventEmitter<string> = new EventEmitter();

    ngOnInit(): void {
        this.debouncerSuscription = this.debouncer
        .pipe(  debounceTime(400) )
        .subscribe( value => {
            this.onDebounce.emit(value);
        })
    }

    search(txt: string) {
        console.log('mmmm');
        this.onSearch.emit(txt);
    }

    onKeyPress(txt: string) {
        this.debouncer.next( txt );
    }

    ngOnDestroy(): void {
        this.debouncerSuscription?.unsubscribe();
    }
}
