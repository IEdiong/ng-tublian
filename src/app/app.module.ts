import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { StepperComponent } from './components/stepper/stepper.component';

@NgModule({
  declarations: [AppComponent, OnboardingComponent, StepperComponent],
  imports: [BrowserModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
