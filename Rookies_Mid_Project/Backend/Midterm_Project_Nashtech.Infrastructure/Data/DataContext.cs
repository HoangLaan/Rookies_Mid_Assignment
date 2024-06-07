using Microsoft.EntityFrameworkCore;
using Midterm_Project_Nashtech.Domain.Entities;


namespace Midterm_Project_Nashtech.Infrastructure.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) {
        
        }
        public DbSet<User> User { get; set; }
        public DbSet<Category> Category { get; set; }
        public DbSet<BorrowingRequest> BorrowingRequest { get; set; }
        public DbSet<BorrowingRequestDetails> RequestsDetails { get; set; }
        public DbSet<Book> Book { get; set;}
        public DbSet<BookCategories> BookCategories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            //Relative 1-n
            modelBuilder.Entity<BorrowingRequest>()
                .HasOne(e => e.Requestor)
                .WithMany(e => e.BorrowingRequests)
                .HasForeignKey(e => e.RequestorId)
                .IsRequired();

            //Relative 1-n
            modelBuilder.Entity<BorrowingRequest>()
                .HasMany(e => e.RequestDetails)
                .WithOne(e => e.BorrowingRequest)
                .HasForeignKey(e => e.RequestId)
                .IsRequired();

            //Relative 1-n
            modelBuilder.Entity<Book>()
                .HasMany(e => e.RequestsDetails)
                .WithOne(e => e.Book)
                .HasForeignKey(e => e.BookId)
                .IsRequired();

            //Relative n-n
            modelBuilder.Entity<BookCategories>()
                .HasKey(bc => new { bc.BookId, bc.CategoryId });
            modelBuilder.Entity<BookCategories>()
                .HasOne(e => e.Book)
                .WithMany(e => e.BookCategories)
                .HasForeignKey(e => e.BookId);
            modelBuilder.Entity<BookCategories>()
                .HasOne(e => e.Category)
                .WithMany(e => e.BookCategories)
                .HasForeignKey(e => e.CategoryId);
        }

    }
}
