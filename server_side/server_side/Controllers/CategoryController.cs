using Microsoft.AspNetCore.Mvc;
using BLL;
using DAL;

namespace server_side.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    { 
        private IRepository<Category> categoryRepository;
    
       public CategoryController (IRepository<Category>categoryRepository)
   {
        this.categoryRepository=categoryRepository;
    
    }
        [HttpGet("get/{id}")]
        public IActionResult GetCategoryByID(int id)
        {
             Category p = categoryRepository.GetById(id);
            if (p == null)
                return NotFound();
            return Ok(p);
}
        [HttpGet("get")]
        public IActionResult GetCategories()
        {
            return Ok(categoryRepository.GetAll());
        }
        [HttpPost("add")]
        public ActionResult<Category> AddCategory(Category p)
        {
            if (p == null || !ModelState.IsValid)
                return BadRequest();

            Category category = categoryRepository.GetById(p.CategoryId);
            if (category != null)
                return BadRequest();
            categoryRepository.Add(p);
            return CreatedAtAction(nameof(AddCategory), new { id = p.CategoryId }, p);
        }
        [HttpPut("update/{id}")]
        public IActionResult UpdataCategory(int id, Category p)
        {
            if (p == null || !ModelState.IsValid)
                return BadRequest();
            if (id == p.CategoryId)
                return Conflict();
            return CreatedAtAction(nameof(AddCategory), new { id = p.CategoryId },categoryRepository.Update(p));

        }
        [HttpDelete("delete")]
        public IActionResult Delete(int id)
        {
            Category category = categoryRepository.GetById(id);
            if (category == null)
                return NotFound();
            categoryRepository.Delete(category);
            return NoContent();
        }
    }}



   