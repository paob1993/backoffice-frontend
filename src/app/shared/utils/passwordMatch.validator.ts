import { FormGroup, ValidationErrors, ValidatorFn } from "@angular/forms"

export function PasswordMatch(control: FormGroup): ValidationErrors | null {
  const password = control.get("password")
  const passwordRepeat = control.get("passwordRepeat")

  return password?.value === passwordRepeat?.value
    ? null
    : { passwordsDoNotMatch: true }
}