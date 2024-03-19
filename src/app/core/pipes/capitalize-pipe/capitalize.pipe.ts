import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return value;
    }
    // Split the string into words
    const words = value.split(' ');
    // Capitalize the first letter of each word
    const capitalizedWords = words.map(word => word[0].toUpperCase() + word.slice(1));
    // Join the capitalized words back into a string
    return capitalizedWords.join(' ');
  }

}
