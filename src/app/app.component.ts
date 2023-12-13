import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  FormData,
  Option,
  PaymentInterval,
  PlatformUsagePlan,
} from 'src/types';

@Component({
  selector: 'tbc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  currentStep = 4;
  title = 'ng-tublian';
  onboardingForm!: FormGroup;
  isModalOpen = true;
  userName = '';

  options: Option[] = [
    {
      label: 'Team projects',
      value: 'team',
      imagePath: '../assets/illustration-team-project.png',
      description: 'Hire developers for team projects.',
    },
    {
      label: 'Personal projects',
      value: 'personal',
      imagePath: '../assets/illustration-personal-project.png',
      description: 'Hire developers for personal projects.',
    },
    {
      label: 'Recruiting',
      value: 'recruiting',
      imagePath: '../assets/illustration-recruiting.png',
      description: 'Recruit developers for outstanding companies.',
    },
  ];

  paymentIntervals: PaymentInterval[] = ['monthly', 'annually'];

  formData: FormData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    userPlatformUsagePlan: 'team',
    chosenPaymentInterval: 'monthly',
    paymentPlan: 'pro',
  };

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.onboardingForm = this.fb.nonNullable.group({
      name: this.fb.nonNullable.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
      }),
      account: this.fb.nonNullable.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
      }),
      platformUsagePlan: this.fb.nonNullable.control<PlatformUsagePlan>(
        'team',
        Validators.required,
      ),
      paymentInterval: this.fb.nonNullable.control<PaymentInterval>(
        'monthly',
        Validators.required,
      ),
    });
  }

  get radioGroupControl() {
    return this.onboardingForm.get(
      'platformUsagePlan',
    ) as FormControl<PlatformUsagePlan>;
  }

  get paymentIntervalControl() {
    return this.onboardingForm.get(
      'paymentInterval',
    ) as FormControl<PaymentInterval>;
  }

  goToNextStep(isValidStep: boolean): void {
    if (isValidStep) {
      if (this.currentStep === 1) {
        this.userName = `${this.onboardingForm.value?.name?.firstName} ${this.onboardingForm.value?.name?.lastName}`;
      }
      this.currentStep++;
    } else {
      // TODO: set form error to true
      console.log('Form is not valid, thus do something here');
    }

    console.log(this.onboardingForm.value);
  }

  openModal(): void {
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
