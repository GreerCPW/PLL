namespace CPW_PllDB.Configuration;

internal sealed class CaseDataGroupDetailEntityConfiguration : IEntityTypeConfiguration<CaseDataGroupDetailEntity>
{
    public void Configure(EntityTypeBuilder<CaseDataGroupDetailEntity> builder)
    {
        builder.HasKey(d => d.ID);
        builder.Property(d => d.Value).HasMaxLength(2000);
        builder.HasOne<CaseDataGroupEntity>()
            .WithMany()
            .HasForeignKey(d => d.DataGroupID)
            .OnDelete(DeleteBehavior.Restrict);
        builder.ToTable("CaseDataGroupDetails");
    }
}
