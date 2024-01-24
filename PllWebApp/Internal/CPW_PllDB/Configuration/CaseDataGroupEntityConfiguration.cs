namespace CPW_PllDB.Configuration;

internal sealed class CaseDataGroupEntityConfiguration : IEntityTypeConfiguration<CaseDataGroupEntity>
{
    public void Configure(EntityTypeBuilder<CaseDataGroupEntity> builder)
    {
        builder.HasKey(dg => dg.ID);
        builder.Property(dg => dg.ServiceType).HasMaxLength(1);
        builder.HasOne<CaseEntity>()
            .WithMany()
            .HasForeignKey(dg => dg.CaseID)
            .OnDelete(DeleteBehavior.Restrict);
        builder.ToTable("CaseDataGroups");
    }
}
