using Microsoft.AspNetCore.Mvc;
using DAL;
using BLL;

namespace server_side.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HealthFundController : ControllerBase
    { private IRepository<HealthFund> healthFundRepository;
    
       public HealthFundController(IRepository<HealthFund> healthFundRepository)
   {
        this.healthFundRepository = healthFundRepository;
    
    }
        [HttpGet("get/{id}")]
        public IActionResult GetHealthFundByID(int id)
        {
             HealthFund p = healthFundRepository.GetById(id);
            if (p == null)
                return NotFound();
            return Ok(p);
}
        [HttpGet("get")]
        public IActionResult GetHealthFunds()
        {
            return Ok(healthFundRepository.GetAll());
        }

        [HttpPost("add")]
        public ActionResult<HealthFund> AddHealthFund(HealthFund p)
        {
            if (p == null || !ModelState.IsValid)
                return BadRequest();

            HealthFund healthFund = healthFundRepository.GetById(p.Code);
            if (healthFund != null)
                return BadRequest();
           healthFundRepository.Add(p);
            return CreatedAtAction(nameof(AddHealthFund), new { id = p.Code }, p);
        }
        [HttpPut("update/{id}")]
        public IActionResult UpdataLessons(int id, HealthFund p)
        {
            if (p == null || !ModelState.IsValid)
                return BadRequest();
            if (id == p.Code)
                return Conflict();
            return CreatedAtAction(nameof(AddHealthFund), new { id = p.Code },healthFundRepository.Update(p));

        }
        [HttpDelete("delete")]
        public IActionResult Delete(int id)
        {
            HealthFund healthFund = healthFundRepository.GetById(id);
            if (healthFund == null)
                return NotFound();
            healthFundRepository.Delete(healthFund);
            return NoContent();
        }
       
    }
}
