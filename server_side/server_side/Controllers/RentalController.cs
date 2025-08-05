using System;
using AutoMapper;
using BLL;
using DAL;
using DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace server_side.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RentalController : ControllerBase
    {
        public IRentalRepository RentalRepository;
        public IRepository<Lesson> _lessonRepo;
        public IPurchaseRepository _purchaseRepo;
        private readonly IMapper mapper;
        private GymDB gymDB;

        public RentalController(
                IRentalRepository rentalRepository,
                IRepository<Lesson> lessonRepo,
                IPurchaseRepository purchaseRepo,
                IMapper mapper,
                GymDB gymDB
                )
        {
            RentalRepository = rentalRepository;
            _lessonRepo = lessonRepo;
            _purchaseRepo = purchaseRepo;
            this.mapper = mapper;
            gymDB = gymDB;
        }

        public class RentalRequest
        {
            public int LessonId { get; set; }
            public int UserId { get; set; }
            public DateTime Date { get; set; }
        }

        [HttpGet("get/{id}")]
        public IActionResult GetRentalByID(int id)
        {
            Rental r = RentalRepository.GetById(id);
            if (r == null)
                return NotFound();
            return Ok(r);
        }

        [HttpGet("get")]
        public IActionResult GetRentals()
        {
            var rentals = gymDB.Rentals
                .Include(r => r.Lesson) // כולל את השיעור
                .Select(r => new RentalDTO
                {
                    Code = r.Code,
                    ReallyEnter = r.ReallyEnter,
                    ReallyExit = r.ReallyExit,
                    PointsDeducated = r.PointsDeducated,
                    LessonId = r.LessonId,
                    LessonName = r.Lesson.Name,  // כאן השם של השיעור
                    PurchaseId = r.PurchaseId
                })
                .ToList();

            return Ok(rentals);
        }
        [HttpPut("update/{id}")]
        public IActionResult UpdataRentals(int id, Rental r)
        {
            if (r == null || !ModelState.IsValid)
                return BadRequest();
            if (id == r.Code)
                return Conflict();
            return CreatedAtAction(nameof(AddRental), new { id = r.Code }, RentalRepository.Update(r));

        }
        [HttpDelete("delete")]
        public IActionResult delete(int id)
        {
            Rental rental = RentalRepository.GetById(id);
            if (rental == null)
                return NotFound();
            RentalRepository.Delete(rental);
            return NoContent();
        }



        [HttpPost("add")]
        public IActionResult AddRental([FromBody] RentalRequest request)
        {
            try
            {
                // המרה מ-UTC לאזור זמן ישראל
                TimeZoneInfo israelTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Israel Standard Time");
                DateTime localDate = TimeZoneInfo.ConvertTimeFromUtc(request.Date, israelTimeZone);

                // 1. שליפת שיעור
                var lesson = _lessonRepo.GetById(request.LessonId);
                if (lesson == null)
                    return NotFound("Lesson not found");

                // 2. שליפת רכישות לפי המשתמש
                var purchases = _purchaseRepo.GetPurchasesByUserId(request.UserId)
                                             .OrderBy(p => p.Date)
                                             .ToList();

                int neededPoints = lesson.PointsPerHour;

                // 3. חיפוש רכישה עם מספיק נקודות
                var purchase = purchases.FirstOrDefault(p => p.PointsBalance >= neededPoints);
                if (purchase == null)
                    return BadRequest("אין מספיק נקודות");

                // 4. הורדת נקודות מהרכישה
                purchase.PointsBalance -= neededPoints;
                _purchaseRepo.Update(purchase);

                // 5. יצירת ההשכרה עם תאריך מקומי
                var rental = new Rental
                {
                    LessonId = lesson.Code,
                    PurchaseId = purchase.Code,
                    ReallyEnter = localDate,
                    ReallyExit = localDate.AddHours(1), // נניח שעה
                    PointsDeducated = neededPoints
                };

                RentalRepository.Add(rental);

                return Ok("Rental created successfully");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }


        [HttpGet("user/{userId}")]
        public IActionResult GetRentalsByUser(int userId)
        {
            try
            {
                // אם RentalRepository.GetAll() מחזיר IQueryable, אפשר להוסיף Include
                var rentalsQuery = RentalRepository.GetAll();

                // במידה ואין Include בתוך ה-Repository, תוכל להמיר ל-List ואז ל-filter:
                var rentalsList = rentalsQuery.ToList();

                var filteredRentals = rentalsList
                    .Where(r => r.Purchases != null && r.Purchases.UserId == userId)
                    .Select(r => new RentalDTO
                    {
                        Code = r.Code,
                        ReallyEnter = r.ReallyEnter,
                        ReallyExit = r.ReallyExit,
                        PointsDeducated = r.PointsDeducated,
                        LessonId = r.LessonId,
                        LessonName = r.Lesson != null ? r.Lesson.Name : "לא זמין",
                        PurchaseId = r.PurchaseId
                    })
                    .ToList();

                return Ok(filteredRentals);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error fetching rentals: {ex.Message}");
            }
        }


    }
}




