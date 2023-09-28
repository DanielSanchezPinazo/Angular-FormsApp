import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ValidatorsService } from 'src/app/shared/service/validators.service';
import { AsyncValidatorService } from 'src/app/shared/validators/async-validator.service';

@Component({
  templateUrl: './register-page.component.html',
  styles: [
  ]
})
export class RegisterPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: [ "", [Validators.required, Validators.pattern( this.validatorsService.firstNameAndLastnamePattern )]],
 // email: [ "", [Validators.required, Validators.pattern( this.validatorsService.emailPattern )], [new EmailValidatorService()] ],
    email: [ "", [Validators.required, Validators.pattern( this.validatorsService.emailPattern )], [ this.emailValidator ] ],
    username: [ "", [ Validators.required, this.validatorsService.cantBeStrider ] ],
    password1: [ "", [Validators.required, Validators.minLength( 6 )] ],
    password2: [ "", Validators.required ]
  }, {
    validators: [
      this.validatorsService.isFieldOneEqualFieldTwo( "password1", "password2" )
    ]
  });

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService,
    private emailValidator: AsyncValidatorService
     ) { }

  onSubmit() {

    // console.log(this.myForm.value);

    if ( this.myForm.invalid ) {

      console.log(this.myForm.errors);
      this.myForm.markAllAsTouched();
      // this.myForm.reset();
    }

    console.log(this.myForm.value);

  }

  isValidField( field: string ) {
    //TODO: Obtener la validación desde un servicio
    return this.validatorsService.isValidField( this.myForm, field );
  }

}
