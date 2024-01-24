using CPW_PaymentEvents;
using Microsoft.Extensions.DependencyInjection;
using NUnit.Framework;
using XTI_App.Abstractions;
using XTI_Jobs;
using XTI_Jobs.Abstractions;

namespace PllServiceAppTests;

internal sealed class HandlePaymentReceivedTest
{
    [Test]
    public async Task ShouldCompleteJob()
    {
        var tester = await Setup();
        var pllService = tester.Services.GetRequiredService<FakePllService>();
        var transactionDetail = pllService.AddTransaction(100M);
        var eventNotification = await NotifyPaymentReceived
        (
            tester,
            new PaymentReceivedEventData
            {
                AccountNumber = "PLL0001",
                PaymentAmount = 100,
                PayGoTransactionID = "P1",
                CustomFields = new[]
                {
                    transactionDetail.Transaction.ID.ToString(),
                    "PLL"
                }
            }
        );
        await tester.Execute(new EmptyRequest());
        var triggeredJobs = await eventNotification.TriggeredJobs();
        Assert.That
        (
            triggeredJobs.Select(tj => tj.Status()).ToArray(),
            Is.EqualTo(new[] { JobTaskStatus.Values.Completed }),
            "Should complete handle payment received"
        );
    }

    [Test]
    public async Task ShouldReceivePayment()
    {
        var tester = await Setup();
        var pllService = tester.Services.GetRequiredService<FakePllService>();
        var transactionDetail = pllService.AddTransaction(50M);
        await NotifyPaymentReceived
        (
            tester,
            new PaymentReceivedEventData
            {
                AccountNumber = "PLL0001",
                PaymentAmount = 50,
                PayGoTransactionID = "P1",
                CustomFields = new[]
                {
                    transactionDetail.Transaction.ID.ToString(),
                    "PLL"
                }
            }
        );
        await tester.Execute(new EmptyRequest());
        var updatedTransaction = pllService.GetTransaction(transactionDetail);
        Assert.That(updatedTransaction.Transaction.AmountReceived, Is.EqualTo(50M), "Should receive payment");
        Assert.That(updatedTransaction.Transaction.GatewayID, Is.EqualTo("P1"), "Should receive payment");
    }

    [Test]
    public async Task ShouldAddCasePayment()
    {
        var tester = await Setup();
        var pllService = tester.Services.GetRequiredService<FakePllService>();
        var transactionDetail = pllService.AddTransaction(50M);
        await NotifyPaymentReceived
        (
            tester,
            new PaymentReceivedEventData
            {
                AccountNumber = "PLL0001",
                PaymentAmount = 50,
                PayGoTransactionID = "P1",
                CustomFields = new[]
                {
                    transactionDetail.Transaction.ID.ToString(),
                    "PLL"
                }
            }
        );
        await tester.Execute(new EmptyRequest());
        var cwService = tester.Services.GetRequiredService<FakeCityworksService>();
        var payments = cwService.GetPayments();
        Assert.That(payments.Length, Is.EqualTo(1), "Should add payment");
        Assert.That(payments[0].PaymentAmount, Is.EqualTo(50M), "Should add payment");
    }

    [Test]
    public async Task ShouldSetTenderTypeToCreditCard()
    {
        var tester = await Setup();
        var pllService = tester.Services.GetRequiredService<FakePllService>();
        var transactionDetail = pllService.AddTransaction(50M);
        await NotifyPaymentReceived
        (
            tester,
            new PaymentReceivedEventData
            {
                AccountNumber = "PLL0001",
                PaymentAmount = 50,
                PayGoTransactionID = "P1",
                TypeOfPayment = 2,
                CustomFields = new[]
                {
                    transactionDetail.Transaction.ID.ToString(),
                    "PLL"
                }
            }
        );
        await tester.Execute(new EmptyRequest());
        var cwService = tester.Services.GetRequiredService<FakeCityworksService>();
        var payments = cwService.GetPayments();
        Assert.That(payments[0].TenderType, Is.EqualTo("Credit Card"), "Should set tender type to credit card");
    }

    [Test]
    public async Task ShouldSetTenderTypeToCheck()
    {
        var tester = await Setup();
        var pllService = tester.Services.GetRequiredService<FakePllService>();
        var transactionDetail = pllService.AddTransaction(50M);
        await NotifyPaymentReceived
        (
            tester,
            new PaymentReceivedEventData
            {
                AccountNumber = "PLL0001",
                PaymentAmount = 50,
                PayGoTransactionID = "P1",
                TypeOfPayment = 1,
                CustomFields = new[]
                {
                    transactionDetail.Transaction.ID.ToString(),
                    "PLL"
                }
            }
        );
        await tester.Execute(new EmptyRequest());
        var cwService = tester.Services.GetRequiredService<FakeCityworksService>();
        var payments = cwService.GetPayments();
        Assert.That(payments[0].TenderType, Is.EqualTo("Check"), "Should set tender type to check");
    }

    [Test]
    public async Task FeeAmountPaidShouldNotExceedFeeAmount()
    {
        var tester = await Setup();
        var pllService = tester.Services.GetRequiredService<FakePllService>();
        var transactionDetail = pllService.AddTransaction(20M, 25M, 5M);
        await NotifyPaymentReceived
        (
            tester,
            new PaymentReceivedEventData
            {
                AccountNumber = "PLL0001",
                PaymentAmount = 50,
                PayGoTransactionID = "P1",
                CustomFields = new[]
                {
                    transactionDetail.Transaction.ID.ToString(),
                    "PLL"
                }
            }
        );
        await tester.Execute(new EmptyRequest());
        var cwService = tester.Services.GetRequiredService<FakeCityworksService>();
        var payments = cwService.GetPayments();
        Assert.That
        (
            payments.Select(p => new { p.CaseFeeID, Amount = p.PaymentAmount }),
            Is.EquivalentTo(transactionDetail.Fees.Select(f => new { CaseFeeID = f.CityworksFeeID, Amount = f.FeeAmount }))
        );
    }

    [Test]
    public async Task FeeAmountPaidShouldNotExceedAmountReceived()
    {
        var tester = await Setup();
        var pllService = tester.Services.GetRequiredService<FakePllService>();
        var transactionDetail = pllService.AddTransaction(20M, 25M, 5M);
        await NotifyPaymentReceived
        (
            tester,
            new PaymentReceivedEventData
            {
                AccountNumber = "PLL0001",
                PaymentAmount = 45,
                PayGoTransactionID = "P1",
                CustomFields = new[]
                {
                    transactionDetail.Transaction.ID.ToString(),
                    "PLL"
                }
            }
        );
        await tester.Execute(new EmptyRequest());
        var cwService = tester.Services.GetRequiredService<FakeCityworksService>();
        var payments = cwService.GetPayments();
        Assert.That
        (
            payments.Select(p => new { p.CaseFeeID, Amount = p.PaymentAmount }),
            Is.EquivalentTo(transactionDetail.Fees.Select(f => new { CaseFeeID = f.CityworksFeeID, Amount = f.FeeAmount }).Take(2))
        );
    }

    [Test]
    public async Task ShouldPayPartialAmount_WhenFeeAmountsExceedAmountReceived()
    {
        var tester = await Setup();
        var pllService = tester.Services.GetRequiredService<FakePllService>();
        var transactionDetail = pllService.AddTransaction(20M, 25M, 5M);
        await NotifyPaymentReceived
        (
            tester,
            new PaymentReceivedEventData
            {
                AccountNumber = "PLL0001",
                PaymentAmount = 39,
                PayGoTransactionID = "P1",
                CustomFields = new[]
                {
                    transactionDetail.Transaction.ID.ToString(),
                    "PLL"
                }
            }
        );
        await tester.Execute(new EmptyRequest());
        var cwService = tester.Services.GetRequiredService<FakeCityworksService>();
        var payments = cwService.GetPayments();
        Assert.That(payments.Select(p => p.PaymentAmount), Is.EqualTo(new[] { 20M, 19M }));
    }

    [Test]
    public async Task ShouldApplyPayment()
    {
        var tester = await Setup();
        var pllService = tester.Services.GetRequiredService<FakePllService>();
        var transactionDetail = pllService.AddTransaction(50M);
        await NotifyPaymentReceived
        (
            tester,
            new PaymentReceivedEventData
            {
                AccountNumber = "PLL0001",
                PaymentAmount = 50,
                PayGoTransactionID = "P1",
                CustomFields = new[]
                {
                    transactionDetail.Transaction.ID.ToString(),
                    "PLL"
                }
            }
        );
        await tester.Execute(new EmptyRequest());
        var cwService = tester.Services.GetRequiredService<FakeCityworksService>();
        var payments = cwService.GetPayments();
        var updateTransactionDetail = pllService.GetTransaction(transactionDetail);
        Assert.That(updateTransactionDetail.Fees[0].AmountPaid, Is.EqualTo(50M), "Should apply payment");
        Assert.That(updateTransactionDetail.Fees[0].CityworksPaymentID, Is.EqualTo(payments[0].ID), "Should apply payment");
    }

    [Test]
    public async Task ShouldApplyMultiplePayments()
    {
        var tester = await Setup();
        var pllService = tester.Services.GetRequiredService<FakePllService>();
        var transactionDetail = pllService.AddTransaction(20M, 25M, 5M);
        await NotifyPaymentReceived
        (
            tester,
            new PaymentReceivedEventData
            {
                AccountNumber = "PLL0001",
                PaymentAmount = 50,
                PayGoTransactionID = "P1",
                CustomFields = new[]
                {
                    transactionDetail.Transaction.ID.ToString(),
                    "PLL"
                }
            }
        );
        await tester.Execute(new EmptyRequest());
        var cwService = tester.Services.GetRequiredService<FakeCityworksService>();
        var payments = cwService.GetPayments();
        var updateTransactionDetail = pllService.GetTransaction(transactionDetail);
        Assert.That
        (
            updateTransactionDetail.Fees.Select(f => new { f.CityworksPaymentID, f.AmountPaid }),
            Is.EqualTo(payments.Select(p => new { CityworksPaymentID = p.ID, AmountPaid = p.PaymentAmount })),
            "Should apply multiple payments"
        );
    }

    private async Task<PllActionTester<EmptyRequest, EmptyActionResult>> Setup(string envName = "Development")
    {
        var host = new PllTestHost();
        var services = await host.Setup(envName);
        return PllActionTester.Create(services, api => api.PaymentReceived.HandlePaymentReceived);
    }

    private async Task<EventNotification> NotifyPaymentReceived(IPllActionTester tester, PaymentReceivedEventData data)
    {
        var incomingEventFactory = tester.Services.GetRequiredService<IncomingEventFactory>();
        var eventNotifications = await incomingEventFactory
            .Incoming(PaymentEvents.PllPaymentReceived)
            .From(data.ToEventSource())
            .Notify();
        return eventNotifications.First();
    }
}