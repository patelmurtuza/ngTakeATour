import { CommonModule } from '@angular/common';
import { Injectable, Component, Input, ElementRef, ViewChild, HostBinding, Renderer2, defineInjectable, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgxTakeATourService {
    constructor() {
        this.countPopOverArr = [];
    }
}
NgxTakeATourService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
NgxTakeATourService.ctorParameters = () => [];
/** @nocollapse */ NgxTakeATourService.ngInjectableDef = defineInjectable({ factory: function NgxTakeATourService_Factory() { return new NgxTakeATourService(); }, token: NgxTakeATourService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgxTakeATourComponent {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgxTakeATourModule {
}
NgxTakeATourModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [NgxTakeATourComponent],
                exports: [NgxTakeATourComponent]
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { NgxTakeATourService, NgxTakeATourComponent, NgxTakeATourModule };

//# sourceMappingURL=ngx-take-atour.js.map