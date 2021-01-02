import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AuthorizationsService} from '../../Services/Authorizations.service';
import {UsersService} from '../../Services/Users.service';
import {AlertService} from '../../Services/alert.service';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  result: any;
  registerForm: FormGroup;
  loading = false;
  submitted = false;
  messageA: any;
  messageB: any;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthorizationsService,
    private userService: UsersService,
    private alertService: AlertService
  ) {

  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    this.loading = true;
    this.userService.register(this.registerForm.value).subscribe(res => {
      if (res) {

        this.alertService.success('Registration successful', true);
        sessionStorage.setItem('alert','Registration successful');
        this.router.navigate(['log-in']);
      } else {

        this.alertService.error("Nieprawidłowa lub użyta nazwa użytkownika");
        this.messageB="Nieprawidłowa lub użyta nazwa użytkownika";
        this.loading=false;
      }
    }
  );




  }
}
