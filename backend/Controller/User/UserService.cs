using backend.Database;
using backend.Model;
using backend.Model.DTO;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;

namespace backend.Controller.User
{
    public class UserService
    {
        DnD5eContext _context;
        public UserService(DnD5eContext context)
        {
            _context = context;
        }
        public void SignUp(UserDTO user)
        {
            _context.Users.Add(new backend.Model.User
            {
                Email = user.Email,
                Name = user.Name,
                Password = user.Password
            });
            _context.SaveChanges();
        }
        public UserDTO Login(UserDTO user)
        {
            var userInDb = _context.Users.Where(u => u.Email == user.Email && u.Password == user.Password).FirstOrDefault();
            if (userInDb != null)
            {
                _context.Add(new Session { user = userInDb, sessionId = GenerateSessionId() });
                _context.SaveChanges();
                return new UserDTO { Email = userInDb.Email, Password = userInDb.Password };
            }
            return null;
        }
        public string GetSessionId(UserDTO user)
        {
            return _context.Sessions.Include(s => s.user).Where(s => s.user.Password == user.Password && user.Email == s.user.Email).First().sessionId;
        }

        public UserDTO CheckSession(string id)
        {
            var session = _context.Sessions.Include(s => s.user).Where(s => s.sessionId == id).FirstOrDefault();
            if (session == null)
                return null;
            var userInSession = session.user;
            return new UserDTO { Email = userInSession.Email, Password = userInSession.Password, Name = userInSession.Name };
        }
        private string GenerateSessionId()
        {
            Guid g = Guid.NewGuid();
            return g.ToString();
        }

        public void Logout(UserDTO user)
        {
            var session = _context.Sessions.Where(s => s.user == _context.Users.Where(u => u.Email == user.Email && u.Password == user.Password).First()).First();
            if (session == null)
                return;
            _context.Sessions.Remove(session);
            _context.SaveChanges();
        }
    }
}