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
    }
}
