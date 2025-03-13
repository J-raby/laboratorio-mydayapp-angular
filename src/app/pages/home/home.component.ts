import { Component, inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable, Subject, Subscription } from 'rxjs';
import { Tarea } from 'src/app/models/tarea.model';
import { TareasService } from 'src/app/services/tareas-service.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent implements OnInit {



  private tareaService = inject(TareasService);
  tareas: Tarea[] = []
  private subs: Subscription = new Subscription();
  nuevaTarea = new FormControl('', [Validators.required]);
  constructor() { 

  }

  ngOnInit(): void {
    this.subs.add(
      this.tareaService.tareas$.subscribe(tareaList => {
        this.tareas = tareaList;
      })
    )
  }

  ngOnDestroy(): void {
    // Clean up subscription when component is destroyed
    this.subs.unsubscribe();
  }
  
  agregarNuevaTarea(): void {
    const nuevaTask: Tarea  = {
      titulo:  this.nuevaTarea.value!,
      completada: false,
      editando: false,
    }
    this.tareaService.agregarTarea(nuevaTask);

    this.nuevaTarea.reset('')
  }
  
  actualizarEstado(){

  }
  estadoHandler(id: number) {
    this.tareaService.completarTarea(id);
    }

    eliminarHandler($event: number) {
    this.tareaService.eliminarTarea($event);
  }
}
