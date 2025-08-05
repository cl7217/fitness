using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLL;
using DAL;
using DTO;
using AutoMapper;

namespace server_side.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseController : ControllerBase
    {

        private IPurchaseRepository purchasesRepository;
        private IMapper mapper;

        public PurchaseController(IPurchaseRepository purchasesRepository, IMapper mapper)
        {
            this.purchasesRepository = purchasesRepository;
            this.mapper = mapper;
        }

        [HttpGet("get/{id}")]
        public IActionResult GetPurchaseByID(int id)
        {
            PurchaseDTO p = purchasesRepository.GetById(id);
            if (p == null)
                return NotFound();
            return Ok(p);
        }
        [HttpGet("get")]
        public IActionResult GetPurchases()
        {
            return Ok(purchasesRepository.GetAll());
        }

        [HttpPost("add")]
        public ActionResult<PurchaseDTO> AddPurchase(Purchase p)
        {
            if (p == null || !ModelState.IsValid)
                return BadRequest("");
            PurchaseDTO p2 = purchasesRepository.AddPurchase(p);
            return CreatedAtAction(nameof(AddPurchase), new { id = p2.Code },p2);
        }

        [HttpPut("update/{id}")]
        public IActionResult UpdataPurchases(int id, PurchaseDTO p)
        {
            if (p == null || !ModelState.IsValid)
                return BadRequest();
            if (id == p.Code)
                return Conflict();
            return CreatedAtAction(nameof(AddPurchase), new { id = p.Code }, purchasesRepository.Update(p));

        }
        [HttpDelete("delete")]
        public IActionResult Delete(int id)
        {
            PurchaseDTO purchase = purchasesRepository.GetById(id);
            if (purchase == null)
                return NotFound();
            purchasesRepository.Delete(purchase);
            return NoContent();
        }

        [HttpPost("getByUserId")]
        public IActionResult GetPurchasesByUserId(UserDTO user)
        {
            List<PurchaseDTO> purchases = purchasesRepository.PurchasesByUserId(user.UserId);
            return Ok(purchases);
        }
    }
}
