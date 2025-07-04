using Microsoft.AspNetCore.Mvc;
using SimpleWebAPI.Models;
using SimpleWebAPI.Services;
using System.Text;

namespace SimpleWebAPI.Controllers
{
    [ApiController]
    [Route("kontrahenci")]
    public class KontrahenciController : ControllerBase
    {
        private readonly IKontrahentService _service;

        public KontrahenciController(IKontrahentService service)
        {
            _service = service;
        }
        //Get /kontrahenci/raport
        [HttpGet("raport")]
        public IActionResult Report()
        {
            var kontrahenci = _service.GetAll();

            var sb = new StringBuilder();
            sb.AppendLine("Id;Name;Key;Value");

            foreach (var kontrahent in kontrahenci)
            {
                if (kontrahent.AdditionalFields?.Count > 0)
                {
                    foreach (var field in kontrahent.AdditionalFields)
                    {
                        sb.AppendLine($"{kontrahent.Id};{kontrahent.Name};{field.Key};{field.Value}");
                    }
                }
                else
                {
                    sb.AppendLine($"{kontrahent.Id};{kontrahent.Name};;");
                }
            }

            var bytes = Encoding.UTF8.GetBytes(sb.ToString());
            return File(bytes, "text/csv", "raport_kontrahenci.csv");
        }
        // GET /kontrahenci
        [HttpGet]
        public ActionResult<IEnumerable<Kontrahent>> GetAll()
        {
            var kontrahenci = _service.GetAll();
            return Ok(kontrahenci);
        }

        // GET /kontrahenci/{id}
        [HttpGet("{id:int}")]
        public ActionResult<Kontrahent> GetById(int id)
        {
            var kontrahent = _service.GetById(id);
            return kontrahent is null ? NotFound() : Ok(kontrahent);
        }

        // POST /kontrahenci
        [HttpPost]
        public ActionResult<Kontrahent> Create([FromBody] KontrahentCreateDTO dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var kontrahent = new Kontrahent
            {
                Name = dto.Name,
                AdditionalFields = dto.AdditionalFields
            };

            var created = _service.Add(kontrahent);
            return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
        }

        // PUT /kontrahenci/{id}
        [HttpPut("{id:int}")]
        public IActionResult Update(int id, [FromBody] KontrahentUpdateDto dto)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var kontrahent = new Kontrahent
            {
                Name = dto.Name,
                AdditionalFields = dto.AdditionalFields
            };

            var updated = _service.Update(id, kontrahent);
            return updated ? NoContent() : NotFound();
        }

        // DELETE /kontrahenci/{id}
        [HttpDelete("{id:int}")]
        public IActionResult Delete(int id)
        {
            var deleted = _service.Delete(id);
            return deleted ? NoContent() : NotFound();
        }
    }
}