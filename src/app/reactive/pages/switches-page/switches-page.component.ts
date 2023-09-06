import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';

@Component({
  templateUrl: './switches-page.component.html',
  styles: [
  ]
})
export class SwitchesPageComponent implements OnInit{

  public myForm: FormGroup = this.fb.group({
    gender: [ "M", Validators.required ],
    wantNotifications: [ true, Validators.required ],
    termsAndConditions: [ false, Validators.requiredTrue ]
  });

  public person = {
    gender: "F",
    wantNotifications: false
  }

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
    ) {}


  ngOnInit(): void {

    this.myForm.reset( this.person );
  }


  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.myForm, field );
  }

  onSave() {

    // console.log(this.myForm.value);

    // console.log(this.myForm.controls["termsAndConditions"].errors);


    if ( this.myForm.invalid ) {

      this.myForm.markAllAsTouched();
      return;
    }

    // Esto añadiría "person" el campo "termsAndConditions" que no posee y sólo usamos como control del fomulario,
    // lo que puede crear porblemas con el Back-end
    // this.person = this.myForm.value;
    // console.log(this.myForm.value);
    // console.log(this.person);

    // Se puede solcionar así

    const { termsAndConditions, ...newPerson } = this.myForm.value;
    this.person = newPerson;
    console.log(this.myForm.value);
    console.log(this.person);
  }

}
