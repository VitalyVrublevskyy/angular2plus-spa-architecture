export class Todo {
  id: number;
  title: string;
  completed: boolean;
  editing: boolean;

  constructor(data?: any) {
    if (data) {
      this.id = data.id;
      this.title = data.task;
      this.completed = data.isCompleted;
    }
  }

  serialize(): any {
    return {
      id: this.id,
      task: this.title.trim(),
      isCompleted: !!this.completed,
    };
  }
}
