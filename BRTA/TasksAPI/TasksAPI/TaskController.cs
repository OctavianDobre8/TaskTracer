using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TasksAPI.Models;
using TasksAPI.Services;
using MongoDB.Driver;
using System;
using System.Collections.Generic;

namespace TasksAPI
{
    [ApiController]
    [Route("[controller]")]
    public class TaskController : ControllerBase
    {
        private readonly ITaskCollectionService _taskCollectionService;

        public TaskController(ITaskCollectionService taskCollectionService)
        {
            _taskCollectionService = taskCollectionService ?? throw new ArgumentNullException(nameof(taskCollectionService));
        }

        [HttpGet]
        public async Task<IActionResult> GetTasks()
        {
            List<TaskModel> tasks = await _taskCollectionService.GetAll();
            return Ok(tasks);
        }

        [HttpPost]
        public async Task<bool> Create(TaskModel taskModel)
        {
            if (taskModel.Id == Guid.Empty)
            {
                taskModel.Id = Guid.NewGuid();
            }

            return await _taskCollectionService.Create(taskModel);
        }

        [HttpDelete("{id}")]
        public async Task<bool> Delete(Guid id)
        {
            return await _taskCollectionService.Delete(id);
        }

        [HttpGet("{id}")]
        public async Task<TaskModel> Get(Guid id)
        {
            return await _taskCollectionService.Get(id);
        }

        [HttpPut("{id}")]
        public async Task<bool> Update(Guid id, TaskModel taskModel)
        {
            return await _taskCollectionService.Update(id, taskModel);
        }

        [HttpGet("status/{status}")]
        public async Task<List<TaskModel>> GetTasksByStatus(string status)
        {
            return await _taskCollectionService.GetTasksByStatus(status);
        }

    }
}