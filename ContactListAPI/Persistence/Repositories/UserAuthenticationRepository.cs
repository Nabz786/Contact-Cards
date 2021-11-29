using ContactListAPI.Domain.Models;
using ContactListAPI.Domain.Models.Responses;
using ContactListAPI.Domain.Repositories;
using ContactListAPI.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace ContactListAPI.Persistence.Repositories
{
    public class UserAuthenticationRepository : IUserAuthenticationRepository
    {
        private readonly ContactsContext _contactsContext;
        private readonly IConfiguration _configuration;

        public UserAuthenticationRepository(ContactsContext contactsContext, IConfiguration configuration)
        {
            _contactsContext = contactsContext;
            _configuration = configuration;
        }

        public async Task<UserLoginResponse> Login(string username, string password)
        {
            var userLoginResponse = new UserLoginResponse();
            var user = await _contactsContext.Users.FirstOrDefaultAsync(user => user.Username.ToLower().Equals(username.ToLower()));

            if (user == null)
            {
                userLoginResponse.Success = false;
                return userLoginResponse;
            }
            else if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            {
                userLoginResponse.Success = false;
                return userLoginResponse;
            }

            userLoginResponse.Success = true;
            userLoginResponse.UserId = user.Id;
            userLoginResponse.Token = CreateToken(user);
            return userLoginResponse;
        }

        public async Task<UserLoginResponse> Register(User user, string password)
        {
            var userLoginResponse = new UserLoginResponse();

            if (await UserExists(user.Username))
            {
                userLoginResponse.Success = false;

                return userLoginResponse;
            }

            CreatePasswordHash(password, out byte[] passwordHash, out byte[] passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await _contactsContext.Users.AddAsync(user);
            await _contactsContext.SaveChangesAsync();

            userLoginResponse.Success = true;
            userLoginResponse.UserId = user.Id;
            userLoginResponse.Token = CreateToken(user);

            return userLoginResponse;
        }

        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using var hmac = new HMACSHA512();

            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }

        public async Task<bool> UserExists(string username)
        {
            if (await _contactsContext.Users.AnyAsync(user => user.Username.ToLower() == username.ToLower()))
            {
                return true;
            }

            return false;
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != passwordHash[i])
                    {
                        return false;
                    }
                }

                return true;
            }
        }

        private string CreateToken(User user)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Username)
            };

            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration.GetSection("AppSettings:Token").Value));

            var signInCredentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512Signature);

            var securityTokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = signInCredentials,
            };

            var securityToken = new JwtSecurityTokenHandler();
            var token = securityToken.CreateToken(securityTokenDescriptor);

            return securityToken.WriteToken(token);
        }
    }
}
