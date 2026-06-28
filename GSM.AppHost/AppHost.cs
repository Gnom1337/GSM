var builder = DistributedApplication.CreateBuilder(args);

var api = builder.AddProject<Projects.GSM_API>("gsm-api");

builder.AddViteApp("GSM-Web", "../gsm.web", "dev")
   .WithHttpsEndpoint()
   .WithReference(api)
   .WaitFor(api);
builder.Build().Run();
