namespace CPW_PllDB.Configuration;

internal sealed class CaseServiceTypeEntityConfiguration : IEntityTypeConfiguration<CaseServiceTypeEntity>
{
    public void Configure(EntityTypeBuilder<CaseServiceTypeEntity> builder)
    {
        builder.HasKey(st => st.ID);
        builder.Property(st => st.ServiceType).HasMaxLength(1);
        builder.HasOne<CaseEntity>()
            .WithMany()
            .HasForeignKey(st => st.CaseID)
            .OnDelete(DeleteBehavior.Restrict);
        builder.ToTable("CaseServiceTypes");
    }
}
