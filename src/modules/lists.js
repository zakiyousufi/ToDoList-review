export default class Task {
  constructor(arrTasks) {
    this.arrTasks = arrTasks || [];
  }

  add = (description) => {
    const completed = false;
    const index = this.arrTasks.length;
    this.arrTasks.push({
      description,
      completed,
      index,
    });
  }

  remove = (index) => {
    this.arrTasks = this.arrTasks.filter((task) => (task.index !== index));
    for (let i = index; i < this.arrTasks.length; i += 1) {
      this.arrTasks[i].index -= 1;
    }
  }

  edit = (index, description) => {
    this.arrTasks[index].description = description;
  }

  changeCompletedStatus = (index) => {
    this.arrTasks[index].completed = !this.arrTasks[index].completed;
  }

  removeCompletedTask = () => {
    this.arrTasks = this.arrTasks.filter((task) => (task.completed === false));
    for (let i = 0; i < this.arrTasks.length; i += 1) {
      this.arrTasks[i].index = i;
    }
  }
}
