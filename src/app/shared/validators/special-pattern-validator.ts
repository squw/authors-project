import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms"


export function noInvalidPatterns(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
      const invalidPatterns = [
        /(https?:\/\/)/i,
        /<[^>]*>/,
        /<\/[^>]*>/,
        /<!--[\s\S]*?-->/,
        /&#/,
        /\/\*[\s\S]*?\*\//
      ]
  
      const hasInvalidPattern = invalidPatterns.some((pattern) => pattern.test(control.value))
      return hasInvalidPattern ? { noInvalidPatterns: true } : null
    }
}