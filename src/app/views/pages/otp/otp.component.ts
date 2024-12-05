import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {ApiService} from "../../../service/api.service";
import {ToastrService} from "ngx-toastr";
import {finalize, interval, Subscription} from "rxjs";

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent implements OnInit{

  otpForm: FormGroup = new FormGroup({});
  id: any;

  showError: boolean = false;
  resentOTP: boolean = false;
  resendDisabled: boolean = false;
  remainingTime: string = '';
  private timerSubscription: Subscription | undefined;
  private timeOutDuration: any;
  isConfirmOtp: boolean = false;
  isResendOtp: boolean = false;

  constructor(
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private apiService: ApiService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.otpForm = new FormGroup({
      otp: new FormControl('', [Validators.required, Validators.pattern(/^\d{6}$/)])
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.cdr.detectChanges();
    this.startTimer();
  }

  confirmOtp() {
    this.isConfirmOtp = true;
    this.apiService.verifyOtp(this.otpForm.value, this.id)
      .pipe(
        finalize(() => {
          this.isConfirmOtp = false
        })
      )
      .subscribe({
        next: value => {
          if (value?.statusCode === 200) {
            this.toastr.success('OTP verified successfully!', 'Success');
            this.router.navigate(['/dashboard']);
          } else {
            this.toastr.error('Something went wrong. Please try again later.');
          }
        },
        error: err => {
          if (err?.error?.statusCode === 417) {
            this.toastr.error('Invalid OTP');
          } else this.toastr.error('Something went wrong. Please try again later.')
        }
      })
  }

  resendOTP(){
    this.isResendOtp = true;
    this.showError = false;
    this.apiService.resendOtp(this.id)
      .pipe(
        finalize(() => {
          this.isResendOtp = false
        })
      )
      .subscribe({
        next: (response: any) => {
          if (response?.statusCode === 200) {
            this.startTimer();
            this.toastr.success('Resent the OTP. Please check th email');
            this.resentOTP = true;

          } else {
            this.toastr.error(response.statusText);
          }
        },
        error: () => {
          this.toastr.error('Something went wrong. Please try again later.');
        }
      });
  }

  startTimer() {
    this.timeOutDuration = 60;
    this.resendDisabled = true;
    this.isResendOtp = false;
    this.remainingTime = `${this.timeOutDuration} seconds`;

    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }

    this.timerSubscription = interval(1000).subscribe(() => {
      this.timeOutDuration--;
      if (this.timeOutDuration <= 0) {
        this.resendDisabled = false;
        this.remainingTime = '';
        this.timerSubscription?.unsubscribe();
      } else {
        const minutes = Math.floor(this.timeOutDuration / 60);
        const seconds = this.timeOutDuration % 60;
        this.remainingTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      }
    });
  }
}
