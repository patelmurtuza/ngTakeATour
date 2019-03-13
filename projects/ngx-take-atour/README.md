# NgxTakeATour

* If your website requires some level of familiarity, showing your users what to do can be very helpful. 
* Once complete, the user can, in a way, see the "shadow" of the instruction you provided in the walkthrough with features really you are working on it instead of going through   each feature and a weighty help and Manual document.
* Another use case for an interactive tour is to describe a very important feature commonly used across the application. 
* We have designed and developed it using simple angular 7, Typescript technologies without single line of server-side code. The design of tour is completely dynamic and can be   reused across the application, platform independently.
* It has a single reusable angular component, enormously light weight, which takes various parameters like Title, Content, Short Video Source and Positioning of the screen to     be displayed for quick help of the respective feature of your product as quick guide.
* This library is part of TakeAtour project and it is generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.3.
* Library location: `projects/ngx-take-atour` directory of this repository.

## Examples/Demo

* A simple Example can be found under `src/app` directory of this repository. It uses `json-server` to have a url and filter functionality.

## Installation

`npm i ngx-take-atour`

## API

`import { NgxTakeATourModule } from 'ngx-take-atour'`<br>
`selector: NgxTakeAtour`

### @Inputs()

| Input            | Type    | Required                   | Description                                                                                               |
| ---------------- | ------- | -------------------------- | --------------------------------------------------------------------------------------------------------- |
| id             | string | **YES**                    | unique id for the selector being used on your component where help needs to be dispalyed .                 
| toggleHelp     | boolean  | Optional, default: false     | to show hide the help panel on the requested position.|
| positioning    | object  | Optional, default: {}      | { align: string, value: number} object to set the position of the help panel to be displayed beside the help icon|
| helpContent    | object  | Optional |  title: string, content: string, videoUrl: string} this is the main input parameter required to display the help content and video source from where video needs to be played for the respective feature  { object to set the position of the help panel to be displayed beside the help icon |

### @Outputs()

| Output           | Type       | Required | Description                                            |
| ---------------- | ---------- | -------- | ------------------------------------------------------ |


## Usage

1) Register the `NgxTakeATourModule` in your app module.
 > `import { NgxTakeATourModule } from 'ngx-take-atour'`

 ```typescript
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxMatTypeaheadModule } from 'ngx-mat-typeahead';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatAutocompleteModule,
    HttpClientModule,
    NgxMatTypeaheadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
 ```

 2) Use the directive `(NgxMatTypeahead)` in your component.

```typescript
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AppService } from './app.service';
@Component({
  selector: 'mat-ta-root',
  template: `<h3>NgxMatTypeahead demo app using Angular Material</h3>
<div [formGroup]="testFormGroup">
  <mat-form-field>
    <input matInput NgxMatTypeahead [apiURL]="url" [urlQueryParam]="queryParam" (filteredDataList)="getFilteredSuggestions($event)"
      formControlName="country" [matAutocomplete]="countryAuto" placeholder="Choose Country">
    <mat-autocomplete #countryAuto="matAutocomplete">
      <mat-option *ngFor="let country of countries" [value]="country">
        {{country}}
      </mat-option>
    </mat-autocomplete>
  </mat-form-field>
</div>
`,
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Paramteres for the input type are defined below. The url is generated using `json-server`.
  // Please run your own instance of the json-server to use the the below url.
  queryParam = 'q';
  url = 'http://localhost:3000/countries';

  constructor(private appService: AppService) {}

  testFormGroup: FormGroup = new FormGroup({ country: new FormControl('') });
  countries: Array<string> = [];

  ngOnInit() {
    this.countries = ["United States", "United Kingdom", "China", "Japan", "India", "Russia", "Canada", "Brazil"];
  }

  getFilteredSuggestions(filteredDataLst: Array<any>) {
    this.countries = [...filteredDataLst];
  }
}
```

## Running the example in local env

* `npm i`
* Run `ng serve` for a dev server and running the demo app. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
* The demo app uses `json-server` module for enabling the url and filter funtionality.

## Build the NgxTakeATour module

Run `ng build NgxTakeATour` to build the library. The build artifacts will be stored in the `dist/ngx-take-atour` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test NgxTakeATour` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Credits
This help is prepared based on article found on medium by Sanjeev Kumar