import { Component, OnInit, Input, ElementRef, ViewChild, HostBinding, Renderer2 } from '@angular/core';
import { NgxTakeATourService } from './ngx-take-atour.service';

@Component({
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
})
export class NgxTakeATourComponent implements OnInit {
  public element: any;
  public mainPopOver: any;
  public currentPopOver: any;
  public state = 'inactive';

  @Input() id: string;
  @Input() toggleHelp: boolean;
  @Input() positioning: any = {};
  @Input() helpContent: any = {};

  @ViewChild('videoPlayer') videoplayer: ElementRef;
  @HostBinding('style.display') display: string;

  constructor(private el: ElementRef, private renderer: Renderer2, private globalsettings: NgxTakeATourService) {
    this.element = el.nativeElement;
  }

  ngOnInit() {
    this.mainPopOver = this.element.querySelector(".popover");
    document.body.appendChild(this.mainPopOver);
    this.renderer.setStyle(this.element, this.positioning.align, this.positioning.value + "px");
  }

  ngDoCheck() {
    if (this.toggleHelp)
      this.display = "block";
    else
      this.display = "none";
  }

  openPopover(e) {
    let styles: any = getComputedStyle(this.mainPopOver);
    this.currentPopOver = e.target.getAttribute("data-id");
    this.renderer.setStyle(this.mainPopOver, "display", "block");
    this.renderer.setStyle(this.mainPopOver, "max-width", "500px");
    let getStyleMW = parseInt(styles.maxWidth, 10);
    this.renderer.setStyle(this.mainPopOver, "left", (e.clientX + 15) - (getStyleMW / 2) + "px");
    this.renderer.setStyle(this.mainPopOver, "top", e.clientY + "px");
    this.renderer.addClass(this.mainPopOver, "tempPopover");
    let getStyleLeftValue = parseInt(styles.left, 10);

    if (getStyleLeftValue <= 0) {
      this.renderer.setStyle(this.mainPopOver, "left", (e.clientX) + "px");
    }
    if (this.globalsettings.countPopOverArr.length > 0) {
      if (this.globalsettings.countPopOverArr.find(i => i == this.mainPopOver.id) == undefined) this.globalsettings.countPopOverArr.push(this.mainPopOver.id);
    }
    else
      this.globalsettings.countPopOverArr.push(this.mainPopOver.id);
    this.enableCloseAll();
  }

  closePopOver(e?: any) {

    this.renderer.removeAttribute(this.mainPopOver, "style");
    this.renderer.removeClass(this.mainPopOver, "tempPopover");
    let index = this.globalsettings.countPopOverArr.indexOf(this.mainPopOver.id);
    if (index > -1) this.globalsettings.countPopOverArr.splice(index, 1);
    if (this.globalsettings.countPopOverArr.length == 0) {
      if (this.globalsettings.closeBtnMain) {
        this.globalsettings.closeBtnMain.remove();
        this.globalsettings.closeBtnMain = null;
      }
    }
    this.state = 'inactive';
  }

  enableCloseAll() {
    let totalPopover = document.querySelectorAll(".tempPopover");
    let closeBtn, closeIcon, closeTextWrap, closeText;

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

  enableCloseBtn() {
    let popOver = document.querySelectorAll(".popover");

    this.globalsettings.closeBtnMain.addEventListener("click", (event: Event) => {
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

  toggleState() {
    this.state = this.state === 'active' ? 'inactive' : 'active';
    this.renderer.setAttribute(this.videoplayer.nativeElement, "src", this.helpContent.videoUrl);
    if (this.state === 'active')
      this.videoplayer.nativeElement.play();
  }

  ngOnDestroy() {
    this.closePopOver();
    this.globalsettings.countPopOverArr = [];
    this.globalsettings.closeBtnMain = null;
    this.state = 'inactive';
    document.body.removeChild(this.mainPopOver);
  }

}
