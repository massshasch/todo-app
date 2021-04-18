using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc;

namespace TodoApp.Controllers
{
    [ApiController]
    [Route("web-api/todos")]
    public class TodoApiController : ControllerBase
    {
        [HttpGet]
        public TodoItem[] GetTodos()
        {
            return TodoStorage.Todos.Values.ToArray();
        }

        [HttpPost]
        public TodoItem AddTodo([FromBody] AddTodoRequest request)
        {
            return TodoStorage.AddTodo(request.Title, request.Description);
        }

        [HttpPost("done/{id:guid}")]
        public void MoveToDone(Guid id)
        {
            TodoStorage.Todos[id].IsDone = true;
        }
    }
}
