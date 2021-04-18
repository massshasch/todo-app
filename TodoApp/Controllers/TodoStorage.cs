using System;
using System.Collections.Generic;

namespace TodoApp.Controllers
{
    public static class TodoStorage
    {
        static TodoStorage()
        {
            AddTodo("risenor", "qwertyvace");
            AddTodo("risenor1", "qwertyvace");
            AddTodo("risenor2", "qwertyvace");
            AddTodo("risenor3", "qwertyvace");
            AddTodo("risenor4", "qwertyvace");
            AddTodo("risenor5", "qwertyvace");
            AddTodo("risenor6", "qwertyvace");
            AddTodo("risenor7", "qwertyvace");
            AddTodo("risenor8", "qwertyvace");
            AddTodo("risenor9", "qwertyvace");
        }
        public static TodoItem AddTodo(string title, string description)
        {
            var item = new TodoItem
            {
                Id = Guid.NewGuid(),
                CreationDate = DateTime.UtcNow,
                Title = title,
                Description = description,
                IsDone = false
            };
            Todos.Add(item.Id, item);
            return item;
        }

        public static readonly Dictionary<Guid, TodoItem> Todos = new Dictionary<Guid, TodoItem>();
    }
}
