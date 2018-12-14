using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Experments.Controllers
{
    public class HomeController : Controller
    {
        // GET: /<controller>/
        public string About()
        {
            ViewData["Message"] = "Your application description page";

            return "Test";
        }


        public ActionResult AjaxQuery([FromQuery]int id, [FromQuery]string name)
        {
            //var i = HttpContext.Request.Form["id"];
            //var n = HttpContext.Request.Form["name"];
            return new JsonResult(new { id, name });
        }

        public ActionResult AjaxPost(int id, string name)
        {
            var i = HttpContext.Request.Form["id"];
            var n = HttpContext.Request.Form["name"];
            return new JsonResult(new { id = i, name = n});
        }
    }
}
