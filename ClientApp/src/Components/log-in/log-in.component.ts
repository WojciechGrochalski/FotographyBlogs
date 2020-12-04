import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {HttpClient, HttpEventType} from '@angular/common/http';
import {AuthService} from '../../Services/auth.service';
import {AlertService} from '../../Services/alert.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  //uploud
  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();

  ////
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  res;
  //

  messageA: any;
  @Input() public disabled: boolean;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthService,
    private alertService: AlertService,
     private http: HttpClient
  ) {

    //redirect to home if already logged in
    if (   sessionStorage.getItem('userName')) {
      this.router.navigate(['/']);
    }

  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.messageA=sessionStorage.getItem('alert')
    sessionStorage.removeItem('alert')
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value).subscribe(res =>{
      if (res) {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        sessionStorage.setItem('userName', res.username);
        this.router.navigate([this.returnUrl]);
      }
      else{
        this.alertService.error("Nieprawidłowe dane",true);
        this.loading=false;
    }},
      error =>{
        this.alertService.error(error,true);
      });

  }
  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

      this.authenticationService.uploadFile(formData).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress)
          this.progress = Math.round(100 * event.loaded / event.total);
        else if (event.type === HttpEventType.Response) {
          this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      });

}
}
