using System;
using System.ComponentModel.DataAnnotations;

namespace TaskManager.Service.Models
{
    public class Task
    {
        // Primary key for the task
        public Guid Id { get; set; }

        // Title of the task
        [Required(ErrorMessage = "Title is required")]
        [StringLength(100, ErrorMessage = "Title cannot be longer than 100 characters")]
        public string? Title { get; set; }

        // Description of the task
        [StringLength(500, ErrorMessage = "Description cannot be longer than 500 characters")]
        public string? Description { get; set; }

        // Due date of the task
        [DataType(DataType.Date)]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime DueDate { get; set; }

        // Priority of the task (Low, Medium, High)
        public Priority Priority { get; set; }
    }

    // Enum for task priority
    public enum Priority
    {
        Low,
        Medium,
        High
    }
}
