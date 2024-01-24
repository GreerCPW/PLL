namespace CPW_PllDB.Configuration;

internal sealed class PersonEntityConfiguration : IEntityTypeConfiguration<PersonEntity>
{
    public void Configure(EntityTypeBuilder<PersonEntity> builder)
    {
        builder.HasKey(p => p.ID);
        builder.Property(p => p.PersonKey).HasMaxLength(60);
        builder.Property(p => p.PersonName).HasMaxLength(60);
        builder.Property(p => p.CellPhone).HasMaxLength(15);
        builder.Property(p => p.Email).HasMaxLength(256);
        builder.ToTable("Persons");
    }
}
