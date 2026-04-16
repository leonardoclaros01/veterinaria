package veterinaria.laika.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio para la gestión de mascotas y sus vínculos con los dueños.
 */
@Repository
public interface PetRepository extends JpaRepository<Pet, Long> {
    // Permite realizar operaciones CRUD automáticamente sobre la entidad Pet
}