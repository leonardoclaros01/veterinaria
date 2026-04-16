package veterinaria.laika.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repositorio para la gestión de veterinarios profesionales.
 */
@Repository
public interface VeterinarianRepository extends JpaRepository<Veterinarian, Long> {
}