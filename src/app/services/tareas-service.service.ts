import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Tarea } from '../models/tarea.model';

@Injectable({
  providedIn: 'root'
})
export class TareasService {

private tareas = new BehaviorSubject<Tarea[]>([]);
tareas$ = this.tareas.asObservable();

  constructor() {
    const tareasPersistenes = localStorage.getItem('mydayapp-angular');
    if(tareasPersistenes){
      this.tareas.next(JSON.parse(tareasPersistenes));
    }
   }

   private guardarEnLocal(){
    localStorage.setItem('mydayapp-angular',JSON.stringify(this.tareas.getValue()));
   }

  agregarTarea(tarea: Tarea){
  const currTareas = this.tareas.getValue();
  let nuevaTarea = tarea;
  let tam = currTareas.length;
  if(tam > 0){
    const ultId = currTareas[tam - 1]?.id ?? 0; 
    nuevaTarea.id = ultId + 1;
  }else{
    nuevaTarea.id = 1;
  }
  
  this.tareas.next([...currTareas, nuevaTarea]);
  this.guardarEnLocal();
}

eliminarTarea(id : number){
  const tareasFiltradas = this.tareas.getValue().filter(tarea => tarea.id !== id);
  this.tareas.next(tareasFiltradas);
  this.guardarEnLocal();
}

completarTarea(id: number){
  this.tareas.next(this.tareas.value.map(task => {
    if(task.id == id){
      !task.completada
    }
    return {...task}
  }));
  this.guardarEnLocal();
}

actualizarTarea(id: number){
}

obtenerTarea(id: number){

}

}
