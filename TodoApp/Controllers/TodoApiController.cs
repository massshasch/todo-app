using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace TodoApp.Controllers
{
    [ApiController]
    [Route("todos")]
    public class TodoApiController : ControllerBase
    {
        [HttpGet]
        public TodoItem[] GetTodos()
        {
            return todos.Values.ToArray();
        }

        [HttpPost]
        public TodoItem AddTodo([FromBody] AddTodoRequest request)
        {
            var item = new TodoItem
            {
                Id = Guid.NewGuid(),
                CreationDate = DateTime.UtcNow,
                Title = request.Title,
                Description = request.Description,
                IsDone = false
            };
            todos.Add(item.Id, item);
            return item;
        }

        [HttpPost("done/{id:guid}")]
        public void MoveToDone(Guid id)
        {
            todos[id].IsDone = true;
        }


        private static readonly Dictionary<Guid, TodoItem> todos = new Dictionary<Guid, TodoItem>();
    }
}
