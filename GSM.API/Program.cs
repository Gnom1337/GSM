using GSM.Application.Handlers.DailyBalanceHandlers;
using GSM.Application.Handlers.DispatchHandlers;
using GSM.Application.Handlers.ProductHandlers;
using GSM.Application.Handlers.TankHandlers;
using GSM.Application.Handlers.TankMeasurmentHandlers;
using GSM.Application.Handlers.WagonReceiptHandlers;
using GSM.Application.Queries;
using GSM.Application.Queries.DailyBalanceQueries;
using GSM.Application.Queries.DispatchQueries;
using GSM.Application.Queries.ProductQueries;
using GSM.Application.Queries.TankMeasurmentQueries;
using GSM.Application.Queries.TankQueries;
using GSM.Application.Queries.WagonReceiptQueries;
using GSM.Application.Responses;
using GSM.Domain.Interfaces;
using GSM.Domain.Models;
using GSM.Infrastructure.Data;
using GSM.Infrastructure.Repository;
using MediatR;
using Microsoft.AspNetCore.CookiePolicy;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddSwaggerGen();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(StartupBase).Assembly));
builder.Services.AddDbContext<ApplicationDbContext>();
builder.Services.AddAuthorization();
//Tank
builder.Services.AddScoped<IRepositoryBase<Tank>, RepositoryBase<Tank>>();
builder.Services.AddTransient<IRequestHandler<AddTankQuerie, BaseResponse<Tank>>, AddTankQuerieHandler>();
builder.Services.AddTransient<IRequestHandler<GetAllTanksQuerie, List<Tank>>, GetAllTanksQuerieHandler>();
builder.Services.AddTransient<IRequestHandler<BaseDeleteQuerie<Tank>, BaseDeleteResponse>, DeleteTankQuerieHandler>();
builder.Services.AddTransient<IRequestHandler<UpdateTankQuerie, BaseResponse<Tank>>, UpdateTankQuerieHandler>();
builder.Services.AddTransient<IRequestHandler<BaseGetByIdQuerie<Tank>, BaseGetByIdResponse<Tank>>, GetTankByIdQuerieHandler>();
//Product
builder.Services.AddScoped<IRepositoryBase<Product>, RepositoryBase<Product>>();
builder.Services.AddTransient<IRequestHandler<AddProductQuerie, BaseResponse<Product>>, AddProductQuerieHandler>();
builder.Services.AddTransient<IRequestHandler<GetAllProductsQuerie, List<Product>>, GetAllProductsQuerieHandler>();
builder.Services.AddTransient<IRequestHandler<BaseDeleteQuerie<Product>, BaseDeleteResponse>, DeleteProductQuerieHandler>();
builder.Services.AddTransient<IRequestHandler<UpdateProductQuerie, BaseResponse<Product>>, UpdateProductQuerieHandler>();
builder.Services.AddTransient<IRequestHandler<BaseGetByIdQuerie<Product>, BaseGetByIdResponse<Product>>, GetProductByIdQuerieHandler>();

//Dispatch
builder.Services.AddScoped<IRepositoryBase<Dispatch>, RepositoryBase<Dispatch>>();
builder.Services.AddTransient<IRequestHandler<AddDispatchQuerie, BaseResponse<Dispatch>>, AddDispatchQuerieHandler>();
builder.Services.AddTransient<IRequestHandler<GetAllDispatchesQuerie, List<Dispatch>>, GetAllDispatchesQuerieHandler>();
builder.Services.AddTransient<IRequestHandler<BaseDeleteQuerie<Dispatch>, BaseDeleteResponse>, DeleteDispatchQuerieHandler>();
builder.Services.AddTransient<IRequestHandler<UpdateDispatchQuerie, BaseResponse<Dispatch>>, UpdateDispatchQuerieHandler>();
builder.Services.AddTransient<IRequestHandler<BaseGetByIdQuerie<Dispatch>, BaseGetByIdResponse<Dispatch>>, GetDispatchByIdQuerieHandler>();

//DailyBalance
builder.Services.AddScoped<IRepositoryBase<DailyBalance>, RepositoryBase<DailyBalance>>();
builder.Services.AddTransient<IRequestHandler<AddDailyBalanceQuerie, BaseResponse<DailyBalance>>, AddDailyBalanceQuerieHandler>();
builder.Services.AddTransient<IRequestHandler<GetAllDailyBalancesQuerie, List<DailyBalance>>, GetAllDailyBalancesQuerieHandler>();
builder.Services.AddTransient<IRequestHandler<BaseDeleteQuerie<DailyBalance>, BaseDeleteResponse>, DeleteDailyBalanceQuerieHandler>();
builder.Services.AddTransient<IRequestHandler<UpdateDailyBalanceQuerie, BaseResponse<DailyBalance>>, UpdateDailyBalanceQuerieHandler>();
builder.Services.AddTransient<IRequestHandler<BaseGetByIdQuerie<DailyBalance>, BaseGetByIdResponse<DailyBalance>>, GetDailyBalanceByIdQuerieHandler>();


//TankMeasurment
builder.Services.AddScoped<IRepositoryBase<TankMeasurement>, RepositoryBase<TankMeasurement>>();
builder.Services.AddTransient<IRequestHandler<AddTankMeasurmentQuerie, BaseResponse<TankMeasurement>>, AddTankMeasurmentQuerieHandler>();
builder.Services.AddTransient<IRequestHandler<GetAllTankMeasurmentsQuerie, List<TankMeasurement>>, GetAllTankMeasurmentsQuerieHandler>();
builder.Services.AddTransient<IRequestHandler<BaseDeleteQuerie<TankMeasurement>, BaseDeleteResponse>, DeleteTankMeasurmentQuerieHandler>();
builder.Services.AddTransient<IRequestHandler<UpdateTankMeasurmentQuerie, BaseResponse<TankMeasurement>>, UpdateTankMeasurmentQuerieHandler>();
builder.Services.AddTransient<IRequestHandler<BaseGetByIdQuerie<TankMeasurement>, BaseGetByIdResponse<TankMeasurement>>, GetTankMeasurmentByIdQuerieHandler>();


//WagonReceipt
builder.Services.AddScoped<IRepositoryBase<WagonReceipt>, RepositoryBase<WagonReceipt>>();
builder.Services.AddTransient<IRequestHandler<AddWagonReceiptQuerie, BaseResponse<WagonReceipt>>, AddWagonReceiptQuerieHandler>();
builder.Services.AddTransient<IRequestHandler<GetAllWagonReceiptsQuerie, List<WagonReceipt>>, GetAllWagonReceiptsQuerieHandler>();
builder.Services.AddTransient<IRequestHandler<BaseDeleteQuerie<WagonReceipt>, BaseDeleteResponse>, DeleteWagonReceiptQuerieHandler>();
builder.Services.AddTransient<IRequestHandler<UpdateWagonReceiptQuerie, BaseResponse<WagonReceipt>>, UpdateWagonReceiptQuerieHandler>();
builder.Services.AddTransient<IRequestHandler<BaseGetByIdQuerie<WagonReceipt>, BaseGetByIdResponse<WagonReceipt>>, GetWagonReceiptByIdQuerieHandler>();

builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCookiePolicy(new CookiePolicyOptions
{
    MinimumSameSitePolicy = SameSiteMode.Strict,
    HttpOnly = HttpOnlyPolicy.Always,
    Secure = CookieSecurePolicy.Always
});
app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true) // Allow requests from any origin
    .AllowCredentials());
app.MapControllers();

app.Run();
