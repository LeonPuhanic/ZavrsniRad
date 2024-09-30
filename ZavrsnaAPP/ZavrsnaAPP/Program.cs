using Microsoft.EntityFrameworkCore;
using ZavrsnaAPP.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder
            .WithOrigins("*")
            .AllowAnyHeader()
            .AllowAnyMethod());
});



// baza podataka SQL
builder.Services.AddDbContext<ZavrsnaContext>(
    opcije =>
    {
        opcije.UseSqlServer(builder.Configuration.GetConnectionString("ZavrsnaContext"));
    }
    );

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(opcije =>
    {
        opcije.ConfigObject.AdditionalItems.Add("requestSnippetsEnabled", true);
    });
}



app.UseHttpsRedirection();
app.UseCors("AllowSpecificOrigin");
app.UseAuthorization();

app.MapControllers();

app.UseStaticFiles();
app.UseDefaultFiles();
app.MapFallbackToFile("index.html");

app.Run();
