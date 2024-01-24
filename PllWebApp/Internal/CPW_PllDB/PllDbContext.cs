using CPW_PllDB.Configuration;
using XTI_Core;
using XTI_Core.EF;

namespace CPW_PllDB;

public sealed class PllDbContext : DbContext
{
    private readonly UnitOfWork unitOfWork;

    public PllDbContext(DbContextOptions<PllDbContext> options) : base(options)
    {
        unitOfWork = new UnitOfWork(this);
        Cases = new EfDataRepository<CaseEntity>(this);
        CaseDataGroups = new EfDataRepository<CaseDataGroupEntity>(this);
        CaseDataGroupDetails = new EfDataRepository<CaseDataGroupDetailEntity>(this);
        CasePersons = new EfDataRepository<CasePersonEntity>(this);
        Persons = new EfDataRepository<PersonEntity>(this);
        CaseRelatedDocuments = new EfDataRepository<CaseRelatedDocumentEntity>(this);
        CaseServiceTypes = new EfDataRepository<CaseServiceTypeEntity>(this);
        CasePaymentTransactions = new EfDataRepository<CasePaymentTransactionEntity>(this);
        CasePaymentTransactionFees = new EfDataRepository<CasePaymentTransactionFeeEntity>(this);
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        modelBuilder.ApplyConfiguration(new CaseEntityConfiguration());
        modelBuilder.ApplyConfiguration(new CaseDataGroupEntityConfiguration());
        modelBuilder.ApplyConfiguration(new CaseDataGroupDetailEntityConfiguration());
        modelBuilder.ApplyConfiguration(new CasePersonEntityConfiguration());
        modelBuilder.ApplyConfiguration(new PersonEntityConfiguration());
        modelBuilder.ApplyConfiguration(new CaseRelatedDocumentEntityConfiguration());
        modelBuilder.ApplyConfiguration(new CaseServiceTypeEntityConfiguration());
        modelBuilder.ApplyConfiguration(new CasePaymentTransactionEntityConfiguration());
        modelBuilder.ApplyConfiguration(new CasePaymentTransactionFeeEntityConfiguration());
    }

    public DataRepository<CaseEntity> Cases { get; }
    public DataRepository<CaseDataGroupEntity> CaseDataGroups { get; }
    public DataRepository<CaseDataGroupDetailEntity> CaseDataGroupDetails { get; }
    public DataRepository<CasePersonEntity> CasePersons { get; }
    public DataRepository<PersonEntity> Persons { get; }
    public DataRepository<CaseRelatedDocumentEntity> CaseRelatedDocuments { get; }
    public DataRepository<CaseServiceTypeEntity> CaseServiceTypes { get; }
    public DataRepository<CasePaymentTransactionEntity> CasePaymentTransactions { get; }
    public DataRepository<CasePaymentTransactionFeeEntity> CasePaymentTransactionFees { get; }

    public Task Transaction(Func<Task> action) => unitOfWork.Execute(action);

    public Task<T> Transaction<T>(Func<Task<T>> action) => unitOfWork.Execute(action);
}
