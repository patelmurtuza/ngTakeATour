(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/common'), require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('ngx-take-atour', ['exports', '@angular/common', '@angular/core'], factory) :
    (factory((global['ngx-take-atour'] = {}),global.ng.common,global.ng.core));
}(this, (function (exports,common,i0) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgxTakeATourService = /** @class */ (function () {
        function NgxTakeATourService() {
            this.countPopOverArr = [];
        }
        NgxTakeATourService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] }
        ];
        /** @nocollapse */
        NgxTakeATourService.ctorParameters = function () { return []; };
        /** @nocollapse */ NgxTakeATourService.ngInjectableDef = i0.defineInjectable({ factory: function NgxTakeATourService_Factory() { return new NgxTakeATourService(); }, token: NgxTakeATourService, providedIn: "root" });
        return NgxTakeATourService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgxTakeATourComponent = /** @class */ (function () {
        function NgxTakeATourComponent(el, renderer, globalsettings) {
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
        NgxTakeATourComponent.prototype.ngOnInit = /**
         * @return {?}
         */
            function () {
                this.mainPopOver = this.element.querySelector(".popover");
                document.body.appendChild(this.mainPopOver);
                this.renderer.setStyle(this.element, this.positioning.align, this.positioning.value + "px");
            };
        /**
         * @return {?}
         */
        NgxTakeATourComponent.prototype.ngDoCheck = /**
         * @return {?}
         */
            function () {
                if (this.toggleHelp)
                    this.display = "block";
                else
                    this.display = "none";
            };
        /**
         * @param {?} e
         * @return {?}
         */
        NgxTakeATourComponent.prototype.openPopover = /**
         * @param {?} e
         * @return {?}
         */
            function (e) {
                var _this = this;
                /** @type {?} */
                var styles = getComputedStyle(this.mainPopOver);
                this.currentPopOver = e.target.getAttribute("data-id");
                this.renderer.setStyle(this.mainPopOver, "display", "block");
                this.renderer.setStyle(this.mainPopOver, "max-width", "500px");
                /** @type {?} */
                var getStyleMW = parseInt(styles.maxWidth, 10);
                this.renderer.setStyle(this.mainPopOver, "left", (e.clientX + 15) - (getStyleMW / 2) + "px");
                this.renderer.setStyle(this.mainPopOver, "top", e.clientY + "px");
                this.renderer.addClass(this.mainPopOver, "tempPopover");
                /** @type {?} */
                var getStyleLeftValue = parseInt(styles.left, 10);
                if (getStyleLeftValue <= 0) {
                    this.renderer.setStyle(this.mainPopOver, "left", (e.clientX) + "px");
                }
                if (this.globalsettings.countPopOverArr.length > 0) {
                    if (this.globalsettings.countPopOverArr.find(function (i) { return i == _this.mainPopOver.id; }) == undefined)
                        this.globalsettings.countPopOverArr.push(this.mainPopOver.id);
                }
                else
                    this.globalsettings.countPopOverArr.push(this.mainPopOver.id);
                this.enableCloseAll();
            };
        /**
         * @param {?=} e
         * @return {?}
         */
        NgxTakeATourComponent.prototype.closePopOver = /**
         * @param {?=} e
         * @return {?}
         */
            function (e) {
                this.renderer.removeAttribute(this.mainPopOver, "style");
                this.renderer.removeClass(this.mainPopOver, "tempPopover");
                /** @type {?} */
                var index = this.globalsettings.countPopOverArr.indexOf(this.mainPopOver.id);
                if (index > -1)
                    this.globalsettings.countPopOverArr.splice(index, 1);
                if (this.globalsettings.countPopOverArr.length == 0) {
                    if (this.globalsettings.closeBtnMain) {
                        this.globalsettings.closeBtnMain.remove();
                        this.globalsettings.closeBtnMain = null;
                    }
                }
                this.state = 'inactive';
            };
        /**
         * @return {?}
         */
        NgxTakeATourComponent.prototype.enableCloseAll = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var totalPopover = document.querySelectorAll(".tempPopover");
                /** @type {?} */
                var closeBtn;
                /** @type {?} */
                var closeIcon;
                /** @type {?} */
                var closeTextWrap;
                /** @type {?} */
                var closeText;
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
                        setTimeout(function () {
                            _this.renderer.addClass(closeBtn, "visible");
                        }, 100);
                    }
                }
            };
        /**
         * @return {?}
         */
        NgxTakeATourComponent.prototype.enableCloseBtn = /**
         * @return {?}
         */
            function () {
                var _this = this;
                /** @type {?} */
                var popOver = document.querySelectorAll(".popover");
                this.globalsettings.closeBtnMain.addEventListener("click", function (event) {
                    for (var i = 0; i < popOver.length; i++) {
                        if (popOver[i].hasAttribute("style")) {
                            popOver[i].removeAttribute("style");
                            popOver[i].classList.remove("tempPopover");
                        }
                    }
                    _this.globalsettings.closeBtnMain.remove();
                    _this.globalsettings.closeBtnMain = null;
                    _this.globalsettings.countPopOverArr = [];
                    _this.state = 'inactive';
                });
            };
        /**
         * @return {?}
         */
        NgxTakeATourComponent.prototype.toggleState = /**
         * @return {?}
         */
            function () {
                this.state = this.state === 'active' ? 'inactive' : 'active';
                this.renderer.setAttribute(this.videoplayer.nativeElement, "src", this.helpContent.videoUrl);
                if (this.state === 'active')
                    this.videoplayer.nativeElement.play();
            };
        /**
         * @return {?}
         */
        NgxTakeATourComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
            function () {
                this.closePopOver();
                this.globalsettings.countPopOverArr = [];
                this.globalsettings.closeBtnMain = null;
                this.state = 'inactive';
                document.body.removeChild(this.mainPopOver);
            };
        NgxTakeATourComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'NgxTT-NgxTakeATour',
                        template: "\n  <small class=\"k-icon k-i-information\" attr.data-id=\"{{id}}\" (click)=\"openPopover($event)\"></small>\n  <div class=\"popover\" role=\"tooltip\" attr.id=\"{{id}}\">\n      <h3 class=\"popover-title\">\n          <strong>{{helpContent.title}}</strong>\n          <i class=\"glyphicon glyphicon-remove pull-right\" (click)=\"closePopOver($event)\"></i>\n      </h3>\n      <div class=\"popover-content\">\n          <div class=\"\" [@slideToggle]=\"state\">\n              <video controls autoplay #videoPlayer>\n                  <source src=\"\" type=\"video/mp4\"/>\n              </video>\n          </div>\n          <ul>\n              <li *ngFor=\"let itemContent of helpContent.content\">{{itemContent}}</li>\n          </ul>\n      </div>\n      <div class=\"text-center\">\n          <button class=\"btn btn-primary btn-link\" (click)=\"toggleState()\">\n              <i [ngClass]=\"state =='active'?'glyphicon glyphicon-menu-up':'glyphicon glyphicon-facetime-video'\"></i>\n          </button>\n      </div>\n  </div>\n  ",
                        styles: ['ngx-take-atour.component.css']
                    }] }
        ];
        /** @nocollapse */
        NgxTakeATourComponent.ctorParameters = function () {
            return [
                { type: i0.ElementRef },
                { type: i0.Renderer2 },
                { type: NgxTakeATourService }
            ];
        };
        NgxTakeATourComponent.propDecorators = {
            id: [{ type: i0.Input }],
            toggleHelp: [{ type: i0.Input }],
            positioning: [{ type: i0.Input }],
            helpContent: [{ type: i0.Input }],
            videoplayer: [{ type: i0.ViewChild, args: ['videoPlayer',] }],
            display: [{ type: i0.HostBinding, args: ['style.display',] }]
        };
        return NgxTakeATourComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgxTakeATourModule = /** @class */ (function () {
        function NgxTakeATourModule() {
        }
        NgxTakeATourModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule
                        ],
                        declarations: [NgxTakeATourComponent],
                        exports: [NgxTakeATourComponent]
                    },] }
        ];
        return NgxTakeATourModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */

    exports.NgxTakeATourService = NgxTakeATourService;
    exports.NgxTakeATourComponent = NgxTakeATourComponent;
    exports.NgxTakeATourModule = NgxTakeATourModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ngx-take-atour.umd.js.map