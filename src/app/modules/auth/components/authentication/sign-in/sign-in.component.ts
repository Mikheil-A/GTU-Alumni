import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInFormGroup: FormGroup;

  isUsernameOrPasswordIsIncorrectMsgDisplayed: boolean = false;


  constructor(private _router: Router,
              private _authService: AuthService) {
  }


  ngOnInit() {
    this._initializeForm();
  }


  private _initializeForm() {
    this.signInFormGroup = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, Validators.required)
    });
  }

  submit() {
    if (!this.signInFormGroup.invalid) {
      const requestData = {
        email: this.signInFormGroup.value.email,
        password: this.signInFormGroup.value.password
      };

      this._authService.login(requestData).subscribe(res => {
        if (res) {
          this.isUsernameOrPasswordIsIncorrectMsgDisplayed = false;
          this._router.navigate(['students']);
        }
      }, (err) => {
        if (err['error'] === 'unauthorized') {
          this.isUsernameOrPasswordIsIncorrectMsgDisplayed = true;
        }
      });
    }
  }
}
