package veterinaria.laika.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "pets")
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String species;
    
    @ManyToOne
    @JoinColumn(name = "breed_id")
    private Breed breed;
    
    private Integer age;

    // ENLACE CON EL DUEÑO
    @ManyToOne
    @JoinColumn(name = "user_id") // Esto crea la llave foránea en la tabla pets
    private User owner;

    public Pet() {}

    // --- GETTERS Y SETTERS ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getSpecies() { return species; }
    public void setSpecies(String species) { this.species = species; }

    public Breed getBreed() { return breed; }
    public void setBreed(Breed breed) { this.breed = breed; }

    public Integer getAge() { return age; }
    public void setAge(Integer age) { this.age = age; }

    public User getOwner() { return owner; }
    public void setOwner(User owner) { this.owner = owner; }
}