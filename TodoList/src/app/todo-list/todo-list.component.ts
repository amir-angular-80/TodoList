import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
})
export class TodoListComponent implements OnInit {
  taskArray = [
    {
      taskName: 'Daily Coding',
      isComplited: false,
      isEditable: false,
    },
  ];
  ngOnInit(): void {
    this.getFromLocalStorage();
  }

  onSubmit(form: NgForm) {
    console.log(form);
    this.taskArray.push({
      taskName: form.controls['myTask'].value,
      isComplited: false,
      isEditable: false,
    });
    this.savaToLocalStorage();
    form.reset();
  }

  savaToLocalStorage() {
    let stringJSON = JSON.stringify(this.taskArray);
    localStorage.setItem('todolist', stringJSON);
  }

  getFromLocalStorage() {
    let itemJSONString = localStorage.getItem('todolist');
    if (itemJSONString != null) {
      this.taskArray = JSON.parse(itemJSONString);
    }
  }

  onDelete(index: number) {
    console.log(index);
    this.taskArray.splice(index, 1);
    this.savaToLocalStorage();
  }

  onCheck(index: number) {
    console.log(this.taskArray);
    this.taskArray[index].isComplited = !this.taskArray[index].isComplited;
    this.savaToLocalStorage();
  }

  onEdit(index: number) {
    this.taskArray[index].isEditable = true;
    this.savaToLocalStorage();
  }

  onSave(index: number, newTask: string) {
    this.taskArray[index].taskName = newTask;
    this.taskArray[index].isEditable = false;
    this.savaToLocalStorage();
  }
}
