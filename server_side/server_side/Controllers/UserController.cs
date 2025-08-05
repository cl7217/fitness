using AutoMapper;
using BLL;
using DAL;
using DTO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace server_side.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class UserController : ControllerBase
    {
        private IUserRepository UserRepository;
        private IMapper mapper;
        private IPurchaseRepository purchaseRepository;
        private IRentalRepository rentalRepository;

        public UserController(IMapper mapper, IUserRepository UserRepository, IPurchaseRepository purchaseRepository,IRentalRepository rentalRepository)
        {
            this.purchaseRepository = purchaseRepository;
            this.rentalRepository = rentalRepository;
            this.UserRepository = UserRepository;
            this.mapper = mapper;
        }

        [HttpGet("get/{id}")]
        public IActionResult GetUserByID(int id)
        {
            UserDTO u = UserRepository.GetById(id);
            if (u == null)
                return NotFound();
            return Ok(u);
        }

        [HttpGet("get")]
        public IActionResult GetUsers()
        {
            return Ok(UserRepository.GetAll());
        }



        [HttpPut("update/{id}")]
        public IActionResult UpdataUsers(int id, User u)
        {
            if (u == null || !ModelState.IsValid)
                return BadRequest();
            if (id == u.UserId)
                return Conflict();
            return CreatedAtAction(nameof(UpdataUsers), new { id = u.UserId }, UserRepository.Update(mapper.Map<UserDTO>(u)));

        }
        [HttpDelete("delete")]
        public IActionResult Delete(int id)
        {
            UserDTO user = UserRepository.GetById(id);
            if (user == null)
                return NotFound();
            UserRepository.Delete(user);
            return NoContent();
        }
        [HttpPost("signin")]
        public IActionResult SignIn([FromBody] LoginDTO loginRequest)
        {
            if (loginRequest == null || string.IsNullOrWhiteSpace(loginRequest.Email) || string.IsNullOrWhiteSpace(loginRequest.Password))
                return BadRequest("Email and password are required.");
            UserDTO user = UserRepository.SignIn(loginRequest.Password, loginRequest.Email);
            if (user == null)
                return NotFound("Invalid email or password.");
            return Ok(user);
        }

        [HttpPost("signup")]
        public IActionResult SignUp(User u)
        {
            if (u == null || !ModelState.IsValid)
                return BadRequest();
            var existingUser = UserRepository.GetByEmail(u.Email);
            if (existingUser != null)
                return BadRequest("User with this email already exists");
            // ✨ שלב קריטי: הצפנת הסיסמה
            u.Password = BCrypt.Net.BCrypt.HashPassword(u.Password);
            UserDTO createdUser = UserRepository.SignUp(u);

            return CreatedAtAction(nameof(SignUp), new { id = createdUser.UserId }, createdUser);
        }
        [HttpGet("{userId}/points")]
        public IActionResult GetUserPoints(int userId)
        {
            // בדיקה אם המשתמש קיים
            var user = UserRepository.GetUserById(userId);
            if (user == null)
                return NotFound("User not found");

            // שליפת הרכישות של המשתמש
            var purchases = purchaseRepository.GetPurchasesByUserId(userId);
            if (purchases == null || !purchases.Any())
                return Ok(new { UserId = userId, Points = 0 });

            int totalPoints = 0;

            foreach (var purchase in purchases)
            {
                // שליפת ההשכרות של הרכישה
                var rentals = rentalRepository.GetRentalsByPurchaseId(purchase.Code);
                int deducted = rentals?.Sum(r => r.PointsDeducated) ?? 0;

                // מניעת נקודות שליליות
                int remaining = purchase.PointsBalance - deducted;
                if (remaining < 0)
                    remaining = 0;

                totalPoints += remaining;
            }

            // מחזיר תשובה עם הסכום
            return Ok(new
            {
                UserId = userId,
                Points = totalPoints
            });
        }
    }
}