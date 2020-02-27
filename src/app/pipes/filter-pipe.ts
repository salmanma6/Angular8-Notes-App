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
        return values
        // .map((value)=>{
        //     let re=new RegExp(filterString,'gi');
        //     if(value.name.includes(filterString)){          
        //         value.name.replace(re,`<span class="highlight-text">${value.name}</span>`);
        //     }
        //     else if(value.content.includes(filterString)  ){
        //         value.content.replace(re,`<span class="highlight-text">${value.content}</span>`);
        //     }
        //     else if(super.transform(value.edited, 'short').toString().includes(filterString)){
        //         value.edited.replace(re,`<span class="highlight-text">${value.edited}</span>`)
        //     }
        //     return value;
        // } )
        .filter( (value)  =>  {
            if(value.name.includes(filterString) || value.content.includes(filterString) ||  super.transform(value.edited, 'short').toString().includes(filterString) ){          
                return true;
            }
            else
              return false;
        } );
    }
}