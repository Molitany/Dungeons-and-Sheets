using Microsoft.AspNetCore.Mvc;
using backend.Model.DTO;

namespace backend.Controller.User
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        UserService _userService;
        public UserController(UserService service)
        {
            _userService = service;
        }
        [HttpPost]
        [Route("CheckSession")]
        public UserDTO CheckSession([FromBody] BobDTO bob){
            if(bob.id == "")
                return null;
            return _userService.CheckSession(bob.id);
        }
        [HttpPost]
        [Route("GetSessionId")]
        public string GetSessionId(UserDTO user){
            return _userService.GetSessionId(user);
        }

        [HttpPost]
        [Route("Login")]
        public UserDTO Login([FromBody] UserDTO user){
            return _userService.Login(user);
        }

        [HttpPost]
        [Route("SignUp")]
        public UserDTO SignUp([FromBody] UserDTO user){
            _userService.SignUp(user);
            return user;
        }
        [HttpPost]
        [Route("Logout")]
        public UserDTO Logout([FromBody] UserDTO user){
            _userService.Logout(user);
            return user;
        }
    }
}