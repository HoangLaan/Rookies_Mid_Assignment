
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Midterm_Project_Nashtech.Infrastructure.Data;
using Midterm_Project_Nashtech.Infrastructure.Interfaces;
using Midterm_Project_Nashtech.Infrastructure.IRepositories;
using Midterm_Project_Nashtech.Infrastructure.Repositories;
using Midterm_Project_Nashtech.Web.Services;
using Swashbuckle.AspNetCore.Filters;
using System.Text;

namespace Midterm_Project_Nashtech
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            builder.Services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));
            builder.Services.AddScoped<IBookService, BookService>();
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<IBorrowBookService, BorrowBookService>();
            builder.Services.AddScoped<ICategoryService, CategoryService>();

            var configuration = builder.Services.BuildServiceProvider().GetRequiredService<IConfiguration>();

            builder.Services.AddCors(options =>
            {
                var URL = configuration.GetValue<string>("frontend_url");
                options.AddPolicy("AllowLocalhost3000",
                    builder =>
                    {
                        builder.WithOrigins(URL)
                               .AllowAnyHeader()
                               .AllowAnyMethod();
                    });
            });

            builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(options =>
            {
                options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey
                });

                options.OperationFilter<SecurityRequirementsOperationFilter>();
            });

            builder.Services.AddDbContext<DataContext>(
                options => options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"),
                b => b.MigrationsAssembly("Midterm_Project_Nashtech.Infrastructure").MigrationsHistoryTable("__EFMigrationsHistory", "Data")));

            builder.Services.AddAuthentication().AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    ValidateAudience = false,
                    ValidateIssuer = false,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(
                        builder.Configuration.GetSection("Jwt:Token").Value!))
                };
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors("AllowLocalhost3000");

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
