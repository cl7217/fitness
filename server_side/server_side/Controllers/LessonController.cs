using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLL;
using DAL;
namespace server_side.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    
    public class LessonController : ControllerBase
    {

        private IRepository<Lesson> lessonRepository;

        public LessonController(IRepository<Lesson> lessonRepository)
        {
            this.lessonRepository = lessonRepository;
        }

        [HttpGet("get/{id}")]
        public IActionResult GetLessonByID(int id)
        {
            Lesson p = lessonRepository.GetById(id);
            if (p == null)
                return NotFound();
            return Ok(p);
        }
        [HttpGet("get")]
        public IActionResult GetLessons()
        {
            return Ok(lessonRepository.GetAll());
        }

        [HttpPost("add")]
        public ActionResult<Lesson> AddLesson(Lesson p)
        {
            if (p == null || !ModelState.IsValid)
                return BadRequest();

            Lesson lesson = lessonRepository.GetById(p.Code);
            if (lesson != null)
                return BadRequest();
            lessonRepository.Add(p);
            return CreatedAtAction(nameof(AddLesson), new { id = p.Code }, p);
        }

        [HttpPut("update/{id}")]
        public IActionResult UpdataLessons(int id, Lesson p)
        {
            if (p == null || !ModelState.IsValid)
                return BadRequest();
            if (id == p.Code)
                return Conflict();
            return CreatedAtAction(nameof(AddLesson), new { id = p.Code }, lessonRepository.Update(p));

        }
        [HttpDelete("delete")]
        public IActionResult Delete(int id)
        {
            Lesson lesson = lessonRepository.GetById(id);
            if (lesson == null)
                return NotFound();
            lessonRepository.Delete(lesson);
            return NoContent();
        }
        [HttpGet("schedule")]
        public IActionResult GetSchedule()
        {
            var lessons = lessonRepository.GetAll();
            var schedule = lessons.Select(l => new
            {
                id = l.Code,
                name = l.Name,
                day = l.Day,
                hour = l.Hour,
                pointsPerHour = l.PointsPerHour
            });

            return Ok(schedule);
        }

        [HttpGet("{lessonId}/available-dates")]
        public IActionResult GetAvailableDates(int lessonId)
        {
            var lesson = lessonRepository.GetById(lessonId);
            if (lesson == null)
                return NotFound();

            var dates = GetNext4DaysOfWeek(lesson.Day);

            return Ok(dates);
        }

        private List<DateTime> GetNext4DaysOfWeek(int dayOfWeek)
        {
            var baseDate = DateTime.Today;
            DayOfWeek targetDay = (DayOfWeek)(((dayOfWeek - 1) + 7) % 7);
            int daysToAdd = ((int)targetDay - (int)baseDate.DayOfWeek + 7) % 7;

            var nextDates = new List<DateTime>();
            var nextDate = baseDate.AddDays(daysToAdd);

            for (int i = 0; i < 4; i++)
            {
                nextDates.Add(nextDate);
                nextDate = nextDate.AddDays(7);
            }

            return nextDates;
        }
    }
}

