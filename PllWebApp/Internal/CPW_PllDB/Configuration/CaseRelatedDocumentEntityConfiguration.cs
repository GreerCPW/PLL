namespace CPW_PllDB.Configuration;

internal sealed class CaseRelatedDocumentEntityConfiguration : IEntityTypeConfiguration<CaseRelatedDocumentEntity>
{
    public void Configure(EntityTypeBuilder<CaseRelatedDocumentEntity> builder)
    {
        builder.HasKey(d => d.ID);
        builder.Property(d => d.TempFilePath).HasMaxLength(5000);
        builder.Property(d => d.FileName).HasMaxLength(256);
        builder.HasOne<CaseEntity>()
            .WithMany()
            .HasForeignKey(d => d.CaseID)
            .OnDelete(DeleteBehavior.Restrict);
        builder.ToTable("CaseRelatedDocuments");
    }
}
