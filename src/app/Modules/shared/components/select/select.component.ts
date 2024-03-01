import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent {
@Input() label : string ='' ;
@Input() list : any[] =[] ;
@Output() changes : any = new EventEmitter();
constructor(){
  
}


detectChanges($event : any){
  this.changes.emit($event.target.value);
}
}
