/**
 * @jest-environment jsdom
 */

import Task from './modules/lists.js';

document.body.innerHTML = '<div class="task"></div>';
const tasksObject = new Task();
describe('Task function', () => {
  tasksObject.add('task 0');
  tasksObject.add('task 1');
  tasksObject.add('task 2');
  tasksObject.add('task 3');
  tasksObject.add('task 4');
  tasksObject.add('task 5');
  tasksObject.add('task 6');
  tasksObject.add('task 7');
  tasksObject.arrTasks[2].completed = true;
  tasksObject.arrTasks[5].completed = true;
  tasksObject.arrTasks[7].completed = true;

  test('Add function', () => {
    tasksObject.add('task 8');
    expect(tasksObject.arrTasks[8].description).toBe('task 8');
    expect(tasksObject.arrTasks.length).toBe(9);
    expect(tasksObject.length).not.toBe(0);
  });

  test('Remove function', () => {
    tasksObject.remove(6);
    expect(tasksObject.arrTasks[6].description).toBe('task 7');
    expect(tasksObject.arrTasks.length).toBe(8);
  });

  test('Edit function', () => {
    tasksObject.edit(6, 'task 6');
    tasksObject.edit(7, 'task 7');
    expect(tasksObject.arrTasks[6].description).toBe('task 6');
    expect(tasksObject.arrTasks[7].description).toBe('task 7');
    expect(tasksObject.arrTasks.length).toBe(8);
  });

  test('Remove all completed tasks', () => {
    tasksObject.removeCompletedTask();
    expect(tasksObject.arrTasks[2].description).toBe('task 3');
    expect(tasksObject.arrTasks.length).toBe(5);
  });
});