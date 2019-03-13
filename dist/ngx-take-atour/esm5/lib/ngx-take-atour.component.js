/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ElementRef, ViewChild, HostBinding, Renderer2 } from '@angular/core';
import { NgxTakeATourService } from './ngx-take-atour.service';
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
        { type: Component, args: [{
                    selector: 'NgxTT-NgxTakeATour',
                    template: "\n  <small class=\"k-icon k-i-information\" attr.data-id=\"{{id}}\" (click)=\"openPopover($event)\"></small>\n  <div class=\"popover\" role=\"tooltip\" attr.id=\"{{id}}\">\n      <h3 class=\"popover-title\">\n          <strong>{{helpContent.title}}</strong>\n          <i class=\"glyphicon glyphicon-remove pull-right\" (click)=\"closePopOver($event)\"></i>\n      </h3>\n      <div class=\"popover-content\">\n          <div class=\"\" [@slideToggle]=\"state\">\n              <video controls autoplay #videoPlayer>\n                  <source src=\"\" type=\"video/mp4\"/>\n              </video>\n          </div>\n          <ul>\n              <li *ngFor=\"let itemContent of helpContent.content\">{{itemContent}}</li>\n          </ul>\n      </div>\n      <div class=\"text-center\">\n          <button class=\"btn btn-primary btn-link\" (click)=\"toggleState()\">\n              <i [ngClass]=\"state =='active'?'glyphicon glyphicon-menu-up':'glyphicon glyphicon-facetime-video'\"></i>\n          </button>\n      </div>\n  </div>\n  ",
                    styles: ['ngx-take-atour.component.css']
                }] }
    ];
    /** @nocollapse */
    NgxTakeATourComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 },
        { type: NgxTakeATourService }
    ]; };
    NgxTakeATourComponent.propDecorators = {
        id: [{ type: Input }],
        toggleHelp: [{ type: Input }],
        positioning: [{ type: Input }],
        helpContent: [{ type: Input }],
        videoplayer: [{ type: ViewChild, args: ['videoPlayer',] }],
        display: [{ type: HostBinding, args: ['style.display',] }]
    };
    return NgxTakeATourComponent;
}());
export { NgxTakeATourComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRha2UtYXRvdXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXRha2UtYXRvdXIvIiwic291cmNlcyI6WyJsaWIvbmd4LXRha2UtYXRvdXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLEtBQUssRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDeEcsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7O0lBNEM3RCwrQkFBb0IsRUFBYyxFQUFVLFFBQW1CLEVBQVUsY0FBbUM7UUFBeEYsT0FBRSxHQUFGLEVBQUUsQ0FBWTtRQUFVLGFBQVEsR0FBUixRQUFRLENBQVc7UUFBVSxtQkFBYyxHQUFkLGNBQWMsQ0FBcUI7cUJBVjdGLFVBQVU7MkJBSUcsRUFBRTsyQkFDRixFQUFFO1FBTTVCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztLQUNqQzs7OztJQUVELHdDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDMUQsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUM7S0FDN0Y7Ozs7SUFFRCx5Q0FBUzs7O0lBQVQ7UUFDRSxJQUFJLElBQUksQ0FBQyxVQUFVO1lBQ2pCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDOztZQUV2QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztLQUN6Qjs7Ozs7SUFFRCwyQ0FBVzs7OztJQUFYLFVBQVksQ0FBQztRQUFiLGlCQW9CQzs7UUFuQkMsSUFBSSxNQUFNLEdBQVEsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxjQUFjLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDdkQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDN0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxXQUFXLEVBQUUsT0FBTyxDQUFDLENBQUM7O1FBQy9ELElBQUksVUFBVSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQVUsR0FBRyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUM3RixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLENBQUM7O1FBQ3hELElBQUksaUJBQWlCLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFbEQsSUFBSSxpQkFBaUIsSUFBSSxDQUFDLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7U0FDdEU7UUFDRCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDbEQsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLElBQUksS0FBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQXhCLENBQXdCLENBQUMsSUFBSSxTQUFTO2dCQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3pKOztZQUVDLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ2hFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUN2Qjs7Ozs7SUFFRCw0Q0FBWTs7OztJQUFaLFVBQWEsQ0FBTztRQUVsQixJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBQ3pELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsYUFBYSxDQUFDLENBQUM7O1FBQzNELElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdFLElBQUksS0FBSyxHQUFHLENBQUMsQ0FBQztZQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDckUsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLGVBQWUsQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ25ELElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUMxQyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7YUFDekM7U0FDRjtRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsVUFBVSxDQUFDO0tBQ3pCOzs7O0lBRUQsOENBQWM7OztJQUFkO1FBQUEsaUJBd0JDOztRQXZCQyxJQUFJLFlBQVksR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUM7O1FBQzdELElBQUksUUFBUSxDQUFzQzs7UUFBbEQsSUFBYyxTQUFTLENBQTJCOztRQUFsRCxJQUF5QixhQUFhLENBQVk7O1FBQWxELElBQXdDLFNBQVMsQ0FBQztRQUVsRCxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDbEQsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFO2dCQUNyQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzlDLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDN0MsYUFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNwRCxTQUFTLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsOEJBQThCLENBQUMsQ0FBQztnQkFDckUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsV0FBVyxDQUFDLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO2dCQUN0RCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dCQUNuRCxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7Z0JBQ25ELElBQUksQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUNwRCxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLGdCQUFnQixDQUFDLENBQUM7Z0JBQzVFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdEIsVUFBVSxDQUFDO29CQUNULEtBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRSxTQUFTLENBQUMsQ0FBQztpQkFDN0MsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNUO1NBQ0Y7S0FDRjs7OztJQUVELDhDQUFjOzs7SUFBZDtRQUFBLGlCQWVDOztRQWRDLElBQUksT0FBTyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVwRCxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQyxLQUFZO1lBQ3RFLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUN2QyxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ3BDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQ3BDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2lCQUM1QzthQUNGO1lBQ0QsS0FBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDMUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3hDLEtBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztZQUN6QyxLQUFJLENBQUMsS0FBSyxHQUFHLFVBQVUsQ0FBQztTQUN6QixDQUFDLENBQUM7S0FDSjs7OztJQUVELDJDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO1FBQzdELElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzdGLElBQUksSUFBSSxDQUFDLEtBQUssS0FBSyxRQUFRO1lBQ3pCLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3pDOzs7O0lBRUQsMkNBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3BCLElBQUksQ0FBQyxjQUFjLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQztRQUN6QyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7UUFDeEMsSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUM7UUFDeEIsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQzdDOztnQkF4SkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLFFBQVEsRUFBRSxnaENBdUJUOzZCQUNRLDhCQUE4QjtpQkFDeEM7Ozs7Z0JBOUJrQyxVQUFVO2dCQUEwQixTQUFTO2dCQUN2RSxtQkFBbUI7OztxQkFvQ3pCLEtBQUs7NkJBQ0wsS0FBSzs4QkFDTCxLQUFLOzhCQUNMLEtBQUs7OEJBRUwsU0FBUyxTQUFDLGFBQWE7MEJBQ3ZCLFdBQVcsU0FBQyxlQUFlOztnQ0EzQzlCOztTQStCYSxxQkFBcUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIEVsZW1lbnRSZWYsIFZpZXdDaGlsZCwgSG9zdEJpbmRpbmcsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmd4VGFrZUFUb3VyU2VydmljZSB9IGZyb20gJy4vbmd4LXRha2UtYXRvdXIuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ05neFRULU5neFRha2VBVG91cicsXG4gIHRlbXBsYXRlOiBgXG4gIDxzbWFsbCBjbGFzcz1cImstaWNvbiBrLWktaW5mb3JtYXRpb25cIiBhdHRyLmRhdGEtaWQ9XCJ7e2lkfX1cIiAoY2xpY2spPVwib3BlblBvcG92ZXIoJGV2ZW50KVwiPjwvc21hbGw+XG4gIDxkaXYgY2xhc3M9XCJwb3BvdmVyXCIgcm9sZT1cInRvb2x0aXBcIiBhdHRyLmlkPVwie3tpZH19XCI+XG4gICAgICA8aDMgY2xhc3M9XCJwb3BvdmVyLXRpdGxlXCI+XG4gICAgICAgICAgPHN0cm9uZz57e2hlbHBDb250ZW50LnRpdGxlfX08L3N0cm9uZz5cbiAgICAgICAgICA8aSBjbGFzcz1cImdseXBoaWNvbiBnbHlwaGljb24tcmVtb3ZlIHB1bGwtcmlnaHRcIiAoY2xpY2spPVwiY2xvc2VQb3BPdmVyKCRldmVudClcIj48L2k+XG4gICAgICA8L2gzPlxuICAgICAgPGRpdiBjbGFzcz1cInBvcG92ZXItY29udGVudFwiPlxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJcIiBbQHNsaWRlVG9nZ2xlXT1cInN0YXRlXCI+XG4gICAgICAgICAgICAgIDx2aWRlbyBjb250cm9scyBhdXRvcGxheSAjdmlkZW9QbGF5ZXI+XG4gICAgICAgICAgICAgICAgICA8c291cmNlIHNyYz1cIlwiIHR5cGU9XCJ2aWRlby9tcDRcIi8+XG4gICAgICAgICAgICAgIDwvdmlkZW8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPHVsPlxuICAgICAgICAgICAgICA8bGkgKm5nRm9yPVwibGV0IGl0ZW1Db250ZW50IG9mIGhlbHBDb250ZW50LmNvbnRlbnRcIj57e2l0ZW1Db250ZW50fX08L2xpPlxuICAgICAgICAgIDwvdWw+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0LWNlbnRlclwiPlxuICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4gYnRuLXByaW1hcnkgYnRuLWxpbmtcIiAoY2xpY2spPVwidG9nZ2xlU3RhdGUoKVwiPlxuICAgICAgICAgICAgICA8aSBbbmdDbGFzc109XCJzdGF0ZSA9PSdhY3RpdmUnPydnbHlwaGljb24gZ2x5cGhpY29uLW1lbnUtdXAnOidnbHlwaGljb24gZ2x5cGhpY29uLWZhY2V0aW1lLXZpZGVvJ1wiPjwvaT5cbiAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICA8L2Rpdj5cbiAgYCxcbiAgc3R5bGVzOiBbJ25neC10YWtlLWF0b3VyLmNvbXBvbmVudC5jc3MnXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hUYWtlQVRvdXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBwdWJsaWMgZWxlbWVudDogYW55O1xuICBwdWJsaWMgbWFpblBvcE92ZXI6IGFueTtcbiAgcHVibGljIGN1cnJlbnRQb3BPdmVyOiBhbnk7XG4gIHB1YmxpYyBzdGF0ZSA9ICdpbmFjdGl2ZSc7XG5cbiAgQElucHV0KCkgaWQ6IHN0cmluZztcbiAgQElucHV0KCkgdG9nZ2xlSGVscDogYm9vbGVhbjtcbiAgQElucHV0KCkgcG9zaXRpb25pbmc6IGFueSA9IHt9O1xuICBASW5wdXQoKSBoZWxwQ29udGVudDogYW55ID0ge307XG5cbiAgQFZpZXdDaGlsZCgndmlkZW9QbGF5ZXInKSB2aWRlb3BsYXllcjogRWxlbWVudFJlZjtcbiAgQEhvc3RCaW5kaW5nKCdzdHlsZS5kaXNwbGF5JykgZGlzcGxheTogc3RyaW5nO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBnbG9iYWxzZXR0aW5nczogTmd4VGFrZUFUb3VyU2VydmljZSkge1xuICAgIHRoaXMuZWxlbWVudCA9IGVsLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLm1haW5Qb3BPdmVyID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9wb3ZlclwiKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMubWFpblBvcE92ZXIpO1xuICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50LCB0aGlzLnBvc2l0aW9uaW5nLmFsaWduLCB0aGlzLnBvc2l0aW9uaW5nLnZhbHVlICsgXCJweFwiKTtcbiAgfVxuXG4gIG5nRG9DaGVjaygpIHtcbiAgICBpZiAodGhpcy50b2dnbGVIZWxwKVxuICAgICAgdGhpcy5kaXNwbGF5ID0gXCJibG9ja1wiO1xuICAgIGVsc2VcbiAgICAgIHRoaXMuZGlzcGxheSA9IFwibm9uZVwiO1xuICB9XG5cbiAgb3BlblBvcG92ZXIoZSkge1xuICAgIGxldCBzdHlsZXM6IGFueSA9IGdldENvbXB1dGVkU3R5bGUodGhpcy5tYWluUG9wT3Zlcik7XG4gICAgdGhpcy5jdXJyZW50UG9wT3ZlciA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZShcImRhdGEtaWRcIik7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLm1haW5Qb3BPdmVyLCBcImRpc3BsYXlcIiwgXCJibG9ja1wiKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMubWFpblBvcE92ZXIsIFwibWF4LXdpZHRoXCIsIFwiNTAwcHhcIik7XG4gICAgbGV0IGdldFN0eWxlTVcgPSBwYXJzZUludChzdHlsZXMubWF4V2lkdGgsIDEwKTtcbiAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMubWFpblBvcE92ZXIsIFwibGVmdFwiLCAoZS5jbGllbnRYICsgMTUpIC0gKGdldFN0eWxlTVcgLyAyKSArIFwicHhcIik7XG4gICAgdGhpcy5yZW5kZXJlci5zZXRTdHlsZSh0aGlzLm1haW5Qb3BPdmVyLCBcInRvcFwiLCBlLmNsaWVudFkgKyBcInB4XCIpO1xuICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5tYWluUG9wT3ZlciwgXCJ0ZW1wUG9wb3ZlclwiKTtcbiAgICBsZXQgZ2V0U3R5bGVMZWZ0VmFsdWUgPSBwYXJzZUludChzdHlsZXMubGVmdCwgMTApO1xuXG4gICAgaWYgKGdldFN0eWxlTGVmdFZhbHVlIDw9IDApIHtcbiAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5tYWluUG9wT3ZlciwgXCJsZWZ0XCIsIChlLmNsaWVudFgpICsgXCJweFwiKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZ2xvYmFsc2V0dGluZ3MuY291bnRQb3BPdmVyQXJyLmxlbmd0aCA+IDApIHtcbiAgICAgIGlmICh0aGlzLmdsb2JhbHNldHRpbmdzLmNvdW50UG9wT3ZlckFyci5maW5kKGkgPT4gaSA9PSB0aGlzLm1haW5Qb3BPdmVyLmlkKSA9PSB1bmRlZmluZWQpIHRoaXMuZ2xvYmFsc2V0dGluZ3MuY291bnRQb3BPdmVyQXJyLnB1c2godGhpcy5tYWluUG9wT3Zlci5pZCk7XG4gICAgfVxuICAgIGVsc2VcbiAgICAgIHRoaXMuZ2xvYmFsc2V0dGluZ3MuY291bnRQb3BPdmVyQXJyLnB1c2godGhpcy5tYWluUG9wT3Zlci5pZCk7XG4gICAgdGhpcy5lbmFibGVDbG9zZUFsbCgpO1xuICB9XG5cbiAgY2xvc2VQb3BPdmVyKGU/OiBhbnkpIHtcblxuICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQXR0cmlidXRlKHRoaXMubWFpblBvcE92ZXIsIFwic3R5bGVcIik7XG4gICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDbGFzcyh0aGlzLm1haW5Qb3BPdmVyLCBcInRlbXBQb3BvdmVyXCIpO1xuICAgIGxldCBpbmRleCA9IHRoaXMuZ2xvYmFsc2V0dGluZ3MuY291bnRQb3BPdmVyQXJyLmluZGV4T2YodGhpcy5tYWluUG9wT3Zlci5pZCk7XG4gICAgaWYgKGluZGV4ID4gLTEpIHRoaXMuZ2xvYmFsc2V0dGluZ3MuY291bnRQb3BPdmVyQXJyLnNwbGljZShpbmRleCwgMSk7XG4gICAgaWYgKHRoaXMuZ2xvYmFsc2V0dGluZ3MuY291bnRQb3BPdmVyQXJyLmxlbmd0aCA9PSAwKSB7XG4gICAgICBpZiAodGhpcy5nbG9iYWxzZXR0aW5ncy5jbG9zZUJ0bk1haW4pIHtcbiAgICAgICAgdGhpcy5nbG9iYWxzZXR0aW5ncy5jbG9zZUJ0bk1haW4ucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMuZ2xvYmFsc2V0dGluZ3MuY2xvc2VCdG5NYWluID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5zdGF0ZSA9ICdpbmFjdGl2ZSc7XG4gIH1cblxuICBlbmFibGVDbG9zZUFsbCgpIHtcbiAgICBsZXQgdG90YWxQb3BvdmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi50ZW1wUG9wb3ZlclwiKTtcbiAgICBsZXQgY2xvc2VCdG4sIGNsb3NlSWNvbiwgY2xvc2VUZXh0V3JhcCwgY2xvc2VUZXh0O1xuXG4gICAgaWYgKHRoaXMuZ2xvYmFsc2V0dGluZ3MuY291bnRQb3BPdmVyQXJyLmxlbmd0aCA+IDIpIHtcbiAgICAgIGlmICghdGhpcy5nbG9iYWxzZXR0aW5ncy5jbG9zZUJ0bk1haW4pIHtcbiAgICAgICAgY2xvc2VCdG4gPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIGNsb3NlSWNvbiA9IHRoaXMucmVuZGVyZXIuY3JlYXRlRWxlbWVudChcImlcIik7XG4gICAgICAgIGNsb3NlVGV4dFdyYXAgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoXCJzcGFuXCIpO1xuICAgICAgICBjbG9zZVRleHQgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZVRleHQoXCJDbG9zZSBhbGwgd2Fsa3Rocm91Z2ggd2luZG93XCIpO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKGNsb3NlQnRuLCBcImNsb3NlLXBvcG92ZXJcIik7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoY2xvc2VJY29uLCBcImdseXBoaWNvblwiKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hZGRDbGFzcyhjbG9zZUljb24sIFwiZ2x5cGhpY29uLXJlbW92ZVwiKTtcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZChkb2N1bWVudC5ib2R5LCBjbG9zZUJ0bik7XG4gICAgICAgIHRoaXMucmVuZGVyZXIuYXBwZW5kQ2hpbGQoY2xvc2VCdG4sIGNsb3NlVGV4dFdyYXApO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGNsb3NlQnRuLCBjbG9zZUljb24pO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKGNsb3NlVGV4dFdyYXAsIGNsb3NlVGV4dCk7XG4gICAgICAgIHRoaXMuZ2xvYmFsc2V0dGluZ3MuY2xvc2VCdG5NYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jbG9zZS1wb3BvdmVyXCIpO1xuICAgICAgICB0aGlzLmVuYWJsZUNsb3NlQnRuKCk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuYWRkQ2xhc3MoY2xvc2VCdG4sIFwidmlzaWJsZVwiKTtcbiAgICAgICAgfSwgMTAwKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBlbmFibGVDbG9zZUJ0bigpIHtcbiAgICBsZXQgcG9wT3ZlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIucG9wb3ZlclwiKTtcblxuICAgIHRoaXMuZ2xvYmFsc2V0dGluZ3MuY2xvc2VCdG5NYWluLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQ6IEV2ZW50KSA9PiB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHBvcE92ZXIubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHBvcE92ZXJbaV0uaGFzQXR0cmlidXRlKFwic3R5bGVcIikpIHtcbiAgICAgICAgICBwb3BPdmVyW2ldLnJlbW92ZUF0dHJpYnV0ZShcInN0eWxlXCIpO1xuICAgICAgICAgIHBvcE92ZXJbaV0uY2xhc3NMaXN0LnJlbW92ZShcInRlbXBQb3BvdmVyXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLmdsb2JhbHNldHRpbmdzLmNsb3NlQnRuTWFpbi5yZW1vdmUoKTtcbiAgICAgIHRoaXMuZ2xvYmFsc2V0dGluZ3MuY2xvc2VCdG5NYWluID0gbnVsbDtcbiAgICAgIHRoaXMuZ2xvYmFsc2V0dGluZ3MuY291bnRQb3BPdmVyQXJyID0gW107XG4gICAgICB0aGlzLnN0YXRlID0gJ2luYWN0aXZlJztcbiAgICB9KTtcbiAgfVxuXG4gIHRvZ2dsZVN0YXRlKCkge1xuICAgIHRoaXMuc3RhdGUgPSB0aGlzLnN0YXRlID09PSAnYWN0aXZlJyA/ICdpbmFjdGl2ZScgOiAnYWN0aXZlJztcbiAgICB0aGlzLnJlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLnZpZGVvcGxheWVyLm5hdGl2ZUVsZW1lbnQsIFwic3JjXCIsIHRoaXMuaGVscENvbnRlbnQudmlkZW9VcmwpO1xuICAgIGlmICh0aGlzLnN0YXRlID09PSAnYWN0aXZlJylcbiAgICAgIHRoaXMudmlkZW9wbGF5ZXIubmF0aXZlRWxlbWVudC5wbGF5KCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmNsb3NlUG9wT3ZlcigpO1xuICAgIHRoaXMuZ2xvYmFsc2V0dGluZ3MuY291bnRQb3BPdmVyQXJyID0gW107XG4gICAgdGhpcy5nbG9iYWxzZXR0aW5ncy5jbG9zZUJ0bk1haW4gPSBudWxsO1xuICAgIHRoaXMuc3RhdGUgPSAnaW5hY3RpdmUnO1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQodGhpcy5tYWluUG9wT3Zlcik7XG4gIH1cblxufVxuIl19