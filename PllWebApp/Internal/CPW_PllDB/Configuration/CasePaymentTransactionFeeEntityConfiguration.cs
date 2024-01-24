namespace CPW_PllDB.Configuration;

internal sealed class CasePaymentTransactionFeeEntityConfiguration : IEntityTypeConfiguration<CasePaymentTransactionFeeEntity>
{
    public void Configure(EntityTypeBuilder<CasePaymentTransactionFeeEntity> builder)
    {
        builder.HasKey(p => p.ID);
        builder.Property(p => p.FeeAmount).HasPrecision(22, 4);
        builder.Property(p => p.AmountPaid).HasPrecision(22, 4);
        builder.HasOne<CasePaymentTransactionEntity>()
            .WithMany()
            .HasForeignKey(p => p.TransactionID)
            .OnDelete(DeleteBehavior.Restrict);
        builder.ToTable("CasePaymentTransactionFees");
    }
}
