using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TaskManager.Service.Models;

namespace TaskManager.Service.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TaskController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Task
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Models.Task>>> GetTasks()
        {
            return await _context.Tasks.ToListAsync();
        }

        // GET: api/Task/5
        [HttpGet("{Id}")]
        public async Task<ActionResult<Models.Task>> GetTask(Guid Id)
        {
            var task = await _context.Tasks.FindAsync(Id);

            if (task == null)
            {
                return NotFound();
            }

            return task;
        }

        // POST: api/Task
        [HttpPost]
        public async Task<ActionResult<Models.Task>> PostTask(Models.Task task)
        {
            _context.Tasks.Add(task);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTask), new { task.Id }, task);
        }

        // PUT: api/Task/5
        [HttpPut("{Id}")]
        public async Task<IActionResult> PutTask(Guid Id, Models.Task task)
        {
            if (Id != task.Id)
            {
                return BadRequest();
            }

            _context.Entry(task).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TaskExists(Id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Task/5
        [HttpDelete("{Id}")]
        public async Task<IActionResult> DeleteTask(Guid Id)
        {
            var task = await _context.Tasks.FindAsync(Id);
            if (task == null)
            {
                return NotFound();
            }

            _context.Tasks.Remove(task);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TaskExists(Guid Id)
        {
            return _context.Tasks.Any(e => e.Id == Id);
        }
    }
}
