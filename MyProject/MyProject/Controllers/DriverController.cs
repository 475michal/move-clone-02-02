using Common.Entity;
using Microsoft.AspNetCore.Mvc;
using Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MimeKit;
//using System;
//using System.Xml.Linq;
using MailKit.Security;
//using System.Net;
//using System.Net.Mail;
using MailKit.Net.Smtp;
using System.Net;
using System.Net.Mail;
using SmtpClient = MailKit.Net.Smtp.SmtpClient;

//using System;

namespace MyProject.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriverController : ControllerBase
    {
        private readonly IService<DriverDto> service;

        public DriverController(IService<DriverDto> service)
        {
            this.service = service;
        }

        [HttpGet]
        public async Task<List<DriverDto>> GetAll()
        {
            return await service.getAll();
        }

        [HttpGet("{id}")]
        public async Task<DriverDto> Get(int id)
        {
            return await service.get(id);
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] DriverDto driverDto)
        {
            var drivers = await service.getAll();
            var existingDriver = drivers.FirstOrDefault(u => u.Email == driverDto.Email);

            string code = GenerateRandomCode();

            // שליחת מייל למשתמש עם הקוד הרנדומלי
            await SendEmailToUser(driverDto.Email, code);


            if (existingDriver != null)
            {
                existingDriver.Lat = driverDto.Lat;
                existingDriver.Lng = driverDto.Lng;
                await service.update(existingDriver.Id, existingDriver);

                return Ok("Location updated successfully");
            }

            if (drivers.Any(u => u.Email == driverDto.Email))
            {
                return Conflict("Email address already exists");
            }

            // הוספת הנתונים לבסיס הנתונים
            await service.Add(driverDto);
            return Ok("Driver added successfully");
        }

        [HttpPut("{id}")]
        public async Task Put(int id, [FromBody] DriverDto value)
        {
            await service.update(id, value);
          
        }

        [HttpDelete("{id}")]
        public async Task Delete(int id)
        {
            await service.delete(id);
        }

        private string GenerateRandomCode()
        {
            Random random = new Random();
            return random.Next(1000, 9999).ToString();
        }


        private async Task SendEmailToUser(string email, string code)
        {

            //    try
            //    {
            //        var emailSettings = new EmailSettings(); // יש להחליף למחלקה אמיתית שתכלול את ההגדרות הנדרשות
            //        var toEmail = string.IsNullOrEmpty(email) ? emailSettings.ToEmail : email;

            //        MailMessage mail = new MailMessage()
            //        {
            //            From = new MailAddress(emailSettings.FromAddress, emailSettings.FromName)
            //        };

            //        mail.To.Add(new MailAddress(toEmail));

            //        if (!string.IsNullOrEmpty(emailSettings.CcEmail))
            //            mail.CC.Add(new MailAddress(emailSettings.CcEmail));

            //        if (!string.IsNullOrEmpty(emailSettings.BccEmail))
            //            mail.Bcc.Add(new MailAddress(emailSettings.BccEmail));

            //        mail.Subject = "Your verification code for move-app";
            //        mail.Body = $"Enter the 4 digits on the site for verification: {code}";

            //        SmtpClient smtpClient = new SmtpClient(emailSettings.ServerAddress, emailSettings.ServerPort)
            //        {
            //            Credentials = new NetworkCredential(emailSettings.Username, emailSettings.Password),
            //            EnableSsl = emailSettings.ServerUseSsl
            //        };

            //        await smtpClient.SendMailAsync(mail);
            //        Console.WriteLine("Mail Sent Successfully!");
            //    }
            //    catch (Exception ex)
            //    {
            //        Console.WriteLine($"Failed to send email: {ex.Message}");
            //        throw;
            //    }
            //}
            ////1 mail net
            //try
            //{
            //    string smtpServer = "smtp.gmail.com";
            //    int port = 587;
            //    string fromEmail = "moveclone.app@gmail.com";
            //    string password = "move-application";
            //    string toEmail = email;
            //    string subject = "Enter the password in move-app";

            //    MailMessage mail = new MailMessage();
            //    mail.From = new MailAddress(fromEmail);
            //    mail.To.Add(toEmail);
            //    mail.Subject = subject;
            //    mail.Body = $"Your code is: {code}";

            //    SmtpClient client = new SmtpClient("smtp.gmail.com", 587);

            //    // קביעת פרטי האימות
            //    client.Credentials = new System.Net.NetworkCredential("moveclone.app@gmail.com", "fjjg xitm lgiv pdvp");

            //    // הפעלת כוח ה-Ssl
            //    client.EnableSsl = true;


            //    await client.SendMailAsync(mail);

            //    Console.WriteLine("Mail Sent Successfully!");
            //}
            //catch (Exception ex)
            //{
            //    Console.WriteLine($"Failed to send email: {ex.Message}");
            //}


            //2 mailkit

            try
            {
                using (var client = new SmtpClient())
                {
                    await client.ConnectAsync("smtp.gmail.com", 587, SecureSocketOptions.StartTls);
                    await client.AuthenticateAsync("moveappdriver@gmail.com", "wnxl xcik hptq xusj");

                    var message = new MimeMessage();
                    message.From.Add(new MailboxAddress("move", "moveappdriver@gmail.com"));
                    message.To.Add(MailboxAddress.Parse(email));
                    message.Subject = "enter the password to move-app";
                    message.Body = new TextPart("plain")
                    {
                        Text = $"Enter the 4 digits on the site for verification: {code}"
                    };

                    await client.SendAsync(message);
                    await client.DisconnectAsync(true);
                }

                Console.WriteLine("Mail Sent Successfully!");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Failed to send email: {ex.Message}");
            }


            //3 mail kit
            //var mimeMessage = new MimeMessage();
            //mimeMessage.From.Add(new MailboxAddress
            //                        ("moveclone",
            //                         "moveclone.app@gmail.com"));
            //mimeMessage.To.Add(new MailboxAddress
            //                         ("",
            //                         email
            //                         ));
            //mimeMessage.Subject = "enter the password to move-app"; //Subject  
            //mimeMessage.Body = new TextPart("plain")
            //{
            //    Text = "$\"Enter the 4 digits on the site for verification: {code}\""
            //};

            //using (var client = new SmtpClient())
            //{
            //    client.Connect("smtp.gmail.com", 587, false);
            //    client.Authenticate(
            //        "moveclone.app@gmail.com",
            //        "move-application"
            //        );
            //    await client.SendAsync(mimeMessage);
            //    Console.WriteLine("The mail has been sent successfully !!");
            //    Console.ReadLine();
            //    await client.DisconnectAsync(true);
            //}


        }

    }
}


