import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

/**
 * FormGroupType is a type that defines new form group type with its form controls based on its basic form attributes
 */
export type FormGroupType<T> = { [P in keyof T]: FormControl<T[P]> };

/**
 *  doesNotContain is a custom validator that checks if the control value contains any of the elements values
 * @param matchTo : array of form elements to check if the control value contains any of the elements values
 * @param error
 * @returns
 */
export function doesNotContain<T>(matchTo: (keyof T)[], error: ValidationErrors): ValidatorFn {
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     return (control: AbstractControl<string>): { [key: string]: any } | null => {
          const valid =
               control.value.length === 0 ||
               matchTo.every(
                    (matchToElement) =>
                         control.parent?.get(matchToElement as string)?.value.length === 0 ||
                         !control.value
                              .toLowerCase()
                              .includes(control.parent?.get(matchToElement as string)?.value.toLowerCase()),
               );
          return valid ? null : error;
     };
}

/**
 *  updateAndRevalidate is a custom validator that revalidate formElements array when the control value changes
 * @param formElements : array of form elements to update and revalidate
 * @param error
 * @returns
 */

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function updateAndRevalidate<T>(
     formElements: (keyof T)[],
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
     error: ValidationErrors,
): ValidatorFn {
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     return (control: AbstractControl<string>): { [key: string]: any } | null => {
          formElements.forEach((formElement) => control.parent?.get(formElement as string)?.updateValueAndValidity());
          return null;
     };
}
