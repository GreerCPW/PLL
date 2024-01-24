namespace CPW_PllDB.Configuration;

internal sealed class CaseEntityConfiguration : IEntityTypeConfiguration<CaseEntity>
{
    public void Configure(EntityTypeBuilder<CaseEntity> builder)
    {
        builder.HasKey(c => c.ID);
        builder.Property(c => c.Location).HasMaxLength(100);
        builder.Property(c => c.Description).HasMaxLength(40);
        builder.Property(c => c.X).HasPrecision(17, 8);
        builder.Property(c => c.Y).HasPrecision(17, 8);
        builder.ToTable("Cases");
    }
}
