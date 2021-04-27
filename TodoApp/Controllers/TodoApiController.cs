using System;
using System.Linq;
using System.Threading;
using System.Timers;
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
            Thread.Sleep(5000);
            throw new Exception();
            return TodoStorage.Todos.Values.ToArray();
        }

        [HttpPost]
        public TodoItem AddTodo([FromBody] AddTodoRequest request)
        {
            Thread.Sleep(5000);
            return TodoStorage.AddTodo(request.Title, request.Description);
        }

        [HttpPost("done/{id:guid}")]
        public void MoveToDone(Guid id)
        {
            Thread.Sleep(5000);
            TodoStorage.Todos[id].IsDone = true;
        }



    }
}
