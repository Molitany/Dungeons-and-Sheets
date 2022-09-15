using backend.Controller.User;
using backend.Database;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllersWithViews().AddNewtonsoftJson();
builder.WebHost.UseUrls("https://*:5000", "http://*:5001");
builder.Services.AddEndpointsApiExplorer();
var serverVersion = new MySqlServerVersion(new Version(8, 0, 30));
builder.Services.AddDbContext<DatabaseContext>(options => options.UseMySql(builder.Configuration.GetConnectionString("string"), serverVersion));
builder.Configuration.AddJsonFile("appsettings.json");
builder.Services.AddTransient<UserService>();

var app = builder.Build();

ApplyPendingMigrations(app.Services);


// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();


app.UseSpa(spa =>
{
    spa.Options.SourcePath = "ClientApp";

    if (app.Environment.IsDevelopment())
    {
        spa.UseReactDevelopmentServer("start");
    }
});

app.MapControllerRoute(
    name: "default",
    pattern: "api/{controller}/{action=Index}/{id?}");

app.MapFallbackToFile("index.html"); ;

app.Run();

async void ApplyPendingMigrations(IServiceProvider services)
{
    var scope = services.CreateScope();
    var _context = scope.ServiceProvider.GetRequiredService<DatabaseContext>();
    var pendingMigrations = await _context.Database.GetPendingMigrationsAsync();
    if (pendingMigrations.Count() > 0)
    {
        await _context.Database.MigrateAsync();
    }
}