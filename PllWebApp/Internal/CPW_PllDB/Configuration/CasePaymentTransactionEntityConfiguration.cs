namespace CPW_PllDB.Configuration;

internal sealed class CasePaymentTransactionEntityConfiguration : IEntityTypeConfiguration<CasePaymentTransactionEntity>
{
    public void Configure(EntityTypeBuilder<CasePaymentTransactionEntity> builder)
    {
        builder.HasKey(p => p.ID);
        builder.Property(p => p.AmountReceived).HasPrecision(22, 4);
        builder.HasIndex(p => p.TransactionKey).IsUnique();
        builder.Property(p => p.TransactionKey).HasMaxLength(100);
        builder.Property(p => p.GatewayID).HasMaxLength(500);
        builder.HasOne<CaseEntity>()
            .WithMany()
            .HasForeignKey(p => p.CaseID)
            .OnDelete(DeleteBehavior.Restrict);
        builder.ToTable("CasePaymentTransactions");
    }
}
