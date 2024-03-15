using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

//using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using TaskManager.Service.Controllers;
using TaskManager.Service.Models;

namespace TaskManager.Tests
{
    [TestFixture]
    public class TaskControllerTests
    {
        private DbContextOptions<AppDbContext> _options;
        private Guid Id1 = Guid.NewGuid();
        private Guid Id2 = Guid.NewGuid();


        [OneTimeSetUp]
        public void Setup()
        {
            _options = new DbContextOptionsBuilder<AppDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            // Seed some sample data into the in-memory database
            using (var context = new AppDbContext(_options))
            {
                context.Tasks.Add(new TaskManager.Service.Models.Task { Id = Id1, Title = "Task 1", Description = "Task 1", DueDate = DateTime.UtcNow.Date.AddDays(5), Priority = Priority.High });
                context.Tasks.Add(new TaskManager.Service.Models.Task { Id = Id2, Title = "Task 2", Description = "Task 2", DueDate = DateTime.UtcNow.Date.AddDays(10), Priority = Priority.High });
                context.SaveChanges();
            }
        }

        [Test]
        [Parallelizable(ParallelScope.None)]
        public async System.Threading.Tasks.Task GetTasks_ReturnsAllTasks()
        {
            // Arrange
            using (var context = new AppDbContext(_options))
            {
                var controller = new TaskController(context);

                // Act
                var result = await controller.GetTasks();

                // Assert
                var okResult = result?.Value as OkObjectResult;
                var tasks = result?.Value as List<TaskManager.Service.Models.Task>;
                Assert.That(okResult, Is.Null);
                Assert.That(tasks, Is.Not.Null);
                Assert.That(tasks?.Count, Is.EqualTo(3));
            }
        }

        [Test]
        [Parallelizable(ParallelScope.None)]
        public async System.Threading.Tasks.Task GetTask_ReturnsTaskById()
        {
            // Arrange
            using (var context = new AppDbContext(_options))
            {
                var controller = new TaskController(context);

                // Act
                var result = await controller.GetTask(Id1);

                // Assert
                //var okResult = result as OkObjectResult;
                var task = result?.Value as TaskManager.Service.Models.Task;
                //Assert.That(okResult, Is.Not.Null);
                Assert.That(task, Is.Not.Null);
                Assert.That(Id1, Is.EqualTo(task?.Id));
                Assert.That(task?.Title, Is.EqualTo("Task 1"));
                Assert.That(task?.Description, Is.EqualTo("Task 1"));
            }
        }

        [Test]
        [Parallelizable(ParallelScope.None)]
        public async System.Threading.Tasks.Task PostTask_AddsNewTask()
        {
            var id = Guid.NewGuid();
            // Arrange
            var newTask = new TaskManager.Service.Models.Task { Id = id, Title = "New Task", Description = "Description", DueDate = DateTime.UtcNow.Date.AddDays(7), Priority = Priority.Medium };

            using (var context = new AppDbContext(_options))
            {
                var controller = new TaskController(context);

                // Act
                var result = await controller.PostTask(newTask);
                var createdTask = (result?.Result as CreatedAtActionResult)?.Value as TaskManager.Service.Models.Task;

                // Assert
                Assert.That(createdTask, Is.Not.Null);
                Assert.That(createdTask?.Id, Is.EqualTo(id));
                Assert.That(createdTask?.Title, Is.EqualTo(newTask?.Title));
                Assert.That(createdTask?.Description, Is.EqualTo(newTask?.Description));
                Assert.That(createdTask?.DueDate, Is.EqualTo(newTask?.DueDate));
                Assert.That(createdTask?.Priority, Is.EqualTo(newTask?.Priority));
            }
        }

        [Test]
        [Parallelizable(ParallelScope.None)]
        public async System.Threading.Tasks.Task PutTask_UpdatesExistingTask()
        {
            var id = Guid.NewGuid();
            // Arrange
            var updatedTask = new TaskManager.Service.Models.Task { Id = id, Title = "Updated Task", Description = "Updated Description", DueDate = DateTime.UtcNow.Date.AddDays(10), Priority = Priority.High };

            using (var context = new AppDbContext(_options))
            {
                context.Tasks.Add(new TaskManager.Service.Models.Task { Id = id, Title = "Original Task", Description = "Original Description", DueDate = DateTime.UtcNow.Date.AddDays(5), Priority = Priority.Low });
                context.SaveChanges();
            }

            using (var context = new AppDbContext(_options))
            {
                var controller = new TaskController(context);

                // Act
                var result = await controller.PutTask(updatedTask.Id, updatedTask);

                // Assert
                Assert.That(result, Is.InstanceOf<NoContentResult>());
            }

            // Verify if the task was actually updated
            using (var context = new AppDbContext(_options))
            {
                var updatedTaskFromDb = await context.Tasks.FindAsync(updatedTask.Id);
                Assert.That(updatedTaskFromDb, Is.Not.Null);
                Assert.That(updatedTaskFromDb.Title, Is.EqualTo(updatedTask.Title));
                Assert.That(updatedTaskFromDb.Description, Is.EqualTo(updatedTask.Description));
                Assert.That(updatedTaskFromDb.DueDate, Is.EqualTo(updatedTask.DueDate));
                Assert.That(updatedTaskFromDb.Priority, Is.EqualTo(updatedTask.Priority));
            }
        }

        [Test]
        [Parallelizable(ParallelScope.None)]
        public async System.Threading.Tasks.Task DeleteTask_RemovesTask()
        {
            // Arrange
            var taskIdToRemove = new Guid();

            using (var context = new AppDbContext(_options))
            {
                context.Tasks.Add(new TaskManager.Service.Models.Task { Id = taskIdToRemove, Title = "Task to Delete", Description = "Description", DueDate = DateTime.UtcNow.Date.AddDays(7), Priority = Priority.Medium });
                context.SaveChanges();
            }

            using (var context = new AppDbContext(_options))
            {
                var controller = new TaskController(context);

                // Act
                var result = await controller.DeleteTask(taskIdToRemove);

                // Assert
                Assert.That(result, Is.InstanceOf<NotFoundResult>());
            }

            // Verify if the task was actually removed
            using (var context = new AppDbContext(_options))
            {
                var deletedTaskFromDb = await context.Tasks.FindAsync(taskIdToRemove);
                Assert.That(deletedTaskFromDb, Is.Null);
            }
        }
    }
}
