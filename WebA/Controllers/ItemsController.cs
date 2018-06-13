using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebA.Data;
using WebA.Data.Items;
using Nelibur.ObjectMapper;

namespace WebA.Controllers
{
    //TODO: optimize api. Now its reading all items in database to show somthing
    [Route("api/[controller]")]
    public class ItemsController : Controller
    {
        private ApplicationDbContext dbContext;

        public ItemsController(ApplicationDbContext context)
        {
            dbContext = context;
        }
        /// <summary>
        /// GET: api/items
        /// </summary>
        /// <returns>Nothing: this method will raise a HttpNotFound HTTP
        ///exception, since we're not supporting this API call.</returns>

        [HttpGet("getPost")]
        public IActionResult getPost()
        {
            var rd = new Random().Next();
            var item = new ItemViewModel()
            {
                Id = rd,
                Title = $"{rd}",
                Description = $"This is a sample description for item {rd}: Lorem ipsum dolor sit amet.",
            };
            return new JsonResult(item, DefaultJsonSettings);
        }
        /// <summary>
        /// GET: api/items/{id}
        /// ROUTING TYPE: attribute-based
        /// </summary>
        /// <returns>A Json-serialized object representing a single item.
        ///</returns>
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var item = dbContext.Items.Where(i => i.Id == id).FirstOrDefault();
            if (item != null)
                return new JsonResult(TinyMapper.Map<ItemViewModel>(item), DefaultJsonSettings);
            else
                return NotFound($"Item ID {id} has not been found");
        }

        [HttpPost()]
        public IActionResult Add([FromBody]ItemViewModel ivm)
        {
            if (ivm != null)
            {
                var item = TinyMapper.Map<Item>(ivm);
                //override any properties that could be wise to set from server - side only
                item.CreatedDate = item.LastModifiedDate = DateTime.Now;
                item.UserId = dbContext.Users.Where(u => u.UserName == "Admin").FirstOrDefault().Id;
                dbContext.Items.Add(item);
                dbContext.SaveChanges();

                return new JsonResult(TinyMapper.Map<ItemViewModel>(item), DefaultJsonSettings);
            }
            else
            {
                return new StatusCodeResult(500);
            }
        }

        /// <summary>
        /// PUT: api/items/{id}
        /// </summary>
        /// <returns>Updates an existing Item and return it accordingly.
        ///</returns>
        [HttpPut("{id}")]
        public IActionResult Update(int id, [FromBody]ItemViewModel ivm)
        {
            if (ivm != null)
            {
                var item = dbContext.Items.Where(i => i.Id ==
                id).FirstOrDefault();
                if (item != null)
                {
                    // handle the update (on per-property basis)
                    item.UserId = ivm.UserId;
                    item.Description = ivm.Description;
                    item.Flags = ivm.Flags;
                    item.Notes = ivm.Notes;
                    item.Text = ivm.Text;
                    item.Title = ivm.Title;
                    item.Type = ivm.Type;
                    // override any property that could be wise to set from
                    //server - side only
                    item.LastModifiedDate = DateTime.Now;
                    // persist the changes into the Database.
                    dbContext.SaveChanges();
                    // return the updated Item to the client.
                    return new
                    JsonResult(TinyMapper.Map<ItemViewModel>(item), DefaultJsonSettings);
                }
            }
            // return a HTTP Status 404 (Not Found) if we couldn't find a
            //suitable item.
            return NotFound(new { Error = String.Format("Item ID {0} hasnot been found", id) });
        }
        /// <summary>
        /// DELETE: api/items/{id}
        /// </summary>
        /// <returns>Deletes an Item, returning a HTTP status 200 (ok) when
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var item = dbContext.Items.Where(i => i.Id ==
            id).FirstOrDefault();
            if (item != null)
            {
                // remove the item to delete from the DbContext.
                dbContext.Items.Remove(item);
                // persist the changes into the Database.
                dbContext.SaveChanges();
                // return an HTTP Status 200 (OK).
                return new OkResult();
            }
            // return a HTTP Status 404 (Not Found) if we couldn't find a
            //suitable item.
            return NotFound(new { Error = $"Item ID {id} has not been found" });
        }
        /// <summary>
        /// GET: api/items/GetLatest
        /// ROUTING TYPE: attribute-based
        /// </summary>
        /// <returns>An array of a default number of Json-serialized
        ///objects representing the last inserted items.</returns>

        [HttpGet("GetLatest")]
        public IActionResult GetLatest()
        {
            return GetLatest(DefaultNumberOfItems);
        }
        /// <summary>
        /// GET: api/items/GetLatest/{n}
        /// ROUTING TYPE: attribute-based
        /// </summary>
        /// <returns>An array of {n} Json-serialized objects representing
        ///the last inserted items.</returns>

        [HttpGet("GetLatest/{n}")]
        public IActionResult GetLatest(int n)
        {
            if (n > MaxNumberOfItems) n = MaxNumberOfItems;
            var items = dbContext.Items.OrderByDescending(i => i.CreatedDate).Take(n);
            return new JsonResult(ToItemViewModel(items).ToArray(), DefaultJsonSettings);
        }
        /// <summary>
        /// GET: api/items/GetMostViewed
        /// ROUTING TYPE: attribute-based
        /// </summary>
        /// <returns>An array of a default number of Json-serialized
        ///objects representing the items with most user views.</returns>

        [HttpGet("GetMostViewed")]
        public IActionResult GetMostViewed()
        {
            return GetMostViewed(DefaultNumberOfItems);
        }
        /// <summary>
        /// GET: api/items/GetMostViewed/{n}
        /// ROUTING TYPE: attribute-based
        /// </summary>
        /// <returns>An array of {n} Json-serialized objects representing
        ///the items with most user views.</returns>

        [HttpGet("GetMostViewed/{n}")]
        public IActionResult GetMostViewed(int n)
        {
            if (n > MaxNumberOfItems) n = MaxNumberOfItems;
            var items = dbContext.Items.OrderByDescending(i =>
            i.ViewCount).Take(n);
            return new JsonResult(ToItemViewModel(items).ToArray(), DefaultJsonSettings);
        }
        /// <summary>
        /// GET: api/items/GetRandom
        /// ROUTING TYPE: attribute-based
        /// </summary>
        /// <returns>An array of a default number of
        ///Json-serialized objects representing some randomly-picked items.

        ///</returns>

        [HttpGet("GetRandom")]
        public IActionResult GetRandom()
        {
            return GetRandom(DefaultNumberOfItems);
        }
        /// <summary>
        /// GET: api/items/GetRandom/{n}
        /// ROUTING TYPE: attribute-based
        /// </summary>
        /// <returns>An array of {n} Json-serialized objects representing
        ///some randomly-picked items.</returns>
        [HttpGet("GetRandom/{n}")]
        public IActionResult GetRandom(int n)
        {
            if (n > MaxNumberOfItems) n = MaxNumberOfItems;
            var items = dbContext.Items.OrderBy(i =>
            Guid.NewGuid()).Take(n);
            return new JsonResult(ToItemViewModel(items).ToArray(), DefaultJsonSettings);
        }

        /// <summary>
        /// Returns a suitable JsonSerializerSettings object that can be
        /// used to generate the JsonResult return value for this Controller's methods.
        /// </summary>
        private JsonSerializerSettings DefaultJsonSettings
        {
            get
            {
                return new JsonSerializerSettings()
                {
                    Formatting = Formatting.Indented
                };
            }
        }
        /// <summary>
        /// Returns the default number of items to retrieve when using the
        ///parameterless overloads of the API methods retrieving item lists.
        /// </summary>
        private int DefaultNumberOfItems
        {
            get
            {
                return 4;
            }
        }
        /// <summary>
        /// Returns the maximum number of items to retrieve when using the
        ///API methods retrieving item lists.
        /// </summary>
        private int MaxNumberOfItems
        {
            get
            {
                return 100;
            }
        }

        private IEnumerable<ItemViewModel> ToItemViewModel(IEnumerable<Item> items)
        {
            var list = new List<ItemViewModel>();

            foreach (var item in items)
            {
                yield return TinyMapper.Map<ItemViewModel>(item);
            }
        }
    }
}


