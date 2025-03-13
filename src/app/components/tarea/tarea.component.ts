import { Component, EventEmitter, Input, Output,  } from '@angular/core';
import { Tarea } from 'src/app/models/tarea.model';

@Component({
  selector: 'app-tarea',
  templateUrl: './tarea.component.html',
})
export class TareaComponent {



  @Input() tarea!: Tarea;
  @Output() updateEstado = new EventEmitter<number>();
  @Output() eliminarTareaEmitter = new EventEmitter<number>();

  constructor(){
    
  }

  actualizarEstado() {
    this.updateEstado.emit(this.tarea.id);
}

eliminarTarea() {
    this.eliminarTareaEmitter.emit(this.tarea.id);
  }
}
