namespace CPW_PllDB.Configuration;

internal sealed class CasePersonEntityConfiguration : IEntityTypeConfiguration<CasePersonEntity>
{
    public void Configure(EntityTypeBuilder<CasePersonEntity> builder)
    {
        builder.HasKey(p => p.ID);
        builder.HasOne<CaseEntity>()
            .WithMany()
            .HasForeignKey(p => p.CaseID)
            .OnDelete(DeleteBehavior.Restrict);
        builder.HasOne<PersonEntity>()
            .WithMany()
            .HasForeignKey(p => p.PersonID)
            .OnDelete(DeleteBehavior.Restrict);
        builder.ToTable("CasePersons");
    }
}
