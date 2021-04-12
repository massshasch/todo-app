using System;

namespace TodoApp.Controllers
{
    public class TodoItem
    {
        public Guid Id { get; set; }
        public DateTime CreationDate { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsDone { get; set; }
    }
}
