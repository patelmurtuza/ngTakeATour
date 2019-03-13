import { OnInit, ElementRef, Renderer2 } from '@angular/core';
import { NgxTakeATourService } from './ngx-take-atour.service';
export declare class NgxTakeATourComponent implements OnInit {
    private el;
    private renderer;
    private globalsettings;
    element: any;
    mainPopOver: any;
    currentPopOver: any;
    state: string;
    id: string;
    toggleHelp: boolean;
    positioning: any;
    helpContent: any;
    videoplayer: ElementRef;
    display: string;
    constructor(el: ElementRef, renderer: Renderer2, globalsettings: NgxTakeATourService);
    ngOnInit(): void;
    ngDoCheck(): void;
    openPopover(e: any): void;
    closePopOver(e?: any): void;
    enableCloseAll(): void;
    enableCloseBtn(): void;
    toggleState(): void;
    ngOnDestroy(): void;
}
