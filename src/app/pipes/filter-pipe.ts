import { Pipe,PipeTransform } from '@angular/core'
import {DatePipe} from '@angular/common'; 
@Pipe(
    {
        name:'filter'
    }
)
export class FilterPipe extends DatePipe implements PipeTransform{
    transform(values:any,filterString:any){
        if(!filterString) 
        return values;
        filterString=filterString.toLowerCase();
        return values
        .filter( (value)  =>  {
            if(value.name.toLowerCase().includes(filterString) || value.content.toLowerCase().includes(filterString) ||  super.transform(value.edited, 'short').toString().includes(filterString) ){          
                return true;
            }
            else
              return false;
        } );
    }
}