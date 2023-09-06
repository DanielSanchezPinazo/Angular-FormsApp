import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ValidatorsService } from 'src/app/shared/service/validators.service';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: [
  ]
})
export class DynamicPageComponent {

  constructor(
    private fb: FormBuilder,
    private validatorsService: ValidatorsService
    ) {}

  public myForm: FormGroup = this.fb.group({

    name: ["", [ Validators.required, Validators.minLength(3) ]],
    favoriteGames: this.fb.array([
      [ "GTA IV", Validators.required ],
      [ "Red Dead Redemption", Validators.required ],
      [ "The Last of Us", Validators.required ],
    ])
  });

  public newFavorite: FormControl = new FormControl( "", Validators.required );

  onSubmit(): void {

    if ( this.myForm.invalid ) {

      this.myForm.markAllAsTouched();
      return;
    }

    console.log(this.myForm.value);
    (this.myForm.controls["getFavoriteGames"] as FormArray) = this.fb.array( [] );
    this.myForm.reset();
  }

  get getFavoriteGames() {

    return this.myForm.get("favoriteGames") as FormArray;
  }

  isValidField( field: string ) {
    return this.validatorsService.isValidField( this.myForm, field );
  }

  isValidFieldInArray( formArray: FormArray, index: number ) {

    return formArray.controls[index].errors
    && formArray.controls[index].touched;
  }

  getFieldError( field: string ): string | null {

    if ( !this.myForm.controls[ field ] ) return null;

    const errors = this.myForm.controls[ field ].errors || {};

    // console.log({errors});

    for (const key of Object.keys( errors )) {

      switch (key) {

        case "required":
          return "Este campo es requerido.";

        case 'minlength':
          return `El nombre del producto debe tener ${ errors['minlength'].requiredLength } dígitos mínimo.`;
      }
    }

    return null;

  }

  onDeleteFavorite( index:number ) {

    this.getFavoriteGames.removeAt( index );
  }

  addToFavorites(): void {

    if ( this.newFavorite.invalid ) return;

    const newGame = this.newFavorite.value;

    // this.getFavoriteGames.push( new FormControl( newGame, Validators.required ))

    this.getFavoriteGames.push(
      this.fb.control( newGame, Validators.required )
    );

    this.newFavorite.reset();
  }

}
