﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using backend.Database;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(Database.DatabaseContext))]
    [Migration("20220910104152_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.8")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("backend.Model.Character", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("Age")
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("EyeColor")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("HairColor")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Height")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Image")
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<int>("PlayerId")
                        .HasColumnType("int");

                    b.Property<string>("Sex")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("SkinColor")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Weight")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.HasIndex("PlayerId");

                    b.ToTable("Characters");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Age = 32,
                            Description = "A knight from the Southlands, searching for love and glory in a faraway land.",
                            EyeColor = "Green",
                            HairColor = "Brown",
                            Height = "180cm",
                            Image = "notimplemented",
                            Name = "Bobby King",
                            PlayerId = 1,
                            Sex = "Male",
                            SkinColor = "Black",
                            Weight = "78kg"
                        });
                });

            modelBuilder.Entity("backend.Model.Player", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Players");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "TrulyTest",
                            Password = "password"
                        });
                });

            modelBuilder.Entity("backend.Model.TTRPGSystem", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<int>("CharacterId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CharacterId");

                    b.ToTable("Systems");
                });

            modelBuilder.Entity("backend.Model.Character", b =>
                {
                    b.HasOne("backend.Model.Player", "Player")
                        .WithMany("Characters")
                        .HasForeignKey("PlayerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Player");
                });

            modelBuilder.Entity("backend.Model.TTRPGSystem", b =>
                {
                    b.HasOne("backend.Model.Character", "Character")
                        .WithMany()
                        .HasForeignKey("CharacterId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Character");
                });

            modelBuilder.Entity("backend.Model.Player", b =>
                {
                    b.Navigation("Characters");
                });
#pragma warning restore 612, 618
        }
    }
}