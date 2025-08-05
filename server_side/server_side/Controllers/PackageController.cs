using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BLL;
using DAL;
namespace server_side.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PackageController : ControllerBase
    {

        private IRepository<Package> packageRepository;

        public PackageController(IRepository<Package> packageRepository)
        {
            this.packageRepository = packageRepository;
        }

        [HttpGet("get/{id}")]
        public IActionResult GetPackageByID(int id)
        {
            Package p = packageRepository.GetById(id);
            if (p == null)
                return NotFound();
            return Ok(p);
        }
        [HttpGet("get")]
        public IActionResult GetPackages()
        {
            return Ok(packageRepository.GetAll());
        }
        
        

        [HttpPost("add")]
        public ActionResult<Package> AddPackage(Package p)
        {
            if (p == null || !ModelState.IsValid)      
                return BadRequest();

            Package package = packageRepository.GetById(p.Code);
            if (package != null)
                return BadRequest();
            packageRepository.Add(p);
            return CreatedAtAction(nameof(AddPackage), new { id = p.Code }, p);
        }

        [HttpPut("update/{id}")]
        public IActionResult UpdataPackages(int id, Package p)
        {
            if (p == null || !ModelState.IsValid)
                return BadRequest();
            if (id == p.Code)
                return Conflict();
            return CreatedAtAction(nameof(AddPackage), new { id = p.Code }, packageRepository.Update(p));

        }
        [HttpDelete("delete")]
        public IActionResult Delete(int id)
        {
            Package package = packageRepository.GetById(id);
            if (package == null)
                return NotFound();
            packageRepository.Delete(package);
            return NoContent();
        }
    }
}
