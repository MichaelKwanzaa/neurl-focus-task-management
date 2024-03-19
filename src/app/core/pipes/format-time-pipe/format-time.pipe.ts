import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime'
})
export class FormatTimePipe implements PipeTransform {

  transform(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${padZero(minutes)}:${padZero(seconds)}`;
  }

}

// Helper function to add leading zero
function padZero(value: number): string {
  return value.toString().padStart(2, '0');
}