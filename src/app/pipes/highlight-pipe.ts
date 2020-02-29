import { Pipe, PipeTransform } from '@angular/core'
@Pipe(
    {
        name: 'highlight'
    }
)
export class HighLightPipe implements PipeTransform {
    transform(value: any, args: any) {
        if (!args)
            return value;
        let re = new RegExp(args, 'gi');
        if (value.match(re) != null) {
            value = value.replace(re, `<span class="bg-warning">${value.match(re)[0]}</span>`);
        }

        return value
    }
}