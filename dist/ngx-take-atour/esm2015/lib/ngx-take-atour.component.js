/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ElementRef, ViewChild, HostBinding, Renderer2 } from '@angular/core';
import { NgxTakeATourService } from './ngx-take-atour.service';
export class NgxTakeATourComponent {
    /**
     * @param {?} el
     * @param {?} renderer
     * @param {?} globalsettings
     */
    constructor(el, renderer, globalsettings) {
        this.el = el;
        this.renderer = renderer;
        this.globalsettings = globalsettings;
        this.state = 'inactive';
        this.positioning = {};
        this.helpContent = {};
        this.element = el.nativeElement;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.mainPopOver = this.element.querySelector(".popover");
        document.body.appendChild(this.mainPopOver);
        this.renderer.setStyle(this.element, this.positioning.align, this.positioning.value + "px");
    }
    /**
     * @return {?}
     */
    ngDoCheck() {
        if (this.toggleHelp)
            this.display = "block";
        else
            this.display = "none";
    }
    /**
     * @param {?} e
     * @return {?}
     */
    openPopover(e) {
        /** @type {?} */
        let styles = getComputedStyle(this.mainPopOver);
        this.currentPopOver = e.target.getAttribute("data-id");
        this.renderer.setStyle(this.mainPopOver, "display", "block");
        this.renderer.setStyle(this.mainPopOver, "max-width", "500px");
        /** @type {?} */
        let getStyleMW = parseInt(styles.maxWidth, 10);
        this.renderer.setStyle(this.mainPopOver, "left", (e.clientX + 15) - (getStyleMW / 2) + "px");
        this.renderer.setStyle(this.mainPopOver, "top", e.clientY + "px");
        this.renderer.addClass(this.mainPopOver, "tempPopover");
        /** @type {?} */
        let getStyleLeftValue = parseInt(styles.left, 10);
        if (getStyleLeftValue <= 0) {
            this.renderer.setStyle(this.mainPopOver, "left", (e.clientX) + "px");
        }
        if (this.globalsettings.countPopOverArr.length > 0) {
            if (this.globalsettings.countPopOverArr.find(i => i == this.mainPopOver.id) == undefined)
                this.globalsettings.countPopOverArr.push(this.mainPopOver.id);
        }
        else
            this.globalsettings.countPopOverArr.push(this.mainPopOver.id);
        this.enableCloseAll();
    }
    /**
     * @param {?=} e
     * @return {?}
     */
    closePopOver(e) {
        this.renderer.removeAttribute(this.mainPopOver, "style");
        this.renderer.removeClass(this.mainPopOver, "tempPopover");
        /** @type {?} */
        let index = this.globalsettings.countPopOverArr.indexOf(this.mainPopOver.id);
        if (index > -1)
            this.globalsettings.countPopOverArr.splice(index, 1);
        if (this.globalsettings.countPopOverArr.length == 0) {
            if (this.globalsettings.closeBtnMain) {
                this.globalsettings.closeBtnMain.remove();
                this.globalsettings.closeBtnMain = null;
            }
        }
        this.state = 'inactive';
    }
    /**
     * @return {?}
     */
    enableCloseAll() {
        /** @type {?} */
        let totalPopover = document.querySelectorAll(".tempPopover");
        /** @type {?} */
        let closeBtn;
        /** @type {?} */
        let closeIcon;
        /** @type {?} */
        let closeTextWrap;
        /** @type {?} */
        let closeText;
        if (this.globalsettings.countPopOverArr.length > 2) {
            if (!this.globalsettings.closeBtnMain) {
                closeBtn = this.renderer.createElement("div");
                closeIcon = this.renderer.createElement("i");
                closeTextWrap = this.renderer.createElement("span");
                closeText = this.renderer.createText("Close all walkthrough window");
                this.renderer.addClass(closeBtn, "close-popover");
                this.renderer.addClass(closeIcon, "glyphicon");
                this.renderer.addClass(closeIcon, "glyphicon-remove");
                this.renderer.appendChild(document.body, closeBtn);
                this.renderer.appendChild(closeBtn, closeTextWrap);
                this.renderer.appendChild(closeBtn, closeIcon);
                this.renderer.appendChild(closeTextWrap, closeText);
                this.globalsettings.closeBtnMain = document.querySelector(".close-popover");
                this.enableCloseBtn();
                setTimeout(() => {
                    this.renderer.addClass(closeBtn, "visible");
                }, 100);
            }
        }
    }
    /**
     * @return {?}
     */
    enableCloseBtn() {
        /** @type {?} */
        let popOver = document.querySelectorAll(".popover");
        this.globalsettings.closeBtnMain.addEventListener("click", (event) => {
            for (let i = 0; i < popOver.length; i++) {
                if (popOver[i].hasAttribute("style")) {
                    popOver[i].removeAttribute("style");
                    popOver[i].classList.remove("tempPopover");
                }
            }
            this.globalsettings.closeBtnMain.remove();
            this.globalsettings.closeBtnMain = null;
            this.globalsettings.countPopOverArr = [];
            this.state = 'inactive';
        });
    }
    /**
     * @return {?}
     */
    toggleState() {
        this.state = this.state === 'active' ? 'inactive' : 'active';
        this.renderer.setAttribute(this.videoplayer.nativeElement, "src", this.helpContent.videoUrl);
        if (this.state === 'active')
            this.videoplayer.nativeElement.play();
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.closePopOver();
        this.globalsettings.countPopOverArr = [];
        this.globalsettings.closeBtnMain = null;
        this.state = 'inactive';
        document.body.removeChild(this.mainPopOver);
    }
}
NgxTakeATourComponent.decorators = [
    { type: Component, args: [{
                selector: 'NgxTT-NgxTakeATour',
                template: `
  <small class="k-icon k-i-information" attr.data-id="{{id}}" (click)="openPopover($event)"></small>
  <div class="popover" role="tooltip" attr.id="{{id}}">
      <h3 class="popover-title">
          <strong>{{helpContent.title}}</strong>
          <i class="glyphicon glyphicon-remove pull-right" (click)="closePopOver($event)"></i>
      </h3>
      <div class="popover-content">
          <div class="" [@slideToggle]="state">
              <video controls autoplay #videoPlayer>
                  <source src="" type="video/mp4"/>
              </video>
          </div>
          <ul>
              <li *ngFor="let itemContent of helpContent.content">{{itemContent}}</li>
          </ul>
      </div>
      <div class="text-center">
          <button class="btn btn-primary btn-link" (click)="toggleState()">
              <i [ngClass]="state =='active'?'glyphicon glyphicon-menu-up':'glyphicon glyphicon-facetime-video'"></i>
          </button>
      </div>
  </div>
  `,
                styles: ['ngx-take-atour.component.css']
            }] }
];
/** @nocollapse */
NgxTakeATourComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgxTakeATourService }
];
NgxTakeATourComponent.propDecorators = {
    id: [{ type: Input }],
    toggleHelp: [{ type: Input }],
    positioning: [{ type: Input }],
    helpContent: [{ type: Input }],
    videoplayer: [{ type: ViewChild, args: ['videoPlayer',] }],
    display: [{ type: HostBinding, args: ['style.display',] }]
};
if (false) {
    /** @type {?} */
    NgxTakeATourComponent.prototype.element;
    /** @type {?} */
    NgxTakeATourComponent.prototype.mainPopOver;
    /** @type {?} */
    NgxTakeATourComponent.prototype.currentPopOver;
    /** @type {?} */
    NgxTakeATourComponent.prototype.state;
    /** @type {?} */
    NgxTakeATourComponent.prototype.id;
    /** @type {?} */
    NgxTakeATourComponent.prototype.toggleHelp;
    /** @type {?} */
    NgxTakeATourComponent.prototype.positioning;
    /** @type {?} */
    NgxTakeATourComponent.prototype.helpContent;
    /** @type {?} */
    NgxTakeATourComponent.prototype.videoplayer;
    /** @type {?} */
    NgxTakeATourComponent.prototype.display;
    /** @type {?} */
    NgxTakeATourComponent.prototype.el;
    /** @type {?} */
    NgxTakeATourComponent.prototype.renderer;
    /** @type {?} */
    NgxTakeATourComponent.prototype.globalsettings;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRha2UtYXRvdXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXRha2UtYXRvdXIvIiwic291cmNlcyI6WyJsaWIvbmd4LXRha2UtYXRvdXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEcsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUE4Qi9ELE1BQU07Ozs7OztJQWNKLFlBQW9CLEVBQWMsRUFBVSxRQUFtQixFQUFVLGNBQW1DO1FBQXhGLE9BQUUsR0FBRixFQUFFLENBQVk7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsbUJBQWMsR0FBZCxjQUFjLENBQXFCO3FCQVY3RixVQUFVOzJCQUlHLEVBQUU7MkJBQ0YsRUFBRTtRQU01QixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxhQUFhLENBQUM7S0FDakM7Ozs7SUFFRCxRQUFRO1FBQ04sSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMxRCxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsQ0FBQztLQUM3Rjs7OztJQUVELFNBQVM7UUFDUCxJQUFJLElBQUksQ0FBQyxVQUFVO1lBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOztZQUV2QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0s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QUNMLEtBQUs7MEJBRUwsU0FBUyxTQUFDLGFBQWE7c0JBQ3ZCLFdBQVcsU0FBQyxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBFbGVtZW50UmVmLCBWaWV3Q2hpbGQsIEhvc3RCaW5kaW5nLCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5neFRha2VBVG91clNlcnZpY2UgfSBmcm9tICcuL25neC10YWtlLWF0b3VyLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdOZ3hUVC1OZ3hUYWtlQVRvdXInLFxuICB0ZW1wbGF0ZTogYFxuICA8c21hbGwgY2xhc3M9XCJrLWljb24gay1pLWluZm9ybWF0aW9uXCIgYXR0ci5kYXRhLWlkPVwie3tpZH19XCIgKGNsaWNrKT1cIm9wZW5Qb3BvdmVyKCRldmVudClcIj48L3NtYWxsPlxuICA8ZGl2IGNsYXNzPVwicG9wb3ZlclwiIHJvbGU9XCJ0b29sdGlwXCIgYXR0ci5pZD1cInt7aWR9fVwiPlxuICAgICAgPGgzIGNsYXNzPVwicG9wb3Zlci10aXRsZVwiPlxuICAgICAgICAgIDxzdHJvbmc+e3toZWxwQ29udGVudC50aXRsZX19PC9zdHJvbmc+XG4gICAgICAgICAgPGkgY2xhc3M9XCJnbHlwaGljb24gZ2x5cGhpY29uLXJlbW92ZSBwdWxsLXJpZ2h0XCIgKGNsaWNrKT1cImNsb3NlUG9wT3ZlcigkZXZlbnQpXCI+PC9pPlxuICAgICAgPC9oMz5cbiAgICAgIDxkaXYgY2xhc3M9XCJwb3BvdmVyLWNvbnRlbnRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzPVwiXCIgW0BzbGlkZVRvZ2dsZV09XCJzdGF0ZVwiPlxuICAgICAgICAgICAgICA8dmlkZW8gY29udHJvbHMgYXV0b3BsYXkgI3ZpZGVvUGxheWVyPlxuICAgICAgICAgICAgICAgICAgPHNvdXJjZSBzcmM9XCJcIiB0eXBlPVwidmlkZW8vbXA0XCIvPlxuICAgICAgICAgICAgICA8L3ZpZGVvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDx1bD5cbiAgICAgICAgICAgICAgPGxpICpuZ0Zvcj1cImxldCBpdGVtQ29udGVudCBvZiBoZWxwQ29udGVudC5jb250ZW50XCI+e3tpdGVtQ29udGVudH19PC9saT5cbiAgICAgICAgICA8L3VsPlxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzPVwidGV4dC1jZW50ZXJcIj5cbiAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5IGJ0bi1saW5rXCIgKGNsaWNrKT1cInRvZ2dsZVN0YXRlKClcIj5cbiAgICAgICAgICAgICAgPGkgW25nQ2xhc3NdPVwic3RhdGUgPT0nYWN0aXZlJz8nZ2x5cGhpY29uIGdseXBoaWNvbi1tZW51LXVwJzonZ2x5cGhpY29uIGdseXBoaWNvbi1mYWNldGltZS12aWRlbydcIj48L2k+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgPC9kaXY+XG4gIGAsXG4gIHN0eWxlczogWyduZ3gtdGFrZS1hdG91ci5jb21wb25lbnQuY3NzJ11cbn0pXG5leHBvcnQgY2xhc3MgTmd4VGFrZUFUb3VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcHVibGljIGVsZW1lbnQ6IGFueTtcbiAgcHVibGljIG1haW5Qb3BPdmVyOiBhbnk7XG4gIHB1YmxpYyBjdXJyZW50UG9wT3ZlcjogYW55O1xuICBwdWJsaWMgc3RhdGUgPSAnaW5hY3RpdmUnO1xuXG4gIEBJbnB1dCgpIGlkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRvZ2dsZUhlbHA6IGJvb2xlYW47XG4gIEBJbnB1dCgpIHBvc2l0aW9uaW5nOiBhbnkgPSB7fTtcbiAgQElucHV0KCkgaGVscENvbnRlbnQ6IGFueSA9IHt9O1xuXG4gIEBWaWV3Q2hpbGQoJ3ZpZGVvUGxheWVyJykgdmlkZW9wbGF5ZXI6IEVsZW1lbnRSZWY7XG4gIEBIb3N0QmluZGluZygnc3R5bGUuZGlzcGxheScpIGRpc3BsYXk6IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIGVsOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgZ2xvYmFsc2V0dGluZ3M6IE5neFRha2VBVG91clNlcnZpY2UpIHtcbiAgICB0aGlzLmVsZW1lbnQgPSBlbC5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5tYWluUG9wT3ZlciA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiLnBvcG92ZXJcIik7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLm1haW5Qb3BPdmVyKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudCwgdGhpcy5wb3NpdGlvbmluZy5hbGlnbiwgdGhpcy5wb3NpdGlvbmluZy52YWx1ZSArIFwicHhcIik7XG4gIH1cblxuICBuZ0RvQ2hlY2soKSB7XG4gICAgaWYgKHRoaXMudG9nZ2xlSGVscClcbiAgICAgIHRoaXMuZGlzcGxheSA9IFwiYmxvY2tcIjtcbiAgICBlbHNlXG4gICAgICB0aGlzLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgfVxuXG4gIG9wZW5Qb3BvdmVyKGUpIHtcbiAgICBsZXQgc3R5bGVzOiBhbnkgPSBnZXRDb21wdXRlZFN0eWxlKHRoaXMubWFpblBvcE92ZXIpO1xuICAgIHRoaXMuY3VycmVudFBvcE92ZXIgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoXCJkYXRhLWlkXCIpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5tYWluUG9wT3ZlciwgXCJkaXNwbGF5XCIsIFwiYmxvY2tcIik7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLm1haW5Qb3BPdmVyLCBcIm1heC13aWR0aFwiLCBcIjUwMHB4XCIpO1xuICAgIGxldCBnZXRTdHlsZU1XID0gcGFyc2VJbnQoc3R5bGVzLm1heFdpZHRoLCAxMCk7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLm1haW5Qb3BPdmVyLCBcImxlZnRcIiwgKGUuY2xpZW50WCArIDE1KSAtIChnZXRTdHlsZU1XIC8gMikgKyBcInB4XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5tYWluUG9wT3ZlciwgXCJ0b3BcIiwgZS5jbGllbnRZICsgXCJweFwiKTtcbiAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMubWFpblBvcE92ZXIsIFwidGVtcFBvcG92ZXJcIik7XG4gICAgbGV0IGdldFN0eWxlTGVmdFZhbHVlID0gcGFyc2VJbnQoc3R5bGVzLmxlZnQsIDEwKTtcblxuICAgIGlmIChnZXRTdHlsZUxlZnRWYWx1ZSA8PSAwKSB7XG4gICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMubWFpblBvcE92ZXIsIFwibGVmdFwiLCAoZS5jbGllbnRYKSArIFwicHhcIik7XG4gICAgfVxuICAgIGlmICh0aGlzLmdsb2JhbHNldHRpbmdzLmNvdW50UG9wT3ZlckFyci5sZW5ndGggPiAwKSB7XG4gICAgICBpZiAodGhpcy5nbG9iYWxzZXR0aW5ncy5jb3VudFBvcE92ZXJBcnIuZmluZChpID0+IGkgPT0gdGhpcy5tYWluUG9wT3Zlci5pZCkgPT0gdW5kZWZpbmVkKSB0aGlzLmdsb2JhbHNldHRpbmdzLmNvdW50UG9wT3ZlckFyci5wdXNoKHRoaXMubWFpblBvcE92ZXIuaWQpO1xuICAgIH1cbiAgICBlbHNlXG4gICAgICB0aGlzLmdsb2JhbHNldHRpbmdzLmNvdW50UG9wT3ZlckFyci5wdXNoKHRoaXMubWFpblBvcE92ZXIuaWQpO1xuICAgIHRoaXMuZW5hYmxlQ2xvc2VBbGwoKTtcbiAgfVxuXG4gIGNsb3NlUG9wT3ZlcihlPzogYW55KSB7XG5cbiAgICB0aGlzLnJlbmRlcmVyLnJlbW92ZUF0dHJpYnV0ZSh0aGlzLm1haW5Qb3BPdmVyLCBcInN0eWxlXCIpO1xuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2xhc3ModGhpcy5tYWluUG9wT3ZlciwgXCJ0ZW1wUG9wb3ZlclwiKTtcbiAgICBsZXQgaW5kZXggPSB0aGlzLmdsb2JhbHNldHRpbmdzLmNvdW50UG9wT3ZlckFyci5pbmRleE9mKHRoaXMubWFpblBvcE92ZXIuaWQpO1xuICAgIGlmIChpbmRleCA+IC0xKSB0aGlzLmdsb2JhbHNldHRpbmdzLmNvdW50UG9wT3ZlckFyci5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIGlmICh0aGlzLmdsb2JhbHNldHRpbmdzLmNvdW50UG9wT3ZlckFyci5sZW5ndGggPT0gMCkge1xuICAgICAgaWYgKHRoaXMuZ2xvYmFsc2V0dGluZ3MuY2xvc2VCdG5NYWluKSB7XG4gICAgICAgIHRoaXMuZ2xvYmFsc2V0dGluZ3MuY2xvc2VCdG5NYWluLnJlbW92ZSgpO1xuICAgICAgICB0aGlzLmdsb2JhbHNldHRpbmdzLmNsb3NlQnRuTWFpbiA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuc3RhdGUgPSAnaW5hY3RpdmUnO1xuICB9XG5cbiAgZW5hYmxlQ2xvc2VBbGwoKSB7XG4gICAgbGV0IHRvdGFsUG9wb3ZlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIudGVtcFBvcG92ZXJcIik7XG4gICAgbGV0IGNsb3NlQnRuLCBjbG9zZUljb24sIGNsb3NlVGV4dFdyYXAsIGNsb3NlVGV4dDtcblxuICAgIGlmICh0aGlzLmdsb2JhbHNldHRpbmdzLmNvdW50UG9wT3ZlckFyci5sZW5ndGggPiAyKSB7XG4gICAgICBpZiAoIXRoaXMuZ2xvYmFsc2V0dGluZ3MuY2xvc2VCdG5NYWluKSB7XG4gICAgICAgIGNsb3NlQnRuID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBjbG9zZUljb24gPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJpXCIpO1xuICAgICAgICBjbG9zZVRleHRXcmFwID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KFwic3BhblwiKTtcbiAgICAgICAgY2xvc2VUZXh0ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVUZXh0KFwiQ2xvc2UgYWxsIHdhbGt0aHJvdWdoIHdpbmRvd1wiKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhjbG9zZUJ0biwgXCJjbG9zZS1wb3BvdmVyXCIpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGNsb3NlSWNvbiwgXCJnbHlwaGljb25cIik7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoY2xvc2VJY29uLCBcImdseXBoaWNvbi1yZW1vdmVcIik7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuYm9keSwgY2xvc2VCdG4pO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGNsb3NlQnRuLCBjbG9zZVRleHRXcmFwKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChjbG9zZUJ0biwgY2xvc2VJY29uKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChjbG9zZVRleHRXcmFwLCBjbG9zZVRleHQpO1xuICAgICAgICB0aGlzLmdsb2JhbHNldHRpbmdzLmNsb3NlQnRuTWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY2xvc2UtcG9wb3ZlclwiKTtcbiAgICAgICAgdGhpcy5lbmFibGVDbG9zZUJ0bigpO1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGNsb3NlQnRuLCBcInZpc2libGVcIik7XG4gICAgICAgIH0sIDEwMCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZW5hYmxlQ2xvc2VCdG4oKSB7XG4gICAgbGV0IHBvcE92ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLnBvcG92ZXJcIik7XG5cbiAgICB0aGlzLmdsb2JhbHNldHRpbmdzLmNsb3NlQnRuTWFpbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGV2ZW50OiBFdmVudCkgPT4ge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwb3BPdmVyLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGlmIChwb3BPdmVyW2ldLmhhc0F0dHJpYnV0ZShcInN0eWxlXCIpKSB7XG4gICAgICAgICAgcG9wT3ZlcltpXS5yZW1vdmVBdHRyaWJ1dGUoXCJzdHlsZVwiKTtcbiAgICAgICAgICBwb3BPdmVyW2ldLmNsYXNzTGlzdC5yZW1vdmUoXCJ0ZW1wUG9wb3ZlclwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5nbG9iYWxzZXR0aW5ncy5jbG9zZUJ0bk1haW4ucmVtb3ZlKCk7XG4gICAgICB0aGlzLmdsb2JhbHNldHRpbmdzLmNsb3NlQnRuTWFpbiA9IG51bGw7XG4gICAgICB0aGlzLmdsb2JhbHNldHRpbmdzLmNvdW50UG9wT3ZlckFyciA9IFtdO1xuICAgICAgdGhpcy5zdGF0ZSA9ICdpbmFjdGl2ZSc7XG4gICAgfSk7XG4gIH1cblxuICB0b2dnbGVTdGF0ZSgpIHtcbiAgICB0aGlzLnN0YXRlID0gdGhpcy5zdGF0ZSA9PT0gJ2FjdGl2ZScgPyAnaW5hY3RpdmUnIDogJ2FjdGl2ZSc7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy52aWRlb3BsYXllci5uYXRpdmVFbGVtZW50LCBcInNyY1wiLCB0aGlzLmhlbHBDb250ZW50LnZpZGVvVXJsKTtcbiAgICBpZiAodGhpcy5zdGF0ZSA9PT0gJ2FjdGl2ZScpXG4gICAgICB0aGlzLnZpZGVvcGxheWVyLm5hdGl2ZUVsZW1lbnQucGxheSgpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5jbG9zZVBvcE92ZXIoKTtcbiAgICB0aGlzLmdsb2JhbHNldHRpbmdzLmNvdW50UG9wT3ZlckFyciA9IFtdO1xuICAgIHRoaXMuZ2xvYmFsc2V0dGluZ3MuY2xvc2VCdG5NYWluID0gbnVsbDtcbiAgICB0aGlzLnN0YXRlID0gJ2luYWN0aXZlJztcbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHRoaXMubWFpblBvcE92ZXIpO1xuICB9XG5cbn1cbiJdfQ==