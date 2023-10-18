import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-reload-button',
  templateUrl: './reload-button.component.html',
  styleUrls: ['./reload-button.component.css']
})

export class ReloadButtonComponent {
  
  @Output()
  reloadEvent = new EventEmitter<string>();

  reload(){
    this.reloadEvent.emit("reload");
  }
}
