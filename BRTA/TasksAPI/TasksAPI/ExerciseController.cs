using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Runtime.CompilerServices;


namespace TasksAPI
{


    [ApiController]
    [Route("[controller]")]
    public class ExerciseController : ControllerBase
    {
        [HttpGet("id")]
        public IActionResult Get(int id)
        {
            return Ok($"GET request successful. ID: {id}");
        }

        [HttpGet]
        public IActionResult GetSum(double param1, double param2)
        {
            return Ok($"GET request successful. Sum: {param1 + param2}");
        }



        [HttpGet("ReturnList")]
        public IActionResult GetList(List<string> list)
        {
            if (list is null)
                return BadRequest("List is null");

            return Ok(list);
        }


        [HttpPost("ListSum")]
        public IActionResult ListSum(List<double> list)
        {
            if(list == null)
            {
                return BadRequest("List is null");
            }
            double sum = 0;
            foreach (double num in list)
            {
                sum += num;
            }
            return Ok(sum);
        }


        private static List<string> listOfStrings = new List<string>() { "ana", "are", "mere" };

        [HttpPut("update/{index}")]
        public IActionResult Update(int index, [FromBody] string value)
        {
            if (index < 0 || index >= listOfStrings.Count)
            {
                return BadRequest("Index is out of bounds.");
            }

            if (string.IsNullOrEmpty(value))
            {
                return BadRequest("Value cannot be null or empty.");
            }

            listOfStrings[index] = value;

            return Ok(listOfStrings);
        }
        [HttpDelete("{index}")]
        public IActionResult DeleteFromPosition(int index)
        {
            if (index < 0 || index >= listOfStrings.Count)
            {
                return BadRequest("Index is out of bounds.");
            }

            listOfStrings.RemoveAt(index);

            return Ok(listOfStrings);
        }

    }

    

}
