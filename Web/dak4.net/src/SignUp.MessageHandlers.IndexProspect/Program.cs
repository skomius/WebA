﻿using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SignUp.Core;
using SignUp.MessageHandlers.IndexProspect.Indexer;
using SignUp.MessageHandlers.IndexProspect.Workers;

namespace SignUp.MessageHandlers.IndexProspect
{
    class Program
    {
        static void Main(string[] args)
        {
            var serviceProvider = new ServiceCollection()
                .AddSingleton(Config.Current)
                .AddSingleton<Index>()
                .AddSingleton<QueueWorker>()
                .BuildServiceProvider();

            var worker = serviceProvider.GetService<QueueWorker>();
            worker.Start();
        }
    }
}
