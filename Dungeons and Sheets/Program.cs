using backend.Controller.User;
using backend.Database;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews().AddNewtonsoftJson();
builder.WebHost.UseUrls("0.0.0.0:5000");
builder.Services.AddEndpointsApiExplorer();
var serverVersion = new MySqlServerVersion(new Version(8, 0, 30));
builder.Services.AddDbContext<DnD5eContext>(options => options.UseMySql(builder.Configuration.GetConnectionString("string"), serverVersion));
builder.Configuration.AddJsonFile("appsettings.json");
builder.Services.AddTransient<UserService>();

var app = builder.Build();



// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.MapControllerRoute(
    name: "default",
    pattern: "api/{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();
